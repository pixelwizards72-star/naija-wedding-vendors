import React from 'react';
import { Search, MapPin, Tag, ShieldCheck, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, LOCATIONS, PRICE_TIERS } from '../data/categories';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedPriceTier,
  setSelectedPriceTier,
  verifiedOnly,
  setVerifiedOnly,
  onResetFilters
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-violet-950 to-indigo-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Floating Glowing Violet & Gold Radial Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
        
        {/* Verification Guarantee Chip */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-amber-300 text-xs sm:text-sm font-light backdrop-blur-sm shadow-inner">
          <ShieldCheck className="w-4 h-4 text-amber-400 stroke-[1.5]" />
          <span className="font-extralight tracking-wide">CAC Registered & Identity Verified Nigerian Event Vendors</span>
        </div>

        {/* Hero Title - Regular & Light Weight */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight font-serif text-white max-w-4xl mx-auto leading-tight">
          Find & Book Verified Event & Wedding Vendors in <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent font-normal">Nigeria</span>
        </h1>

        {/* Smart Multi-Filter Search Bar - Poppins Thin & Regular Styling */}
        <div className="mt-8 bg-white p-4 sm:p-5 rounded-3xl shadow-2xl text-slate-800 border-2 border-violet-100 max-w-5xl mx-auto text-left">
          
          {/* Main Keyword Input */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-violet-500 stroke-[1.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vendor name, service, or keyword (e.g., Party Jollof, Alaga, 360 Booth)..."
              className="w-full pl-12 pr-4 py-3.5 bg-purple-50/50 rounded-2xl border border-violet-200 text-slate-900 placeholder:text-slate-400 text-sm font-extralight tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
            />
          </div>

          {/* Grid Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            
            {/* Category Select */}
            <div className="relative">
              <label className="block text-[11px] font-extralight uppercase tracking-widest text-slate-500 mb-1 px-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-purple-50/50 rounded-xl border border-violet-200 text-xs sm:text-sm font-light text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="font-light">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-3 w-4 h-4 text-violet-500 stroke-[1.5] pointer-events-none" />
              </div>
            </div>

            {/* Location Select */}
            <div className="relative">
              <label className="block text-[11px] font-extralight uppercase tracking-widest text-slate-500 mb-1 px-1">
                State / City
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-purple-50/50 rounded-xl border border-violet-200 text-xs sm:text-sm font-light text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id} className="font-light">
                      {loc.label}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-3 w-4 h-4 text-violet-500 stroke-[1.5] pointer-events-none" />
              </div>
            </div>

            {/* Price Tier Select */}
            <div className="relative">
              <label className="block text-[11px] font-extralight uppercase tracking-widest text-slate-500 mb-1 px-1">
                Budget Level
              </label>
              <div className="relative">
                <select
                  value={selectedPriceTier}
                  onChange={(e) => setSelectedPriceTier(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-purple-50/50 rounded-xl border border-violet-200 text-xs sm:text-sm font-light text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none"
                >
                  {PRICE_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.id} className="font-light">
                      {tier.label}
                    </option>
                  ))}
                </select>
                <Tag className="absolute right-3 top-3 w-4 h-4 text-violet-500 stroke-[1.5] pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Bottom Controls: Verified Toggle & Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-purple-100 gap-3">
            <label className="flex items-center space-x-2 cursor-pointer text-xs font-light text-violet-950 bg-violet-100/60 px-3.5 py-1.5 rounded-full border border-violet-200">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500 cursor-pointer"
              />
              <span className="flex items-center space-x-1 font-extralight tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-violet-700 stroke-[1.5]" />
                <span>Show CAC & ID Verified Vendors Only</span>
              </span>
            </label>

            <button
              onClick={onResetFilters}
              className="text-xs font-light tracking-wide text-slate-500 hover:text-violet-700 underline"
            >
              Reset All Search Filters
            </button>
          </div>

        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left border-t border-violet-900/60 pt-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-violet-600/30 text-amber-300 border border-violet-500/30">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm font-normal text-white">CAC Verified</h4>
              <p className="text-xs text-slate-400 font-extralight">Identity & business checked</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-violet-600/30 text-amber-300 border border-violet-500/30">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm font-normal text-white">Direct WhatsApp</h4>
              <p className="text-xs text-slate-400 font-extralight">No agent middleman fees</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-violet-600/30 text-amber-300 border border-violet-500/30">
              <Tag className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm font-normal text-white">Transparent Pricing</h4>
              <p className="text-xs text-slate-400 font-extralight">Prices upfront in Naira (₦)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-violet-600/30 text-amber-300 border border-violet-500/30">
              <MapPin className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm font-normal text-white">36 States Covered</h4>
              <p className="text-xs text-slate-400 font-extralight">Lagos, Abuja, PH & more</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
