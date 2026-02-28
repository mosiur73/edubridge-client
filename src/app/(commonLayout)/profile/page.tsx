"use client";

import { useEffect, useState } from "react";
import { Save, Plus, X, Lock, User, Mail, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { tutorApi, categoryApi } from "@/lib/api";
import type { Category } from "@/types";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ===================== Types =====================
interface TutorFormData {
  headline: string;
  bio: string;
  hourlyRate: string;
  experience: string;
  education: string;
  subjects: string[];
  languages: string[];
  categoryIds: string[];
}

const emptyTutorForm: TutorFormData = {
  headline: "",
  bio: "",
  hourlyRate: "",
  experience: "",
  education: "",
  subjects: [],
  languages: [],
  categoryIds: [],
};

// ===================== Main Page =====================
export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userRole = (user as any)?.role as string | undefined;

  // ── Basic Info State ──
  const [name, setName] = useState("");
  const [basicSaving, setBasicSaving] = useState(false);

  // ── Password State ──
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwSaving, setPwSaving] = useState(false);

  // ── Tutor Profile State ──
  const [tutorProfile, setTutorProfile] = useState<any>(null);
  const [tutorForm, setTutorForm] = useState<TutorFormData>(emptyTutorForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tutorLoading, setTutorLoading] = useState(false);
  const [tutorSaving, setTutorSaving] = useState(false);
  const [isEditingTutor, setIsEditingTutor] = useState(false);
  const [tutorErrors, setTutorErrors] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  // ── Active Tab ──
  const [activeTab, setActiveTab] = useState<"basic" | "password" | "tutor">("basic");

  // ── Sync name from session ──
  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  // ── Load tutor data if TUTOR ──
  useEffect(() => {
    if (userRole === "TUTOR") {
      loadTutorData();
    }
  }, [userRole]);

  const loadTutorData = async () => {
    setTutorLoading(true);
    try {
      const cats = await categoryApi.getAll();
      setCategories(cats);

      try {
        const profile = await tutorApi.getMyProfile();
        setTutorProfile(profile);
        setTutorForm({
          headline: profile.headline || "",
          bio: profile.bio || "",
          hourlyRate: profile.hourlyRate?.toString() || "",
          experience: profile.experience?.toString() || "",
          education: profile.education || "",
          subjects: profile.subjects || [],
          languages: profile.languages || [],
          categoryIds: profile.categoryIds || [],
        });
      } catch {
        // No profile yet
        setIsEditingTutor(true);
      }
    } catch {
      toast.error("Failed to load tutor data");
    } finally {
      setTutorLoading(false);
    }
  };

  // ===================== Handlers =====================

  // ── Basic Info Update ──
  const handleBasicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Name is required"); return; }
    setBasicSaving(true);
    try {
      await authClient.updateUser({ name: name.trim() });
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setBasicSaving(false);
    }
  };

  // ── Password Change ──
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setPwSaving(true);
    try {
      await authClient.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setPwSaving(false);
    }
  };

  // ── Tutor Subject/Language helpers ──
  const addSubject = () => {
    const val = newSubject.trim();
    if (val && !tutorForm.subjects.includes(val)) {
      setTutorForm({ ...tutorForm, subjects: [...tutorForm.subjects, val] });
    }
    setNewSubject("");
  };
  const removeSubject = (s: string) =>
    setTutorForm({ ...tutorForm, subjects: tutorForm.subjects.filter((x) => x !== s) });

  const addLanguage = () => {
    const val = newLanguage.trim();
    if (val && !tutorForm.languages.includes(val)) {
      setTutorForm({ ...tutorForm, languages: [...tutorForm.languages, val] });
    }
    setNewLanguage("");
  };
  const removeLanguage = (l: string) =>
    setTutorForm({ ...tutorForm, languages: tutorForm.languages.filter((x) => x !== l) });

  const toggleCategory = (id: string) =>
    setTutorForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((x) => x !== id)
        : [...prev.categoryIds, id],
    }));

  // ── Tutor Profile Submit ──
  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!tutorForm.headline.trim()) errs.push("Headline is required");
    if (!tutorForm.hourlyRate || Number(tutorForm.hourlyRate) <= 0) errs.push("Valid hourly rate is required");
    if (tutorForm.subjects.length === 0) errs.push("At least one subject is required");
    if (tutorForm.languages.length === 0) errs.push("At least one language is required");

    if (errs.length > 0) {
      setTutorErrors(errs);
      toast.error("Please fix the errors");
      return;
    }

    setTutorSaving(true);
    setTutorErrors([]);
    try {
      const data = {
        headline: tutorForm.headline.trim(),
        bio: tutorForm.bio.trim() || undefined,
        hourlyRate: Number(tutorForm.hourlyRate),
        experience: tutorForm.experience ? Number(tutorForm.experience) : undefined,
        education: tutorForm.education.trim() || undefined,
        subjects: tutorForm.subjects,
        languages: tutorForm.languages,
        categoryIds: tutorForm.categoryIds,
      };

      if (tutorProfile) {
        await tutorApi.updateProfile(data);
        toast.success("Tutor profile updated!");
      } else {
        await tutorApi.createProfile(data);
        toast.success("Tutor profile created!");
      }

      await loadTutorData();
      setIsEditingTutor(false);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to save";
      toast.error(msg);
    } finally {
      setTutorSaving(false);
    }
  };

  // ===================== Render =====================
  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const tabs = [
    { key: "basic", label: "Basic Info" },
    { key: "password", label: "Change Password" },
    ...(userRole === "TUTOR" ? [{ key: "tutor", label: "Tutor Profile" }] : []),
  ] as { key: "basic" | "password" | "tutor"; label: string }[];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt={user.name ?? ""} className="w-24 h-24 object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {user?.email}
                </p>

                {/* Role Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  userRole === "TUTOR"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : userRole === "ADMIN"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                }`}>
                  <User className="w-4 h-4" />
                  {userRole || "Student"}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Member since</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(user as any)?.createdAt
                      ? new Date((user as any).createdAt).toLocaleDateString("en-US", {
                          month: "short", year: "numeric",
                        })
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email Verified</span>
                  <span className={`font-medium ${user?.emailVerified ? "text-green-600" : "text-red-500"}`}>
                    {user?.emailVerified ? "Yes ✓" : "No"}
                  </span>
                </div>
                {userRole === "TUTOR" && tutorProfile && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tutor Profile</span>
                    <span className="font-medium text-green-600">Complete ✓</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Main Content ── */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 px-4 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Basic Info Tab ── */}
              {activeTab === "basic" && (
                <form onSubmit={handleBasicSubmit} className="p-6 space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email — disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        disabled
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        value={user?.email || ""}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={basicSaving}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      {basicSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}

              {/* ── Password Tab ── */}
              {activeTab === "password" && (
                <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
                  {[
                    { label: "Current Password", key: "currentPassword" },
                    { label: "New Password", key: "newPassword" },
                    { label: "Confirm New Password", key: "confirmPassword" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          required
                          minLength={field.key !== "currentPassword" ? 6 : undefined}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={passwordData[field.key as keyof typeof passwordData]}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, [field.key]: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={pwSaving}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Lock className="w-5 h-5" />
                      {pwSaving ? "Changing..." : "Change Password"}
                    </button>
                  </div>
                </form>
              )}

              {/* ── Tutor Profile Tab (শুধু TUTOR role) ── */}
              {activeTab === "tutor" && userRole === "TUTOR" && (
                <div className="p-6">
                  {tutorLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    </div>
                  ) : (
                    <>
                      {/* Edit button */}
                      {tutorProfile && !isEditingTutor && (
                        <div className="flex justify-end mb-4">
                          <button
                            onClick={() => setIsEditingTutor(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Edit Profile
                          </button>
                        </div>
                      )}

                      {/* Validation errors */}
                      {tutorErrors.length > 0 && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <ul className="space-y-1">
                              {tutorErrors.map((err, i) => (
                                <li key={i} className="text-sm text-red-700 dark:text-red-300">{err}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      <form onSubmit={handleTutorSubmit} className="space-y-6">
                        {/* Headline */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Headline *
                          </label>
                          <input
                            type="text"
                            disabled={!isEditingTutor && !!tutorProfile}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            value={tutorForm.headline}
                            onChange={(e) => setTutorForm({ ...tutorForm, headline: e.target.value })}
                            placeholder="e.g., Mathematics Expert | 5 Years Experience"
                          />
                        </div>

                        {/* Bio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Bio
                          </label>
                          <textarea
                            rows={4}
                            disabled={!isEditingTutor && !!tutorProfile}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                            value={tutorForm.bio}
                            onChange={(e) => setTutorForm({ ...tutorForm, bio: e.target.value })}
                            placeholder="Tell students about your teaching style..."
                          />
                        </div>

                        {/* Hourly Rate & Experience */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Hourly Rate ($) *
                            </label>
                            <input
                              type="number"
                              min="1"
                              disabled={!isEditingTutor && !!tutorProfile}
                              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              value={tutorForm.hourlyRate}
                              onChange={(e) => setTutorForm({ ...tutorForm, hourlyRate: e.target.value })}
                              placeholder="25"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Years of Experience
                            </label>
                            <input
                              type="number"
                              min="0"
                              disabled={!isEditingTutor && !!tutorProfile}
                              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              value={tutorForm.experience}
                              onChange={(e) => setTutorForm({ ...tutorForm, experience: e.target.value })}
                              placeholder="3"
                            />
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Education
                          </label>
                          <input
                            type="text"
                            disabled={!isEditingTutor && !!tutorProfile}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            value={tutorForm.education}
                            onChange={(e) => setTutorForm({ ...tutorForm, education: e.target.value })}
                            placeholder="e.g., BSc in Mathematics, University of Dhaka"
                          />
                        </div>

                        {/* Subjects */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Subjects * <span className="text-xs text-gray-400">(Enter চাপলে add হবে)</span>
                          </label>
                          {(isEditingTutor || !tutorProfile) && (
                            <div className="flex gap-2 mb-3">
                              <input
                                type="text"
                                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSubject(); }}}
                                placeholder="e.g., Algebra"
                              />
                              <button type="button" onClick={addSubject} className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {tutorForm.subjects.length === 0 ? (
                              <p className="text-sm text-gray-400 italic">No subjects added</p>
                            ) : tutorForm.subjects.map((s) => (
                              <span key={s} className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                                {s}
                                {(isEditingTutor || !tutorProfile) && (
                                  <button type="button" onClick={() => removeSubject(s)}><X className="w-3 h-3" /></button>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Languages */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Languages * <span className="text-xs text-gray-400">(Enter চাপলে add হবে)</span>
                          </label>
                          {(isEditingTutor || !tutorProfile) && (
                            <div className="flex gap-2 mb-3">
                              <input
                                type="text"
                                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={newLanguage}
                                onChange={(e) => setNewLanguage(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLanguage(); }}}
                                placeholder="e.g., English"
                              />
                              <button type="button" onClick={addLanguage} className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {tutorForm.languages.length === 0 ? (
                              <p className="text-sm text-gray-400 italic">No languages added</p>
                            ) : tutorForm.languages.map((l) => (
                              <span key={l} className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                                {l}
                                {(isEditingTutor || !tutorProfile) && (
                                  <button type="button" onClick={() => removeLanguage(l)}><X className="w-3 h-3" /></button>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Categories */}
                        {categories.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Categories
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  type="button"
                                  disabled={!isEditingTutor && !!tutorProfile}
                                  onClick={() => toggleCategory(cat.id)}
                                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                    tutorForm.categoryIds.includes(cat.id)
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 hover:border-blue-400"
                                  }`}
                                >
                                  {(cat as any).icon && <span className="mr-1">{(cat as any).icon}</span>}
                                  {cat.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Submit */}
                        {(isEditingTutor || !tutorProfile) && (
                          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            {tutorProfile && (
                              <button
                                type="button"
                                onClick={() => { setIsEditingTutor(false); setTutorErrors([]); loadTutorData(); }}
                                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              type="submit"
                              disabled={tutorSaving}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
                            >
                              <Save className="w-5 h-5" />
                              {tutorSaving ? "Saving..." : tutorProfile ? "Save Changes" : "Create Profile"}
                            </button>
                          </div>
                        )}
                      </form>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
