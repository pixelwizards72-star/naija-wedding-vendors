import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Trash2, 
  Edit3, Eye, FileText, Search, PlusCircle, UserCheck, Lock, Unlock, ArrowLeft, RefreshCw 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function AdminPortal({
  vendors,
  onUpdateVendorStatus,
  onDeleteVendor,
  onAddVendor,
  onBackToMarketplace,
  onToggleFeatured
}) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for demo
  const [activeStatusTab, setActiveStatusTab] = useState('all'); // 'all', 'pending', 'approved', 'suspended'
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDocModal, setSelectedDocModal] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Passcode! Try using "admin123"');
    }
  };

  // Metrics Calculations
  const totalCount = vendors.length;
  const approvedCount = vendors.filter(v => (v.status || 'approved') === 'approved').length;
  const pendingCount = vendors.filter(v => v.status === 'pending').length;
  const suspendedCount = vendors.filter(v => v.status === 'suspended').length;
  const featuredCount = vendors.filter(v => v.featured).length;

  // Filtered list
  const filteredVendors = vendors.filter(v => {
    const currentStatus = v.status || 'approved';
    if (activeStatusTab !== 'all' && currentStatus !== activeStatusTab) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.categoryLabel.toLowerCase().includes(q) ||
        (v.cacNumber && v.cacNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-purple-50/40">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-purple-100 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-slate-900 font-serif">Party Vendors Admin Portal</h2>
            <p className="text-xs text-slate-500 mt-1">Enter passcode to manage & verify Nigerian vendors</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode (admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-violet-600 text-center"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-md transition-all"
            >
              Access Admin Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToMarketplace}
              className="p-1.5 rounded-lg bg-white border border-purple-100 text-violet-700 hover:bg-violet-50 transition-colors"
              title="Back to Public Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-light font-serif text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-7 h-7 text-violet-700 stroke-[1.5]" />
              <span>Party Vendors Admin Portal</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review vendor registrations, verify CAC registration numbers, and manage Featured Spotlight listings.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            ✓ Admin Session Active
          </span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Total Vendors</span>
          <span className="text-2xl font-black text-slate-900">{totalCount}</span>
        </div>
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
          <span className="text-xs text-emerald-700 font-semibold block">Approved Live</span>
          <span className="text-2xl font-black text-emerald-900">{approvedCount}</span>
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
          <span className="text-xs text-amber-700 font-semibold block">Pending Approval</span>
          <span className="text-2xl font-black text-amber-900">{pendingCount}</span>
        </div>
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
          <span className="text-xs text-rose-700 font-semibold block">Suspended</span>
          <span className="text-2xl font-black text-rose-900">{suspendedCount}</span>
        </div>
        <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100">
          <span className="text-xs text-violet-700 font-semibold block">Featured Spotlight</span>
          <span className="text-2xl font-black text-violet-950">★ {featuredCount}</span>
        </div>
      </div>

      {/* Main Vendor Management Table */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
        
        {/* Table Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
            {['all', 'approved', 'pending', 'suspended'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStatusTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  activeStatusTab === tab
                    ? 'bg-violet-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'all' ? 'All Statuses' : tab}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by vendor or CAC RC-number..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-violet-600"
            />
          </div>
        </div>

        {/* Vendors List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-purple-100 bg-purple-50/50 text-slate-600 uppercase font-extrabold text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Vendor Details</th>
                <th className="py-3.5 px-4">Category & Location</th>
                <th className="py-3.5 px-4">CAC Registration</th>
                <th className="py-3.5 px-4">Featured Status</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVendors.map((vendor) => {
                const currentStatus = vendor.status || 'approved';
                return (
                  <tr key={vendor.id} className="hover:bg-purple-50/30 transition-colors">
                    
                    {/* Details Column */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={vendor.coverImage}
                          alt={vendor.name}
                          className="w-12 h-12 rounded-xl object-cover border border-purple-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{vendor.name}</div>
                          <div className="text-[11px] text-slate-500">{vendor.whatsapp} · {vendor.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Location */}
                    <td className="py-4 px-4 font-semibold text-slate-700">
                      <div>{vendor.categoryLabel}</div>
                      <div className="text-[10px] text-violet-700">{vendor.locationLabel}</div>
                    </td>

                    {/* CAC Document & Verification */}
                    <td className="py-4 px-4">
                      {vendor.cacRegistered ? (
                        <div>
                          <span className="font-mono text-[11px] font-bold text-slate-800 block">
                            {vendor.cacNumber || 'RC-Verified'}
                          </span>
                          <button
                            onClick={() => setSelectedDocModal(vendor)}
                            className="text-[10px] text-violet-700 hover:underline font-bold flex items-center space-x-1 mt-0.5"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View CAC Document</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No CAC Document</span>
                      )}
                    </td>

                    {/* Featured Status Toggle */}
                    <td className="py-4 px-4">
                      {vendor.featured ? (
                        <button
                          onClick={() => onToggleFeatured && onToggleFeatured(vendor.id)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold shadow-xs hover:bg-amber-500 transition-all cursor-pointer"
                          title="Click to remove from Featured Homepage Spotlight"
                        >
                          <span>★ Featured</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onToggleFeatured && onToggleFeatured(vendor.id)}
                          className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-900 text-[10px] font-bold transition-all cursor-pointer"
                          title="Click to promote vendor to Featured Spotlight"
                        >
                          + Make Featured
                        </button>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {currentStatus === 'approved' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Approved (Live)</span>
                        </span>
                      )}
                      {currentStatus === 'pending' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Pending Review</span>
                        </span>
                      )}
                      {currentStatus === 'suspended' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Suspended</span>
                        </span>
                      )}
                    </td>

                    {/* Action Controls */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        
                        {/* Approve Button */}
                        {currentStatus !== 'approved' && (
                          <button
                            onClick={() => onUpdateVendorStatus(vendor.id, 'approved')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-all"
                            title="Approve & Publish to Public Site"
                          >
                            Approve
                          </button>
                        )}

                        {/* Set Pending Button */}
                        {currentStatus !== 'pending' && (
                          <button
                            onClick={() => onUpdateVendorStatus(vendor.id, 'pending')}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold transition-all"
                            title="Mark Pending Review"
                          >
                            Set Pending
                          </button>
                        )}

                        {/* Suspend Button */}
                        {currentStatus !== 'suspended' && (
                          <button
                            onClick={() => onUpdateVendorStatus(vendor.id, 'suspended')}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-all"
                            title="Suspend Vendor from Website"
                          >
                            Suspend
                          </button>
                        )}

                        {/* Permanent Delete Button */}
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to permanently kick out and delete ${vendor.name}?`)) {
                              onDeleteVendor(vendor.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          title="Permanently Delete Vendor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredVendors.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-xs">
              No vendors found matching this filter status.
            </div>
          )}
        </div>

      </div>

      {/* Document Proof Modal */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">CAC Document Verification Preview</h3>
              <button onClick={() => setSelectedDocModal(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800">{selectedDocModal.name}</div>
              <div className="text-slate-500">CAC Registration #: <span className="font-mono font-bold text-slate-900">{selectedDocModal.cacNumber}</span></div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <img
                src={selectedDocModal.cacDocumentUrl || selectedDocModal.coverImage}
                alt="CAC Certificate Proof"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                [ Verified CAC Document Scan ]
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  onUpdateVendorStatus(selectedDocModal.id, 'approved');
                  setSelectedDocModal(null);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
              >
                Approve CAC & List Vendor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
