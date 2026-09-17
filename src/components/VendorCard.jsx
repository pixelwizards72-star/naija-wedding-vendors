import React from 'react';
import { Star, MapPin, ShieldCheck, Heart, MessageSquare, ArrowRight, Award } from 'lucide-react';

export default function VendorCard({
  vendor,
  onSelectVendor,
  isFavorite,
  onToggleFavorite,
  onQuoteClick
}) {
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello ${vendor.name}, I found your business profile on OwambeHub Nigeria! I would like to inquire about your availability and packages for an upcoming event.`
    );
    window.open(`https://wa.me/${vendor.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => onSelectVendor(vendor)}
      className="group bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative transform hover:-translate-y-1"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.coverImage}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Badges on Image - Extra Small & Compact */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10 max-w-[calc(100%-3rem)]">
            {vendor.verified && (
              <span className="px-2 py-0.5 rounded-full bg-violet-700/90 backdrop-blur-md text-white text-[9px] font-normal shadow-xs border border-violet-400/40">
                Verified Vendor
              </span>
            )}
            {vendor.cacRegistered && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-normal shadow-xs">
                CAC Registered
              </span>
            )}
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vendor.id);
            }}
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all z-10 ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/75 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 stroke-[1.5] ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Category Pill on Image Bottom */}
          <div className="absolute bottom-2 left-2 z-10">
            <span className="px-2.5 py-0.5 rounded-lg bg-violet-950/85 backdrop-blur-xs text-amber-300 text-[10px] font-normal border border-violet-500/30 shadow-xs">
              {vendor.categoryLabel}
            </span>
          </div>
        </div>

        {/* Card Body - Soft Regular Font Weight */}
        <div className="p-5">
          
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-medium text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-1">
              {vendor.name}
            </h3>
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-xs font-normal shrink-0 border border-amber-200/60">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 stroke-[1.5]" />
              <span>{vendor.rating}</span>
              <span className="text-slate-400 font-light">({vendor.reviewCount})</span>
            </div>
          </div>

          {/* Location & Tagline */}
          <div className="flex items-center space-x-1 text-violet-700 text-xs font-light mb-3">
            <MapPin className="w-3.5 h-3.5 text-violet-500 shrink-0 stroke-[1.5]" />
            <span>{vendor.locationLabel}</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 font-light leading-relaxed mb-2">
            {vendor.tagline || vendor.description}
          </p>
        </div>
      </div>

      {/* Footer / Price & Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-purple-100 bg-purple-50/40 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-light text-slate-400 tracking-wider block">From</span>
          <span className="text-base font-normal text-violet-950 font-sans">
            {formatNaira(vendor.startingPrice)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Direct WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-xs"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* View Details / Quote CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectVendor(vendor);
            }}
            className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-normal transition-all shadow-sm"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
