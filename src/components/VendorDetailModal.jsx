import React, { useState } from 'react';
import { 
  X, Star, MapPin, ShieldCheck, Heart, MessageSquare, 
  CheckCircle2, Calendar, Users, Award, Send, Phone, Instagram, Clock 
} from 'lucide-react';

export default function VendorDetailModal({
  vendor,
  onClose,
  isFavorite,
  onToggleFavorite
}) {
  if (!vendor) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(vendor.packages ? vendor.packages[0] : null);
  
  // Quote form state
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('200');
  const [eventLocation, setEventLocation] = useState(vendor.locationLabel || '');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Review state with local Akwa Ibom & Nigerian names
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Anietie & Kufre U.', rating: 5, date: '2 weeks ago', comment: 'Phenomenal service! Delivered delicious Afang soup and hot party Jollof on time in Uyo. Our guests loved every bite!' },
    { id: 2, name: 'Engr. Bassey E.', rating: 5, date: '1 month ago', comment: 'CAC verification gave me total peace of mind. Very professional team!' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const formatNaira = (amount) => {
    if (typeof amount === 'string') return amount;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleLaunchWhatsApp = () => {
    const pkgName = selectedPackage ? selectedPackage.name : 'General Package Inquiry';
    const text = encodeURIComponent(
      `Hello ${vendor.name}!\n\nI found your verified business listing on Party Vendors Nigeria (Uyo, Akwa Ibom HQ).\n\n` +
      `📅 Event Date: ${eventDate || 'Pending'}\n` +
      `👥 Estimated Guests: ${guestCount}\n` +
      `📍 Location: ${eventLocation}\n` +
      `📦 Package Interest: ${pkgName}\n\n` +
      `Could you please confirm your availability and quote details?`
    );
    window.open(`https://wa.me/${vendor.whatsapp}?text=${text}`, '_blank');
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      alert(`Thank you ${clientName}! Your booking inquiry has been sent to ${vendor.name}. They will contact you via WhatsApp/Call shorty.`);
    }, 1200);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setReviews([
      { id: Date.now(), name: 'Verified Guest', rating: newRating, date: 'Just now', comment: newComment },
      ...reviews
    ]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col font-sans">
        
        {/* Modal Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-900 font-light text-xs">
              {vendor.categoryLabel}
            </span>
            {vendor.verified && (
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-light text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[1.5]" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(vendor.id)}
              className={`p-2 rounded-full border transition-all ${
                isFavorite ? 'bg-rose-50 text-rose-600 border-rose-200' : 'text-slate-400 border-slate-200 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 stroke-[1.5] ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Top Section: Gallery & Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Gallery Slider */}
            <div>
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-sm">
                <img
                  src={vendor.gallery ? vendor.gallery[activeImageIndex] : vendor.coverImage}
                  alt={vendor.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {vendor.gallery && vendor.gallery.length > 1 && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {vendor.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vendor Core Details */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-light font-serif text-slate-900">
                  {vendor.name}
                </h1>
                <div className="flex items-center space-x-2 mt-1.5 text-xs font-light text-slate-500">
                  <MapPin className="w-4 h-4 text-violet-500 stroke-[1.5]" />
                  <span>{vendor.locationLabel}, {vendor.state}</span>
                </div>
              </div>

              {/* Rating & CAC status */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-normal">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 stroke-[1.5]" />
                  <span>{vendor.rating} Out of 5</span>
                  <span className="text-slate-400 font-light">({vendor.reviewCount} Reviews)</span>
                </div>

                {vendor.cacRegistered && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-normal">
                    <Award className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
                    <span>CAC Business Registered</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {vendor.description}
              </p>

              {/* Social & Contact Handle Bar */}
              <div className="flex items-center space-x-4 pt-2 border-t border-purple-100 text-xs font-light text-slate-600">
                <div className="flex items-center space-x-1">
                  <Instagram className="w-4 h-4 text-pink-600 stroke-[1.5]" />
                  <span>{vendor.instagram || '@partyvendor_ng'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
                  <span>{vendor.phone}</span>
                </div>
              </div>

              {/* Starting Price Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950 to-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-light text-amber-300 tracking-wider">Starting Package</span>
                  <div className="text-xl font-normal text-white">
                    {formatNaira(vendor.startingPrice)}
                  </div>
                </div>
                <button
                  onClick={handleLaunchWhatsApp}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-normal flex items-center space-x-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

          {/* Service Package Options */}
          {vendor.packages && vendor.packages.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <h3 className="text-lg font-light font-serif text-slate-900">
                Available Service Packages & Pricing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {vendor.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-purple-50/70 border-violet-500 shadow-md ring-2 ring-violet-400' 
                          : 'bg-white border-purple-100 hover:border-violet-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-normal text-sm text-slate-900">{pkg.name}</h4>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-violet-600 stroke-[1.5]" />}
                        </div>
                        <div className="text-base font-normal text-violet-950 mb-3">
                          {pkg.price}
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-light">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Quote / Direct Inquiry Form */}
          <div className="bg-purple-50/40 p-6 rounded-3xl border border-purple-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-normal text-slate-900">Request Instant Event Quote</h3>
                <p className="text-xs text-slate-500 font-light">Send your event requirements directly to {vendor.name}</p>
              </div>
              <Clock className="w-5 h-5 text-amber-600 stroke-[1.5]" />
            </div>

            <form onSubmit={handleQuoteSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-light text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mrs. Edidiong Akpan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-purple-100 text-xs font-light text-slate-800 focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-slate-700 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., 0803 123 4567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-purple-100 text-xs font-light text-slate-800 focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-slate-700 mb-1">Proposed Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-purple-100 text-xs font-light text-slate-800 focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-slate-700 mb-1">Estimated Guests</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-purple-100 text-xs font-light text-slate-800 focus:ring-2 focus:ring-violet-600"
                >
                  <option value="50-100">50 - 100 Guests</option>
                  <option value="200-300">200 - 300 Guests</option>
                  <option value="500+">500+ Party Crowd</option>
                  <option value="1000+">1,000+ Grand Banquet</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={quoteSubmitted}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-normal text-xs hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-amber-400 stroke-[1.5]" />
                  <span>{quoteSubmitted ? 'Sending Inquiry...' : 'Submit Inquiry Form'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-normal text-xs transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                  <span>Launch WhatsApp Direct Chat</span>
                </button>
              </div>
            </form>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-4 pt-4 border-t border-purple-100">
            <h3 className="text-lg font-light font-serif text-slate-900">
              Verified Customer Reviews & Ratings
            </h3>

            {/* Submit New Review Form */}
            <form onSubmit={handleAddReview} className="p-4 bg-white rounded-2xl border border-purple-100 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-light text-slate-700">Your Rating:</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 stroke-[1.5] ${
                          star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Write your review experience with this vendor..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 bg-purple-50/40 rounded-xl border border-purple-100 text-xs font-light text-slate-800 focus:ring-2 focus:ring-violet-600"
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-violet-700 text-white font-normal text-xs hover:bg-violet-800 transition-all"
              >
                Post Verified Review
              </button>
            </form>

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-purple-50/30 rounded-2xl border border-purple-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-normal text-xs text-slate-900">{rev.name}</span>
                    <span className="text-[10px] text-slate-400 font-light">{rev.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500 stroke-[1.5]" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 font-light pt-1">{rev.comment}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
