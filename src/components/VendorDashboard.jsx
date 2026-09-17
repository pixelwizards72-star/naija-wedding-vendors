import React, { useState } from 'react';
import { 
  Building2, Sparkles, Eye, MessageSquare, ShieldCheck, CheckCircle2, 
  AlertTriangle, Clock, CreditCard, Edit3, Image, Star, ArrowUpRight, 
  Settings, LogOut, Check, ChevronRight, Upload, Phone, Instagram, MapPin, DollarSign 
} from 'lucide-react';
import { FEATURED_PLANS } from '../data/featuredPlans';

export default function VendorDashboard({
  vendor,
  onUpdateVendorProfile,
  onOpenFeaturedModal,
  onSignOut,
  onBackToMarketplace
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'profile', 'packages', 'billing'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: vendor?.name || '',
    tagline: vendor?.tagline || '',
    phone: vendor?.phone || '',
    whatsapp: vendor?.whatsapp || '',
    instagram: vendor?.instagram || '',
    startingPrice: vendor?.startingPrice || 150000,
    description: vendor?.description || '',
    coverImage: vendor?.coverImage || ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateVendorProfile) {
      onUpdateVendorProfile(vendor.id, formData);
    }
    setIsEditing(false);
    alert('Vendor profile updated successfully!');
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!vendor) return null;

  const currentStatus = vendor.status || 'approved';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Top Banner & Profile Summary */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-violet-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <img
              src={vendor.coverImage}
              alt={vendor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/30 border border-violet-400/40 text-amber-300 text-xs font-medium">
                  {vendor.categoryLabel}
                </span>
                {vendor.featured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                    ★ Featured VIP Spotlight
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {vendor.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                <span>{vendor.locationLabel}</span>
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {!vendor.featured && (
              <button
                onClick={onOpenFeaturedModal}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-md transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Upgrade to Featured</span>
              </button>
            )}

            <button
              onClick={onBackToMarketplace}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-sm transition-all"
            >
              Public View
            </button>

            <button
              onClick={onSignOut}
              className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex items-center space-x-2 mt-8 pt-6 border-t border-white/10 overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Building2 },
            { id: 'profile', label: 'Edit Profile & Contact', icon: Edit3 },
            { id: 'billing', label: 'Featured Plan & Billing', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
                <span>Total Profile Views</span>
                <Eye className="w-4 h-4 text-violet-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">1,420</div>
              <span className="text-[10px] text-emerald-600 font-medium">↑ +18% this week</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
                <span>WhatsApp Leads</span>
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">86</div>
              <span className="text-[10px] text-emerald-600 font-medium">Direct inquiries</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
                <span>Customer Rating</span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {vendor.rating || 5.0} <span className="text-xs font-normal text-slate-400">/ 5</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">({vendor.reviewCount || 12} reviews)</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
                <span>CAC Verification</span>
                <ShieldCheck className="w-4 h-4 text-violet-600" />
              </div>
              <div className="text-sm font-bold text-slate-900 truncate mt-1">
                {vendor.cacNumber || 'Verified License'}
              </div>
              <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                CAC Checked
              </span>
            </div>
          </div>

          {/* Business Listing Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Marketplace Listing Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  currentStatus === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Listing Status</span>
                  <span className="text-sm font-bold text-slate-900 capitalize">
                    {currentStatus === 'approved' ? 'Approved & Visible on Website' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    ★
                  </div>
                  <div>
                    <span className="text-xs text-amber-900 font-semibold block">Spotlight Tier</span>
                    <span className="text-sm font-bold text-slate-900">
                      {vendor.featured ? (vendor.featuredPlan || 'Featured Spotlight') : 'Standard Free Listing'}
                    </span>
                  </div>
                </div>
                {!vendor.featured && (
                  <button
                    onClick={onOpenFeaturedModal}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-xs transition-all"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EDIT PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Business Profile Settings</h3>
              <p className="text-xs text-slate-500">Update your public contact info, tagline, starting prices, and services.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Starting Price (NGN ₦)</label>
                <input
                  type="number"
                  required
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp Number (e.g. 234803...)</label>
                <input
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Short Tagline</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Business Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: BILLING & FEATURED SUBSCRIPTION */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Featured Spotlight Subscriptions</h3>
            <p className="text-xs text-slate-500">
              Manage your homepage promotion plan across Paystack, Flutterwave, Stripe, PayPal, and USDT.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-amber-300 uppercase font-bold tracking-wider block">Current Plan Status</span>
              <h4 className="text-2xl font-bold mt-1">
                {vendor.featured ? (vendor.featuredPlan || 'Active Spotlight') : 'Standard Free Plan'}
              </h4>
              <p className="text-xs text-slate-300 font-light mt-1">
                {vendor.featured 
                  ? `Active until ${new Date(vendor.featuredUntil || Date.now() + 30*24*60*60*1000).toLocaleDateString()}` 
                  : 'Upgrade to 1 Month, 3 Months, 6 Months or 1 Year to get top homepage priority.'}
              </p>
            </div>

            <button
              onClick={onOpenFeaturedModal}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-lg shrink-0 transition-all"
            >
              {vendor.featured ? 'Renew / Extend Plan' : 'Select Featured Duration'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
