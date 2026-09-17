import React, { useState } from 'react';
import { DIGITAL_INVITE_TEMPLATES } from '../data/inviteTemplates';
import { Mail, Sparkles, CheckCircle2, Eye, ExternalLink, Calendar, MapPin, Music, Heart, X, Send } from 'lucide-react';

export default function DigitalInvites() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [guestRsvpSubmitted, setGuestRsvpSubmitted] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState('Yes, I will be attending');

  const handleSimulateRsvp = (e) => {
    e.preventDefault();
    if (!rsvpName) return;
    setGuestRsvpSubmitted(true);
    setTimeout(() => {
      setGuestRsvpSubmitted(false);
      alert(`RSVP Confirmed for ${rsvpName}! You've been added to the guestlist for ${selectedTemplate.title}.`);
    }, 1200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Feature Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-900 text-xs font-light mb-4 border border-violet-200">
          <Sparkles className="w-4 h-4 text-violet-700 stroke-[1.5]" />
          <span>Party Vendors Digital Invites & RSVP Suite</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light font-serif text-slate-900 tracking-tight">
          Digital Invitations as Beautiful as Your Special Day
        </h2>
        <p className="mt-3 text-base text-slate-600 font-light">
          Create luxury mobile digital invitations with instant WhatsApp sharing, automatic guest RSVP tracking, venue directions & dress code palettes.
        </p>
      </div>

      {/* Grid of Digital Invite Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {DIGITAL_INVITE_TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="group bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Cover Preview Image */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={tmpl.coverImage}
                  alt={tmpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-light uppercase tracking-wider">
                  {tmpl.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-normal font-serif">{tmpl.title}</h3>
                  <p className="text-xs text-amber-300 font-light">{tmpl.theme}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                  {tmpl.description}
                </p>

                <div className="flex items-center space-x-1.5 text-xs text-violet-900 font-light bg-violet-50 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-700 stroke-[1.5]" />
                  <span>RSVP Link + Google Maps Included</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-light text-slate-400">One-time Price</span>
                <div className="text-lg font-normal text-slate-900">{tmpl.price}</div>
              </div>

              <button
                onClick={() => setSelectedTemplate(tmpl)}
                className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-normal text-xs flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Eye className="w-4 h-4 stroke-[1.5]" />
                <span>Live Preview</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Feature Highlight Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-950 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-violet-800/40">
        <div className="space-y-4 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-light uppercase tracking-wider">
            Why Brides & Planners Love Digital Invites
          </span>
          <h3 className="text-2xl sm:text-3xl font-light font-serif">
            Collect RSVPs Directly on WhatsApp with One Single Link
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            Share your custom web invitation card link on WhatsApp, Instagram, or SMS. Guests RSVP with their guest counts, meal preferences, and warm wishes.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-light text-amber-200">
            <span className="flex items-center space-x-1"><CheckCircle2 className="w-4 h-4 stroke-[1.5]" /> RSVP Guest Tracking</span>
            <span className="flex items-center space-x-1"><CheckCircle2 className="w-4 h-4 stroke-[1.5]" /> Background Music</span>
            <span className="flex items-center space-x-1"><CheckCircle2 className="w-4 h-4 stroke-[1.5]" /> Cultural Dress Code Palette</span>
          </div>
        </div>

        <button
          onClick={() => setSelectedTemplate(DIGITAL_INVITE_TEMPLATES[0])}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-normal text-sm shadow-xl hover:brightness-110 shrink-0 transition-all"
        >
          Try Sample Digital Invitation
        </button>
      </div>

      {/* Interactive Live Invitation Card Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 font-sans">
          
          <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-violet-500/30 my-auto">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>

            {/* Invitation Header Banner */}
            <div className="relative h-64 w-full">
              <img
                src={selectedTemplate.coverImage}
                alt={selectedTemplate.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-center">
                <span className="text-xs font-light uppercase tracking-widest text-amber-400">
                  {selectedTemplate.theme}
                </span>
                <h2 className="text-2xl font-normal font-serif text-white mt-1">
                  Dr. Aniebiet & Arc. Edidiong
                </h2>
                <p className="text-xs text-slate-300 italic font-light">Request the honor of your presence at their celebration</p>
              </div>
            </div>

            {/* Invitation Details Body */}
            <div className="p-6 space-y-6 text-center font-light">
              
              {/* Date & Location */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                <div className="flex flex-col items-center">
                  <Calendar className="w-5 h-5 text-amber-400 mb-1 stroke-[1.5]" />
                  <span className="font-normal text-white">Saturday, Dec 12</span>
                  <span className="text-slate-400 font-light">10:00 AM Prompt</span>
                </div>

                <div className="flex flex-col items-center">
                  <MapPin className="w-5 h-5 text-amber-400 mb-1 stroke-[1.5]" />
                  <span className="font-normal text-white">Ibom Icon Hall</span>
                  <span className="text-slate-400 font-light">Uyo, Akwa Ibom</span>
                </div>
              </div>

              {/* Cultural Dress Code Palette */}
              <div>
                <span className="text-xs font-light text-amber-300 uppercase tracking-wider block mb-2">
                  Official Cultural Dress Code Palette
                </span>
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 border border-white" />
                    <span className="text-xs text-slate-300">Emerald Green</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-400 border border-white" />
                    <span className="text-xs text-slate-300">Champagne Gold</span>
                  </div>
                </div>
              </div>

              {/* Live RSVP Interactive Form Simulator */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left space-y-3">
                <h4 className="text-sm font-normal text-amber-300 flex items-center space-x-2">
                  <Mail className="w-4 h-4 stroke-[1.5]" />
                  <span>Interactive Guest RSVP Simulator</span>
                </h4>

                <form onSubmit={handleSimulateRsvp} className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-light">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief & Lolo Okon"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs font-light text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-light">Will You Attend?</label>
                    <select
                      value={rsvpAttendance}
                      onChange={(e) => setRsvpAttendance(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs font-light text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="Yes">Yes! I will be attending with joy 🎉</option>
                      <option value="No">Regrettably cannot attend 💌</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={guestRsvpSubmitted}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-normal text-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <Send className="w-4 h-4 stroke-[1.5]" />
                    <span>{guestRsvpSubmitted ? 'Sending RSVP...' : 'Submit RSVP Response'}</span>
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
