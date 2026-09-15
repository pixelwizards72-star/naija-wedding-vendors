import React from 'react';
import { Sparkles, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ onOpenVendorRegister }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-emerald-800 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-2xl font-extrabold font-serif text-white tracking-tight">
              OwambeHub
            </span>
          </div>

          <p className="text-xs leading-relaxed text-slate-400">
            Nigeria's premier digital event platform inspired by Eventor.ng & Celevend. Connect directly with CAC verified vendors, create digital invites, and estimate event budgets in Naira.
          </p>

          <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Identity & CAC Checked Directory</span>
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Popular Searches</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#marketplace" className="hover:text-amber-400">Party Jollof Caterers in Lagos</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Yoruba Alaga Idimu in Ikeja</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">360 Video Booths in Abuja</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Bridal MUA & Gele in Victoria Island</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Live Highlife Band in Surulere</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Vendor Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#marketplace" className="hover:text-amber-400">Catering & Party Jollof</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Alaga & Event MCs</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Photography & 360 Booths</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Venues & Marquee Halls</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400">Drinks Cooling & Small Chops</a></li>
          </ul>
        </div>

        {/* For Vendors */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">For Nigerian Vendors</h4>
          <p className="text-xs text-slate-400">
            Grow your business across Lagos, Abuja, Port Harcourt & 36 states. Receive direct WhatsApp client leads with zero setup fees.
          </p>
          <button
            onClick={onOpenVendorRegister}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-amber-600 text-white font-bold text-xs hover:brightness-110 transition-all shadow-md"
          >
            Register Your Business (Free)
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 OwambeHub Nigeria. Built for Nigerian Weddings & Milestone Events.</p>
        <div className="flex space-x-6 items-center">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Trust & Security</a>
          <span className="text-slate-700">|</span>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-admin-portal'))}
            className="text-amber-400 hover:underline font-bold flex items-center space-x-1"
          >
            <span>Admin Console</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
