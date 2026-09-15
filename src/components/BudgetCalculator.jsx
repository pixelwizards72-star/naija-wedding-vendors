import React, { useState } from 'react';
import { Calculator, Sparkles, PieChart, ArrowRight, DollarSign, Check, Copy, Flame, Layers } from 'lucide-react';

export default function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState(5000000); // Default 5 million Naira
  const [eventType, setEventType] = useState('white-traditional');
  const [copied, setCopied] = useState(false);

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Multi-color breakdown matching user's dashboard mockup image (Purple, Yellow, Orange, Cyan, Indigo, Emerald)
  const budgetBreakdown = [
    {
      category: 'Catering & Drinks Cooling',
      percentage: 35,
      amount: Math.round(totalBudget * 0.35),
      color: 'bg-violet-600',
      badgeColor: 'bg-violet-100 text-violet-900 border-violet-200',
      tips: 'Covers Party Jollof, swallows, small chops, live grills & drinks cooling.'
    },
    {
      category: 'Venue & Marquee Hall',
      percentage: 25,
      amount: Math.round(totalBudget * 0.25),
      color: 'bg-amber-500',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      tips: 'Covers hall rental, AC maintenance & generator backup fuel.'
    },
    {
      category: 'Decor & Stage Lighting',
      percentage: 15,
      amount: Math.round(totalBudget * 0.15),
      color: 'bg-orange-500',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200',
      tips: 'Floral backdrops, chiavari chairs, mood lighting & cold spark fireworks.'
    },
    {
      category: 'Photography & 360 Booth',
      percentage: 10,
      amount: Math.round(totalBudget * 0.10),
      color: 'bg-cyan-500',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      tips: 'Cinematic 4K video reel, photobook album & 360 video booth.'
    },
    {
      category: 'Music, DJ & Alaga MC',
      percentage: 8,
      amount: Math.round(totalBudget * 0.08),
      color: 'bg-indigo-600',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      tips: 'Highlife live band, concert sound system & traditional Alaga duo.'
    },
    {
      category: 'MUA, Gele, Security & Misc',
      percentage: 7,
      amount: Math.round(totalBudget * 0.07),
      color: 'bg-emerald-600',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      tips: 'Bridal makeup outfit switches, gate bouncers & guest souvenirs.'
    }
  ];

  const handleCopyBreakdown = () => {
    const text = `Owambe Event Budget Estimate (${formatNaira(totalBudget)}):\n\n` +
      budgetBreakdown.map(b => `• ${b.category} (${b.percentage}%): ${formatNaira(b.amount)}`).join('\n') +
      `\n\nGenerated via OwambeHub Nigeria`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-900 text-xs font-bold mb-3 border border-violet-200">
          <Calculator className="w-4 h-4 text-violet-700" />
          <span>Interactive Owambe Budget Planner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Estimate Your Nigerian Event & Wedding Budget
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Slide your total budget in Naira (₦) to see realistic cost allocation recommendations based on recent Nigerian wedding data.
        </p>
      </div>

      {/* Grid of Multi-color Cards (Inspired by User's Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {budgetBreakdown.slice(0, 4).map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} text-white p-5 rounded-3xl shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">
                {card.category.split('&')[0]}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-xs">
                {card.percentage}%
              </span>
            </div>
            
            <div className="z-10">
              <div className="text-2xl font-extrabold font-serif">{formatNaira(card.amount)}</div>
              <p className="text-[11px] text-white/90 line-clamp-1 mt-1 font-medium">{card.tips}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
          
          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Total Budget Slider
              </label>
              <span className="text-2xl font-extrabold font-serif text-violet-950">
                {formatNaira(totalBudget)}
              </span>
            </div>

            <input
              type="range"
              min="500000"
              max="30000000"
              step="250000"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
            
            <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-2">
              <span>₦500,000 (Compact)</span>
              <span>₦15 Million</span>
              <span>₦30 Million+ (Grand)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Quick Budget Presets:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '₦1.5M', value: 1500000 },
                { label: '₦5.0M', value: 5000000 },
                { label: '₦12.0M', value: 12000000 },
              ].map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setTotalBudget(preset.value)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    totalBudget === preset.value
                      ? 'bg-violet-700 text-white border-violet-700 shadow-sm'
                      : 'bg-purple-50/60 text-slate-700 border-purple-100 hover:bg-purple-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Event Type selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Event Type:</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-violet-600"
            >
              <option value="white-traditional">Joint Traditional & White Wedding</option>
              <option value="yoruba-engagement">Yoruba Traditional Engagement (Alaga Focus)</option>
              <option value="igba-nkwu">Igbo Igba Nkwu Ceremony</option>
              <option value="corporate-gala">Corporate Gala / Milestone Birthday</option>
            </select>
          </div>

          {/* Action Copy button */}
          <button
            onClick={handleCopyBreakdown}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-700 text-white font-extrabold text-xs hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-amber-300" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Budget Breakdown'}</span>
          </button>

        </div>

        {/* Right Itemized Breakdown Display */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-100">
            <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-violet-600" />
              <span>Recommended Spending Allocations</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">Total: 100%</span>
          </div>

          {/* Stacked Visual Bar */}
          <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner">
            {budgetBreakdown.map((item, idx) => (
              <div
                key={idx}
                style={{ width: `${item.percentage}%` }}
                className={`${item.color} h-full transition-all duration-500`}
                title={`${item.category}: ${item.percentage}%`}
              />
            ))}
          </div>

          {/* Itemized List */}
          <div className="space-y-3 pt-2">
            {budgetBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-purple-50/60 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${item.color} mt-1 shrink-0`} />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.category} <span className="text-xs text-slate-400">({item.percentage}%)</span>
                    </h4>
                    <p className="text-xs text-slate-500 font-normal">{item.tips}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 font-extrabold text-base text-violet-950">
                  {formatNaira(item.amount)}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
