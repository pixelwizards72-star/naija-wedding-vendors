import React from 'react';
import { Sparkles, Heart, PlusCircle, ShieldCheck, Mail, Calculator, Menu, X, User } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  favoritesCount, 
  onOpenVendorRegister,
  onOpenFavorites,
  onOpenAuth,
  onOpenFeaturedModal,
  onOpenVendorDashboard
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'invites', label: 'Digital Invites', icon: Mail, badge: 'New' },
    { id: 'budget', label: 'Budget Planner', icon: Calculator },
    { id: 'verification', label: 'Trust & Safety', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - Party Vendors */}
          <div 
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-700 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-amber-300 stroke-[1.5]" />
            </div>
            <span className="text-xl font-normal tracking-tight bg-gradient-to-r from-violet-950 via-purple-800 to-indigo-950 bg-clip-text text-transparent font-serif whitespace-nowrap">
              Party Vendors
            </span>
          </div>

          {/* Desktop Nav Links - Regular & Light Weight */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-normal transition-all whitespace-nowrap leading-none ${
                    isActive
                      ? 'bg-violet-100 text-violet-900 border border-violet-200 shadow-2xs font-medium'
                      : 'text-slate-600 hover:text-violet-700 hover:bg-violet-50/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 stroke-[1.5] ${isActive ? 'text-violet-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-light bg-amber-500 text-white rounded-full uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons - Regular Font Weight */}
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            {/* Vendor Self-Service Portal CTA */}
            <button
              onClick={onOpenVendorDashboard}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'vendor_dashboard'
                  ? 'bg-violet-700 text-white shadow-xs'
                  : 'bg-violet-50 text-violet-800 hover:bg-violet-100 border border-violet-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Vendor Dashboard</span>
            </button>

            {/* Get Featured Spotlight CTA */}
            <button
              onClick={onOpenFeaturedModal}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-slate-900 border border-amber-300 text-xs font-medium transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Get Featured</span>
            </button>

            {/* Favorites Counter */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-full text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              title="Saved Vendors"
            >
              <Heart className="w-4 h-4 stroke-[1.5]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-normal rounded-full flex items-center justify-center animate-bounce">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Sign In Button */}
            <button
              onClick={() => onOpenAuth('signin')}
              className="px-3.5 py-1.5 rounded-full border border-violet-600 text-violet-700 hover:bg-violet-50 text-xs font-normal transition-all whitespace-nowrap flex items-center space-x-1"
            >
              <span>Sign In</span>
            </button>

            {/* List Business CTA */}
            <button
              onClick={onOpenVendorRegister}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-700 to-indigo-800 hover:from-violet-800 hover:to-indigo-900 text-white text-xs font-normal shadow-xs hover:shadow-md active:scale-95 transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300 stroke-[1.5]" />
              <span>List Business</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-600 hover:text-violet-600"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-normal rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-sm font-normal ${
                  isActive ? 'bg-violet-100 text-violet-900 font-medium' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-violet-700 stroke-[1.5]" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-light bg-amber-500 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenAuth('signin');
                setMobileMenuOpen(false);
              }}
              className="py-2 rounded-xl border border-violet-600 text-violet-700 font-normal text-xs text-center"
            >
              Sign In
            </button>

            <button
              onClick={() => {
                onOpenVendorRegister();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-1 py-2 rounded-xl bg-violet-700 text-white font-normal text-xs text-center shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300 stroke-[1.5]" />
              <span>List Business</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
