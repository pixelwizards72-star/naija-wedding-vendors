import React from 'react';
import { Sparkles, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ onOpenVendorRegister }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-700 via-indigo-600 to-purple-500 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-amber-300 stroke-[1.5]" />
            </div>
            <span className="text-2xl font-normal font-serif text-white tracking-tight">
              Party Vendors
            </span>
          </div>

          <p className="text-xs leading-relaxed text-slate-400 font-light">
            Nigeria's premier digital event platform domiciled & headquartered in Uyo, Akwa Ibom State. Connect directly with CAC verified vendors across Akwa Ibom, Lagos, Abuja & 36 states.
          </p>

          <div className="flex items-center space-x-2 text-xs text-amber-300 font-light">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
            <span>HQ: Uyo, Akwa Ibom State · Identity & CAC Checked</span>
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h4 className="text-xs font-light text-white uppercase tracking-widest mb-4">Hot Zone Searches</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><a href="#marketplace" className="hover:text-amber-300">Party Jollof & Afang Chefs in Uyo</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Akwa Ibom Traditional MCs in Eket</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">360 Video Booths in Uyo & Abuja</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Bridal MUA in Victoria Island & Uyo</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Highlife Live Bands in Port Harcourt & Uyo</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-light text-white uppercase tracking-widest mb-4">Vendor Categories</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><a href="#marketplace" className="hover:text-amber-300">Catering & Native Soups</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Event MCs & Cultural Hosts</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Photography & 360 Booths</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Venues & Marquee Halls</a></li>
            <li><a href="#marketplace" className="hover:text-amber-300">Drinks Cooling & Small Chops</a></li>
          </ul>
        </div>

        {/* For Vendors */}
        <div className="space-y-4">
          <h4 className="text-xs font-light text-white uppercase tracking-widest">For Nigerian Vendors</h4>
          <p className="text-xs text-slate-400 font-light">
            Grow your business in Uyo, Akwa Ibom State & across 36 states. Receive direct WhatsApp client leads with zero setup fees.
          </p>
          <button
            onClick={onOpenVendorRegister}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-800 text-white font-normal text-xs hover:brightness-110 transition-all shadow-md"
          >
            Register Your Business (Free)
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-light gap-4">
        <p>© 2026 Party Vendors Nigeria (Domiciled in Uyo, Akwa Ibom State). All rights reserved.</p>
        <div className="flex space-x-6 items-center">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Trust & Security</a>
          <span className="text-slate-700">|</span>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-admin-portal'))}
            className="text-amber-400 hover:underline font-light flex items-center space-x-1"
          >
            <span>Admin Console</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
