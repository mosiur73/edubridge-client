'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Star, SlidersHorizontal, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { categoryApi } from '@/lib/api';
import type { TutorProfile, Category } from '@/types';

const ITEMS_PER_PAGE = 6;

export default function BrowseTutorsPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorProfile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating | price_low | price_high | reviews
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Load all data on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/tutors', { credentials: 'include' }).then(r => r.json()),
      categoryApi.getAll(),
    ])
      .then(([tutorRes, cats]) => {
        setTutors(tutorRes.data || []);
        setCategories(cats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Apply filters + sort client-side
  useEffect(() => {
    let result = [...tutors];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.user?.name?.toLowerCase().includes(q) ||
        t.headline?.toLowerCase().includes(q) ||
        t.subjects?.some(s => s.toLowerCase().includes(q)) ||
        t.bio?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(t => t.categoryIds?.includes(selectedCategory));
    }

    // Price filter
    if (minPrice) result = result.filter(t => t.hourlyRate >= Number(minPrice));
    if (maxPrice) result = result.filter(t => t.hourlyRate <= Number(maxPrice));

    // Rating filter
    if (minRating) result = result.filter(t => t.rating >= Number(minRating));

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'price_high':
        result.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'reviews':
        result.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
        break;
    }

    setFilteredTutors(result);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [tutors, search, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTutors.length / ITEMS_PER_PAGE);
  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSortBy('rating');
  };

  // Skeleton loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />
          <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-24 bg-gray-200 dark:bg-gray-700" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Browse Tutors</h1>
          <p className="text-gray-600 dark:text-gray-400">Find the perfect tutor for your learning goals</p>
        </div>

        {/* Search + Sort + Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, subject, or expertise..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select
                className="pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Top Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                showFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Price ($/hr)</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Price ($/hr)</label>
                  <input
                    type="number"
                    placeholder="200"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                {/* Min Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Rating</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  >
                    <option value="">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredTutors.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{filteredTutors.length}</span> tutors
          </p>
        </div>

        {/* Tutor Cards */}
        {paginatedTutors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No tutors found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
            <button onClick={handleReset} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedTutors.map((tutor) => (
              <Link
                key={tutor.id}
                href={`/tutors/${tutor.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                {/* Header */}
                <div className="h-24 bg-gradient-to-br from-blue-500 to-indigo-600 relative flex-shrink-0">
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {tutor.user?.name?.charAt(0) || 'T'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-12 p-6 space-y-4 flex flex-col flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tutor.user?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {tutor.headline || 'Professional Tutor'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{tutor.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({tutor.totalReviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects?.slice(0, 3).map((subject) => (
                      <span key={subject} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Starting at</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${tutor.hourlyRate}
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/hr</span>
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium group-hover:bg-blue-700 transition-colors">
                        View Profile
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isNear = Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
              if (!isNear) {
                if (page === 2 || page === totalPages - 1) return <span key={page} className="text-gray-400">...</span>;
                return null;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
