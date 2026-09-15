import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Tolu & Kunle Adeniyi",
      role: "Couple · Wedding in Lekki, Lagos",
      comment: "Finding a reliable Alaga Idimu and Party Jollof caterer for 600 guests used to stress us out. OwambeHub allowed us to chat directly on WhatsApp with CAC verified vendors. Everything ran smoothly!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Zainab Bello",
      role: "Corporate Planner · Abuja",
      comment: "Celevend-style digital invites with RSVP guest links allowed us to track attendance in Maitama effortlessly. The vendors on this platform are top tier.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Chief Emeka Nwachukwu",
      role: "Father of Bride · Port Harcourt",
      comment: "I checked the vendor identity badges before booking our 360 photo booth and live highlife band. Zero agent middleman markups. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Real Planners · Real Experiences</span>
          <h2 className="text-3xl font-extrabold font-serif text-slate-900 mt-1">
            Trusted by Thousands Across Nigeria
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-slate-200">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
