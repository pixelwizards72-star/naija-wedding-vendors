import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Iniobong & Anietie Akpan",
      role: "Couple · Wedding in Uyo, Akwa Ibom",
      comment: "Finding a reliable Afang caterer and traditional MC for 700 guests in Uyo used to stress us out. Party Vendors allowed us to chat directly on WhatsApp with CAC verified local vendors. Our special day was incredible!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Nsikan Okon",
      role: "Event Planner · Eket, Akwa Ibom",
      comment: "Digital invites with RSVP guest links allowed us to track attendance in Uyo effortlessly. The vendors listed on Party Vendors are genuine, verified, and punctual.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Idaraobong Essien",
      role: "Bride · Uyo, Akwa Ibom",
      comment: "I checked the vendor identity badges before booking our 360 photo booth and live highlife band. Zero agent middleman markups. Party Vendors is a lifesaver!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-purple-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-light uppercase tracking-widest text-violet-700">Real Planners · Real Experiences</span>
          <h2 className="text-3xl font-light font-serif text-slate-900 mt-1">
            Trusted by Thousands Across Akwa Ibom & Nigeria
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50/70 p-6 rounded-3xl border border-purple-100 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-[1.5]" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-light italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-purple-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
                <div>
                  <h4 className="text-xs font-normal text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-500 font-light">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
