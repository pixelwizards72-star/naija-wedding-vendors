import React from 'react';
import VendorCard from './VendorCard';
import { CATEGORIES } from '../data/categories';
import { Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function VendorGrid({
  vendors,
  allVendors = [], // All vendors array for dynamic category counts
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  favorites,
  onToggleFavorite,
  onSelectVendor,
  onQuoteClick,
  onResetFilters
}) {
  // Dynamically calculate accurate category counts from live database
  const getCategoryCount = (catId) => {
    const activeVendors = allVendors.filter(v => (v.status || 'approved') === 'approved');
    if (catId === 'all') return activeVendors.length;
    return activeVendors.filter(v => v.category === catId).length;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Category Navigation Pills */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span>Browse Vendor Categories</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Scroll horizontally →</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-700 to-purple-700 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-violet-50 border border-purple-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${isSelected ? 'bg-violet-900 text-purple-100' : 'bg-purple-100 text-violet-800'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Results Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-purple-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Showing {vendors.length} Verified {vendors.length === 1 ? 'Vendor' : 'Vendors'}
          </h3>
          <p className="text-xs text-slate-500">
            Click on any vendor card to view packages, portfolio & direct WhatsApp contact details.
          </p>
        </div>

        {/* Sorting selector */}
        <div className="flex items-center space-x-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-violet-600" />
          <span className="text-xs font-bold text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600"
          >
            <option value="recommended">Recommended & Verified</option>
            <option value="rating">Highest Rated (★ 5.0)</option>
            <option value="price-asc">Starting Price: Low to High</option>
            <option value="price-desc">Starting Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onSelectVendor={onSelectVendor}
              isFavorite={favorites.includes(vendor.id)}
              onToggleFavorite={onToggleFavorite}
              onQuoteClick={onQuoteClick}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-purple-200 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-violet-600 flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Vendors Found</h3>
          <p className="text-sm text-slate-500 mb-6">
            We couldn't find any vendor matching your exact combination of category, state location, or budget filters.
          </p>
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 rounded-full bg-violet-700 text-white font-bold text-sm hover:bg-violet-800 shadow-md transition-all"
          >
            Clear All Search Filters
          </button>
        </div>
      )}
    </section>
  );
}
