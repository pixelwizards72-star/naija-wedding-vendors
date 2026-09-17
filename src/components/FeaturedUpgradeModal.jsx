import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ShieldCheck, Zap, CreditCard, 
  Wallet, ChevronRight, Lock, Copy, CheckCircle2, ArrowRight, QrCode
} from 'lucide-react';
import { FEATURED_PLANS, PAYMENT_GATEWAYS } from '../data/featuredPlans';

export default function FeaturedUpgradeModal({ 
  isOpen, 
  onClose, 
  vendors = [], 
  selectedVendorId = null,
  onActivateFeatured 
}) {
  const [step, setStep] = useState(1); // 1: Plan & Vendor, 2: Gateway, 3: Checkout, 4: Success
  const [targetVendorId, setTargetVendorId] = useState(selectedVendorId || (vendors[0]?.id || ''));
  const [selectedPlanId, setSelectedPlanId] = useState('quarterly'); // 3 Months default popular
  const [selectedGatewayId, setSelectedGatewayId] = useState('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [cardForm, setCardForm] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888',
    name: ''
  });

  if (!isOpen) return null;

  const activePlan = FEATURED_PLANS.find(p => p.id === selectedPlanId) || FEATURED_PLANS[1];
  const activeGateway = PAYMENT_GATEWAYS.find(g => g.id === selectedGatewayId) || PAYMENT_GATEWAYS[0];
  const currentVendor = vendors.find(v => v.id === targetVendorId) || vendors[0];

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleCopyUSDT = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Calculate expiration date based on months
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + activePlan.durationMonths);

      if (onActivateFeatured && currentVendor) {
        onActivateFeatured({
          vendorId: currentVendor.id,
          plan: activePlan,
          gateway: activeGateway.id,
          expiryDate: expiryDate.toISOString()
        });
      }

      setIsProcessing(false);
      setStep(4);
    }, 1800);
  };

  const resetAndClose = () => {
    setStep(1);
    setTxHash('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 p-6 text-white relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-amber-300 text-xs font-medium uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 fill-amber-300" />
            <span>Party Vendors Homepage Spotlight</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Promote & Feature Your Business
          </h2>
          <p className="text-sm text-slate-300 font-light mt-1 max-w-lg">
            Get top homepage placement, priority search ranking, and 5x more client inquiries across Akwa Ibom & Nigeria.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center space-x-3 mt-6">
            {[
              { num: 1, label: "Select Duration" },
              { num: 2, label: "Payment Gateway" },
              { num: 3, label: "Checkout" },
              { num: 4, label: "Activated" }
            ].map((s) => (
              <div key={s.num} className="flex items-center space-x-1.5">
                <span className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                  step === s.num 
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20' 
                    : step > s.num 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/20 text-slate-400'
                }`}>
                  {step > s.num ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </span>
                <span className={`text-xs font-light hidden sm:inline ${step === s.num ? 'text-white font-normal' : 'text-slate-400'}`}>
                  {s.label}
                </span>
                {s.num < 4 && <ChevronRight className="w-3 h-3 text-slate-600 hidden sm:inline" />}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* STEP 1: Select Vendor & Plan Duration */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Select Vendor Selector */}
              {vendors.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 uppercase tracking-wide mb-2">
                    Select Vendor Profile to Feature
                  </label>
                  <select
                    value={targetVendorId}
                    onChange={(e) => setTargetVendorId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  >
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.locationLabel}) {v.featured ? '⭐ Already Featured' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Plans Grid (1M, 3M, 6M, 1Y) */}
              <div>
                <label className="block text-xs font-medium text-slate-700 uppercase tracking-wide mb-3">
                  Choose Featured Duration Plan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURED_PLANS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'border-violet-600 bg-violet-50/50 shadow-md ring-2 ring-violet-600/20' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {plan.badge && (
                          <span className={`absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            plan.popular ? 'bg-amber-400 text-slate-950' : 'bg-violet-700 text-white'
                          }`}>
                            {plan.badge}
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                            {plan.savingsLabel && (
                              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {plan.savingsLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                          <div>
                            <span className="text-xl font-bold text-violet-950">
                              {formatNaira(plan.priceNGN)}
                            </span>
                            <span className="text-xs text-slate-400 font-light ml-1">
                              / ${plan.priceUSD} USD
                            </span>
                          </div>
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/25 transition-all"
              >
                <span>Continue to Payment Gateway</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: Select Payment Gateway */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-violet-700 uppercase font-medium block">Selected Duration</span>
                  <span className="text-base font-bold text-violet-950">{activePlan.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-violet-950">{formatNaira(activePlan.priceNGN)}</span>
                  <span className="text-xs text-slate-500 block">(${activePlan.priceUSD} USD)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 uppercase tracking-wide mb-3">
                  Select Integrated Payment Method
                </label>
                <div className="space-y-3">
                  {PAYMENT_GATEWAYS.map((gw) => {
                    const isSelected = selectedGatewayId === gw.id;
                    return (
                      <div
                        key={gw.id}
                        onClick={() => setSelectedGatewayId(gw.id)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-violet-600 bg-violet-50/40 shadow-sm ring-2 ring-violet-600/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${gw.color}`}>
                            {gw.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-slate-900 text-sm">{gw.name}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                                {gw.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-light mt-0.5">{gw.description}</p>
                          </div>
                        </div>

                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-4 rounded-2xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/25 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Checkout Screen */}
          {step === 3 && (
            <form onSubmit={handleConfirmPayment} className="space-y-6 animate-fade-in">
              <div className="bg-slate-900 p-4 rounded-2xl text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-300 font-medium uppercase block">Checkout Order</span>
                  <span className="text-sm font-semibold">{currentVendor?.name || 'Party Vendor'}</span>
                  <span className="text-xs text-slate-400 block">{activePlan.name} • {activeGateway.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-white">
                    {activeGateway.id === 'usdt' || activeGateway.id === 'paypal' || activeGateway.id === 'stripe'
                      ? `$${activePlan.priceUSD} USD`
                      : formatNaira(activePlan.priceNGN)}
                  </span>
                </div>
              </div>

              {/* Gateway-Tailored Checkout Body */}
              {(activeGateway.id === 'paystack' || activeGateway.id === 'flutterwave' || activeGateway.id === 'stripe') && (
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center space-x-2 text-xs text-slate-600 mb-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>256-bit Encrypted Card Payment powered by <strong>{activeGateway.name}</strong></span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name as on Card"
                      value={cardForm.name}
                      onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-violet-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="4242 4242 4242 4242"
                      value={cardForm.cardNumber}
                      onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-mono focus:ring-2 focus:ring-violet-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-mono focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">CVV Security Code</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="888"
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-mono focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeGateway.id === 'paypal' && (
                <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-200 text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl shadow-md">
                    P
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-950">PayPal Checkout Integration</h4>
                    <p className="text-xs text-blue-700 font-light mt-1">
                      You will complete your payment securely via PayPal for <strong>${activePlan.priceUSD} USD</strong>.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-blue-100 text-xs text-slate-600">
                    Supports PayPal Balance, Credit Cards, or Pay in 4 Interest-Free Installments.
                  </div>
                </div>
              )}

              {activeGateway.id === 'usdt' && (
                <div className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200 space-y-4">
                  <div className="flex items-center space-x-2 text-teal-900 font-semibold text-sm">
                    <QrCode className="w-5 h-5 text-teal-600" />
                    <span>Send ${activePlan.priceUSD} USDT (TRC20 / ERC20)</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-teal-100 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">USDT TRC20 Wallet Address:</span>
                      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 mt-1">
                        <span className="truncate text-slate-800 font-bold">{activeGateway.trc20Address}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyUSDT(activeGateway.trc20Address)}
                          className="ml-2 px-2 py-1 bg-teal-600 text-white rounded text-[10px] hover:bg-teal-700"
                        >
                          {copiedAddress ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Blockchain Transaction Hash / TxID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Paste 0x... or TRC20 transaction hash"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-4 rounded-2xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center space-x-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Payment...</span>
                    </span>
                  ) : (
                    <span>
                      Pay & Activate ({activeGateway.id === 'usdt' || activeGateway.id === 'paypal' || activeGateway.id === 'stripe' ? `$${activePlan.priceUSD}` : formatNaira(activePlan.priceNGN)})
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Activation */}
          {step === 4 && (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-amber-300 rounded-full mx-auto flex items-center justify-center text-slate-950 shadow-xl shadow-amber-400/30">
                <Sparkles className="w-10 h-10 fill-slate-950 animate-bounce" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Spotlight Active
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">
                  Congratulations! Business Featured!
                </h3>
                <p className="text-sm text-slate-600 font-light max-w-md mx-auto mt-2 leading-relaxed">
                  <strong>{currentVendor?.name}</strong> is now officially featured on the Party Vendors homepage under the <strong>{activePlan.name}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Plan:</span>
                  <span className="font-semibold text-slate-900">{activePlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Gateway:</span>
                  <span className="font-semibold text-slate-900">{activeGateway.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Featured Expiration:</span>
                  <span className="font-semibold text-emerald-700">
                    {new Date(Date.now() + activePlan.durationMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full max-w-md py-4 rounded-2xl bg-slate-900 text-white font-medium hover:bg-slate-800 shadow-md transition-all"
              >
                Return to Marketplace
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
