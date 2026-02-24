'use client';

import { useEffect, useState } from 'react';
import { tutorApi, categoryApi } from '@/lib/api';
import type { TutorProfile, Category, CreateTutorProfileInput, UpdateTutorProfileInput } from '@/types';
import toast from 'react-hot-toast';
import { Save, Plus, X, AlertCircle } from 'lucide-react';

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    hourlyRate: '',
    experience: '',
    education: '',
    subjects: [] as string[],
    languages: [] as string[],
    categoryIds: [] as string[],
  });

  const [newSubject, setNewSubject] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoriesData = await categoryApi.getAll();
      setCategories(categoriesData);

      // Try to get existing profile
      try {
        const profileData = await tutorApi.getMyProfile();
        setProfile(profileData);
        setFormData({
          headline: profileData.headline || '',
          bio: profileData.bio || '',
          hourlyRate: profileData.hourlyRate.toString(),
          experience: profileData.experience?.toString() || '',
          education: profileData.education || '',
          subjects: profileData.subjects || [],
          languages: profileData.languages || [],
          categoryIds: profileData.categoryIds || [],
        });
      } catch (err) {
        // No profile exists, that's okay
        console.log('No existing profile, creating new one');
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addSubject = () => {
    const trimmed = newSubject.trim();
    if (trimmed && !formData.subjects.includes(trimmed)) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, trimmed],
      });
      setNewSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject),
    });
  };

  const addLanguage = () => {
    const trimmed = newLanguage.trim();
    if (trimmed && !formData.languages.includes(trimmed)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, trimmed],
      });
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== language),
    });
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.headline.trim()) {
      newErrors.push('Headline is required');
    }

    if (!formData.hourlyRate || Number(formData.hourlyRate) <= 0) {
      newErrors.push('Valid hourly rate is required');
    }

    if (formData.subjects.length === 0) {
      newErrors.push('At least one subject is required');
    }

    if (formData.languages.length === 0) {
      newErrors.push('At least one language is required');
    }

    // if (formData.categoryIds.length === 0) {
    //   newErrors.push('At least one category is required');
    // }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setSaving(true);
    setErrors([]);

    try {
      const data = {
        headline: formData.headline.trim(),
        bio: formData.bio.trim() || undefined,
        hourlyRate: Number(formData.hourlyRate),
        experience: formData.experience ? Number(formData.experience) : undefined,
        education: formData.education.trim() || undefined,
        subjects: formData.subjects,
        languages: formData.languages,
        categoryIds: formData.categoryIds,
      };

      console.log('Submitting profile data:', data); // Debug log

      if (profile) {
        await tutorApi.updateProfile(data as UpdateTutorProfileInput);
        toast.success('Profile updated successfully!');
      } else {
        await tutorApi.createProfile(data as CreateTutorProfileInput);
        toast.success('Profile created successfully!');
      }

      await loadData();
      setIsEditing(false);
    } catch (error: any) {
      console.error('Profile save error:', error);
      
      // Show detailed error message
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error
        || error.message 
        || 'Failed to save profile';
      
      toast.error(errorMessage);
      
      // If there are validation errors from backend
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {profile ? 'Manage Profile' : 'Create Profile'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {profile ? 'Update your tutor profile information' : 'Set up your tutor profile'}
            </p>
          </div>

          {profile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                  Please fix the following errors:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700 dark:text-red-300">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="space-y-6">
            {/* Headline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Headline *
              </label>
              <input
                type="text"
                required
                disabled={!isEditing && !!profile}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g., Mathematics Expert | 10 Years Experience"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio (Optional)
              </label>
              <textarea
                rows={5}
                disabled={!isEditing && !!profile}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell students about yourself, your teaching style, and experience..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hourly Rate ($) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  disabled={!isEditing && !!profile}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder="50"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years of Experience (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  disabled={!isEditing && !!profile}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5"
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Education (Optional)
              </label>
              <input
                type="text"
                disabled={!isEditing && !!profile}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="e.g., PhD in Mathematics, MIT"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subjects * (Add at least one)
              </label>
              {(isEditing || !profile) && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSubject();
                      }
                    }}
                    placeholder="Add a subject (e.g., Mathematics, Physics)"
                  />
                  <button
                    type="button"
                    onClick={addSubject}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.subjects.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No subjects added yet</p>
                ) : (
                  formData.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                    >
                      {subject}
                      {(isEditing || !profile) && (
                        <button
                          type="button"
                          onClick={() => removeSubject(subject)}
                          className="hover:text-blue-900 dark:hover:text-blue-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Languages * (Add at least one)
              </label>
              {(isEditing || !profile) && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addLanguage();
                      }
                    }}
                    placeholder="Add a language (e.g., English, Spanish)"
                  />
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.languages.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No languages added yet</p>
                ) : (
                  formData.languages.map((language) => (
                    <span
                      key={language}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {language}
                      {(isEditing || !profile) && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(language)}
                          className="hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Categories */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories * (Select at least one)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 col-span-2">Loading categories...</p>
                ) : (
                  categories.map((category) => (
                    <label
                      key={category.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        (isEditing || !profile)
                          ? 'hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                          : 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={!isEditing && !!profile}
                        checked={formData.categoryIds.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              categoryIds: [...formData.categoryIds, category.id],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              categoryIds: formData.categoryIds.filter((id) => id !== category.id),
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 disabled:opacity-50"
                      />
                      <span className="text-gray-900 dark:text-white">{category.name}</span>
                    </label>
                  ))
                )}
              </div>
            </div> */}

            {/* Submit Buttons */}
            {(isEditing || !profile) && (
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {profile && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors([]);
                      loadData();
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Saving...' : profile ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}