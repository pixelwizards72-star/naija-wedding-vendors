import React, { useState } from 'react';
import { X, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signup' }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialMode); // 'signup' or 'signin'
  const [accountType, setAccountType] = useState('planner'); // 'planner' or 'vendor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      alert(
        mode === 'signup'
          ? `Welcome to OwambeHub! Account created for ${email} as a ${accountType === 'vendor' ? 'Vendor' : 'Planner/Couple'}.`
          : `Signed in successfully as ${email}!`
      );
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Outer Card Container */}
      <div className="relative w-full max-w-4xl bg-emerald-100/60 p-3 sm:p-6 rounded-[2.5rem] shadow-2xl my-auto border border-emerald-200/60">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/80 text-slate-600 hover:bg-white hover:text-slate-950 transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Card with Split Layout */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          
          {/* Left Decorative 3D Visual Column */}
          <div className="md:col-span-5 relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-950 p-8 text-white flex flex-col justify-between overflow-hidden">
            
            {/* Background 3D Floating Circles & Spheres */}
            <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-emerald-400/20 blur-xl pointer-events-none" />
            <div className="absolute top-1/4 -right-16 w-56 h-56 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 left-10 w-48 h-48 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />

            {/* 3D Sphere Accents */}
            <div className="absolute top-6 right-8 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-200 shadow-lg opacity-90 animate-bounce" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-16 right-6 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-md opacity-80" />
            
            {/* Glassmorphic Overlay Box */}
            <div className="relative z-10 bg-slate-950/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 my-auto shadow-2xl">
              
              {/* Brand Pill */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>OWAMBEHUB NETWORK</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif leading-tight text-white mb-3">
                {mode === 'signup' ? 'We are Invite only right now.' : 'Welcome back to OwambeHub.'}
              </h2>

              <p className="text-xs text-emerald-100 font-light leading-relaxed mb-6">
                10,000+ planners & CAC verified Nigerian vendors have joined our network. We invite you to join the tribe.
              </p>

              {/* Bottom Toggle Prompt */}
              <div className="pt-4 border-t border-white/10 text-xs">
                <span className="text-slate-300">
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account yet?"}
                </span>
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                  className="block mt-1 font-bold text-amber-300 hover:text-white underline transition-colors"
                >
                  {mode === 'signup' ? 'Sign in' : 'Sign up for free'}
                </button>
              </div>

            </div>

            {/* Footer Tag */}
            <div className="relative z-10 text-[10px] text-emerald-300 font-medium tracking-wider uppercase">
              Nigeria's #1 Event Platform
            </div>

          </div>

          {/* Right Clean Form Column */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            
            <div className="max-w-sm mx-auto w-full space-y-6">
              
              {/* Form Title */}
              <div>
                <h1 className="text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
                  {mode === 'signup' ? 'Sign up' : 'Sign in'}
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {mode === 'signup'
                    ? 'Create your free OwambeHub account today.'
                    : 'Enter your details to access your account.'}
                </p>
              </div>

              {/* User / Vendor Segment Switcher (Sign Up Mode) */}
              {mode === 'signup' && (
                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAccountType('planner')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      accountType === 'planner'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    I'm a Planner / Couple
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('vendor')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      accountType === 'vendor'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    I'm an Event Vendor
                  </button>
                </div>
              )}

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {mode === 'signup' ? 'Set password' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Show Password / Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Show password</span>
                  </label>

                  {mode === 'signin' && (
                    <a href="#" className="text-emerald-700 hover:underline font-semibold">
                      Forgot password?
                    </a>
                  )}
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <span>{submitted ? 'Processing...' : mode === 'signup' ? 'Sign up' : 'Sign in'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  or
                </span>
              </div>

              {/* Google Social Sign In Button */}
              <button
                type="button"
                onClick={() => alert('Google Sign-In integration ready!')}
                className="w-full py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center space-x-3 transition-all shadow-xs"
              >
                {/* Google SVG Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
