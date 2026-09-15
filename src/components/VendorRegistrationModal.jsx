import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, CheckCircle2, ShieldCheck, Camera, Phone, MapPin, Tag } from 'lucide-react';
import { CATEGORIES, LOCATIONS } from '../data/categories';

export default function VendorRegistrationModal({ onClose, onAddVendor }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('catering');
  const [locationId, setLocationId] = useState('lagos-lekki');
  const [state, setState] = useState('Lagos State');
  const [startingPrice, setStartingPrice] = useState(350000);
  const [whatsapp, setWhatsapp] = useState('2348030000000');
  const [phone, setPhone] = useState('+234 803 000 0000');
  const [instagram, setInstagram] = useState('@mybusiness_ng');
  const [cacNumber, setCacNumber] = useState('RC-1928374');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop');
  const [cacRegistered, setCacRegistered] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !whatsapp) return;

    setIsSubmitting(true);

    const catObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[1];
    const locObj = LOCATIONS.find(l => l.id === locationId) || LOCATIONS[1];

    const newVendor = {
      id: `v-user-${Date.now()}`,
      name,
      category,
      categoryLabel: catObj.name,
      locationId,
      locationLabel: locObj.label.split('-')[1]?.trim() || locObj.label,
      state,
      verified: cacRegistered, 
      cacRegistered,
      cacNumber: cacNumber || 'RC-Pending',
      status: 'pending', // Starts in PENDING REVIEW state for Admin approval
      rating: 5.0,
      reviewCount: 1,
      startingPrice: Number(startingPrice),
      priceTier: startingPrice > 1500000 ? 'premium' : startingPrice > 500000 ? 'standard' : 'budget',
      whatsapp: whatsapp.replace(/\D/g, ''),
      phone,
      instagram,
      tagline: tagline || description.slice(0, 80),
      description,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      gallery: [
        coverImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop'
      ],
      packages: [
        { name: "Starter Package", price: `₦${Number(startingPrice).toLocaleString()}`, features: ["Full Event Service", "Professional Setup", "Direct WhatsApp Support"] }
      ],
      tags: [catObj.name, locObj.label.split('-')[0] || 'Nigeria', 'Newly Registered'],
      featured: false
    };

    setTimeout(() => {
      onAddVendor(newVendor);
      setIsSubmitting(false);
      alert(`Success! ${name} registration submitted!\n\nStatus: PENDING ADMIN REVIEW\nYour document & listing will be reviewed by the admin before going live on the public site. You can also view it in the Admin Portal tab!`);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-purple-100">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-violet-700 text-white flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900">List Your Business on OwambeHub</h3>
              <p className="text-xs text-slate-500">Free registration for Nigerian Event & Wedding Vendors</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Business / Brand Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Owambe Chefs & Party Catering Ltd"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-800"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">State / Location *</label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-800"
              >
                {LOCATIONS.filter(l => l.id !== 'all').map(l => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number *</label>
              <input
                type="text"
                required
                placeholder="2348031234567"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CAC Registration Number (RC Number)</label>
              <input
                type="text"
                placeholder="RC-1928374"
                value={cacNumber}
                onChange={(e) => setCacNumber(e.target.value)}
                className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price (in Naira ₦) *</label>
              <input
                type="number"
                required
                step="50000"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Handle</label>
              <input
                type="text"
                placeholder="@mybrand_ng"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Catchy Tagline</label>
            <input
              type="text"
              placeholder="e.g., Award-winning Yoruba Alaga & Traditional Event Host in Ikeja"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Service Description</label>
            <textarea
              rows={3}
              placeholder="Describe your services, experience, equipment, and event history across Nigeria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-slate-900"
            />
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              All new vendor submissions enter <strong>Pending Admin Review</strong>. Once the admin verifies your CAC document and identity details, your profile will be approved for the public marketplace.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Submitting Registration...' : 'Submit Listing for Admin Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
