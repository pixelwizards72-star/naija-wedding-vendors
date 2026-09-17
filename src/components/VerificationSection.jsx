import React from 'react';
import { ShieldCheck, FileCheck2, Award, UserCheck, CheckCircle2 } from 'lucide-react';

export default function VerificationSection() {
  const steps = [
    {
      step: '01',
      icon: UserCheck,
      title: 'Business & CAC Registration',
      description: 'We verify Corporate Affairs Commission (CAC) status, physical address, and valid government identity cards for every listing.'
    },
    {
      step: '02',
      icon: FileCheck2,
      title: 'Portfolio & Work Quality Review',
      description: 'Our team manually inspects past event photographs, high-res videos, and client references before approving vendor profiles.'
    },
    {
      step: '03',
      icon: Award,
      title: 'Service Reliability Guarantee',
      description: 'Vendors must commit to strict SLA terms regarding punctuality, food safety hygiene, and equipment backup readiness.'
    },
    {
      step: '04',
      icon: ShieldCheck,
      title: 'Verified Review Monitoring',
      description: 'Only clients who booked through the platform or verified contacts can submit reviews. Fake reviews are filtered out automatically.'
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-light mb-4 border border-violet-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-300 stroke-[1.5]" />
            <span>Party Vendors Verification Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light font-serif text-white tracking-tight">
            We Don't Just List Anyone. Real Vendors. Verified Quality.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light">
            Every vendor on Party Vendors undergoes multi-step identity & CAC checks so you can plan your wedding with complete peace of mind.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/80 hover:border-amber-500/50 transition-all group relative"
              >
                <div className="text-4xl font-light font-serif text-slate-700 group-hover:text-amber-500/40 transition-colors mb-4">
                  {item.step}
                </div>
                
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <h3 className="text-lg font-normal text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-violet-700/40">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-light font-serif">Are You a Reliable Nigerian Event Vendor?</h4>
            <p className="text-xs text-amber-200 font-light">Get listed today (HQ in Uyo, Akwa Ibom) and receive booking inquiries directly on your WhatsApp.</p>
          </div>
          <button className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-normal text-xs hover:bg-slate-100 shadow-md shrink-0 transition-all">
            Apply for Vendor Verification
          </button>
        </div>

      </div>
    </section>
  );
}
