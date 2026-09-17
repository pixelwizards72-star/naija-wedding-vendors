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
  onResetFilters,
  onOpenFeaturedModal
}) {
  // Dynamically calculate accurate category counts from live database
  const getCategoryCount = (catId) => {
    const activeVendors = allVendors.filter(v => (v.status || 'approved') === 'approved');
    if (catId === 'all') return activeVendors.length;
    return activeVendors.filter(v => v.category === catId).length;
  };

  const featuredVendors = allVendors.filter(v => (v.status || 'approved') === 'approved' && v.featured);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Featured Vendors Spotlight Header Banner */}
      <div className="mb-10 bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-violet-800/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>Homepage Spotlight</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Featured Verified Vendors in Nigeria
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-xl">
              Promoted vendors with top homepage placement & priority booking status.
            </p>
          </div>

          <button
            onClick={onOpenFeaturedModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-md transition-all shrink-0 hover:scale-105"
          >
            ★ Get Featured (Monthly / 1 Yr)
          </button>
        </div>

        {/* Featured Mini Cards Row */}
        {featuredVendors.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredVendors.slice(0, 3).map((fv) => (
              <div
                key={fv.id}
                onClick={() => onSelectVendor(fv)}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 hover:bg-white/20 transition-all cursor-pointer flex items-center space-x-3 group"
              >
                <img
                  src={fv.coverImage}
                  alt={fv.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                    ★ Featured Spotlight
                  </span>
                  <h4 className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                    {fv.name}
                  </h4>
                  <p className="text-xs text-slate-300 truncate font-light">
                    {fv.locationLabel} • {fv.categoryLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Navigation Pills */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center space-x-2">
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
