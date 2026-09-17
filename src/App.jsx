import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import VendorGrid from './components/VendorGrid';
import VendorDetailModal from './components/VendorDetailModal';
import DigitalInvites from './components/DigitalInvites';
import BudgetCalculator from './components/BudgetCalculator';
import VerificationSection from './components/VerificationSection';
import VendorRegistrationModal from './components/VendorRegistrationModal';
import AuthModal from './components/AuthModal';
import AdminPortal from './components/AdminPortal';
import FeaturedUpgradeModal from './components/FeaturedUpgradeModal';
import VendorDashboard from './components/VendorDashboard';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import { INITIAL_VENDORS } from './data/vendors';

export default function App() {
  // Navigation tab state ('marketplace', 'invites', 'budget', 'verification', 'admin', 'vendor_dashboard')
  const [activeTab, setActiveTab] = useState('marketplace');

  // Vendor Data State
  const [vendorsList, setVendorsList] = useState(INITIAL_VENDORS);
  const [loggedInVendorId, setLoggedInVendorId] = useState('v-001'); // Default demo vendor

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Favorites state
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modals state
  const [selectedVendorModal, setSelectedVendorModal] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup');
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [featuredModalVendorId, setFeaturedModalVendorId] = useState(null);

  // Listen for admin portal footer trigger
  React.useEffect(() => {
    const handleOpenAdmin = () => setActiveTab('admin');
    window.addEventListener('open-admin-portal', handleOpenAdmin);
    return () => window.removeEventListener('open-admin-portal', handleOpenAdmin);
  }, []);

  // Filter Reset Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedPriceTier('all');
    setVerifiedOnly(false);
    setShowFavoritesOnly(false);
  };

  // Toggle Favorite
  const handleToggleFavorite = (vendorId) => {
    if (favorites.includes(vendorId)) {
      setFavorites(favorites.filter(id => id !== vendorId));
    } else {
      setFavorites([...favorites, vendorId]);
    }
  };

  // Add newly registered vendor (starts in 'pending' status)
  const handleAddVendor = (newVendor) => {
    setVendorsList([newVendor, ...vendorsList]);
  };

  // Admin vendor status change handler ('approved', 'pending', 'suspended')
  const handleUpdateVendorStatus = (vendorId, newStatus) => {
    setVendorsList(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          status: newStatus,
          verified: newStatus === 'approved' ? true : v.verified
        };
      }
      return v;
    }));
  };

  // Admin delete vendor handler
  const handleDeleteVendor = (vendorId) => {
    setVendorsList(prev => prev.filter(v => v.id !== vendorId));
  };

  // Featured Vendor Activation Handler (from payment checkout modal)
  const handleActivateFeatured = ({ vendorId, plan, gateway, expiryDate }) => {
    setVendorsList(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          featured: true,
          featuredPlan: plan.name,
          featuredUntil: expiryDate,
          featuredPaymentMethod: gateway
        };
      }
      return v;
    }));
  };

  // Toggle Featured status manually in Admin Portal
  const handleToggleFeatured = (vendorId) => {
    setVendorsList(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          featured: !v.featured
        };
      }
      return v;
    }));
  };

  // Public Marketplace Filtered Vendors (Strictly ONLY 'approved' status vendors!)
  const publicApprovedVendors = useMemo(() => {
    let result = vendorsList.filter(v => (v.status || 'approved') === 'approved');

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(q) ||
        v.categoryLabel.toLowerCase().includes(q) ||
        v.locationLabel.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        (v.tags && v.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(v => v.category === selectedCategory);
    }

    // Location Filter
    if (selectedLocation !== 'all') {
      result = result.filter(v => v.locationId === selectedLocation);
    }

    // Price Tier Filter
    if (selectedPriceTier !== 'all') {
      result = result.filter(v => v.priceTier === selectedPriceTier);
    }

    // Verified Checkbox Filter
    if (verifiedOnly) {
      result = result.filter(v => v.verified === true);
    }

    // Favorites Only Filter
    if (showFavoritesOnly) {
      result = result.filter(v => favorites.includes(v.id));
    }

    // Sorting Logic
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else {
      // Recommended: Featured first, then rating
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [vendorsList, searchQuery, selectedCategory, selectedLocation, selectedPriceTier, verifiedOnly, showFavoritesOnly, sortBy, favorites]);

  // Vendor Profile Update Handler from Vendor Dashboard
  const handleUpdateVendorProfile = (vendorId, updatedFields) => {
    setVendorsList(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          ...updatedFields
        };
      }
      return v;
    }));
  };

  const currentVendor = vendorsList.find(v => v.id === loggedInVendorId) || vendorsList[0];

  return (
    <div className="min-h-screen flex flex-col bg-purple-50/40 text-slate-800">
      
      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        onOpenVendorRegister={() => setIsRegisterModalOpen(true)}
        onOpenFavorites={() => {
          setActiveTab('marketplace');
          setShowFavoritesOnly(!showFavoritesOnly);
        }}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onOpenFeaturedModal={() => setIsFeaturedModalOpen(true)}
        onOpenVendorDashboard={() => setActiveTab('vendor_dashboard')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <>
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedPriceTier={selectedPriceTier}
              setSelectedPriceTier={setSelectedPriceTier}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              onResetFilters={handleResetFilters}
            />

            <VendorGrid
              vendors={publicApprovedVendors}
              allVendors={vendorsList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectVendor={(v) => setSelectedVendorModal(v)}
              onQuoteClick={(v) => setSelectedVendorModal(v)}
              onResetFilters={handleResetFilters}
              onOpenFeaturedModal={() => setIsFeaturedModalOpen(true)}
            />

            <VerificationSection />
            <Testimonials />
          </>
        )}

        {/* Digital Invites Tab */}
        {activeTab === 'invites' && (
          <DigitalInvites />
        )}

        {/* Budget Planner Tab */}
        {activeTab === 'budget' && (
          <BudgetCalculator />
        )}

        {/* Trust & Safety Verification Tab */}
        {activeTab === 'verification' && (
          <VerificationSection />
        )}

        {/* Vendor Self-Service Dashboard Tab */}
        {activeTab === 'vendor_dashboard' && (
          <VendorDashboard
            vendor={currentVendor}
            onUpdateVendorProfile={handleUpdateVendorProfile}
            onOpenFeaturedModal={() => setIsFeaturedModalOpen(true)}
            onSignOut={() => setActiveTab('marketplace')}
            onBackToMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {/* Admin Portal Tab */}
        {activeTab === 'admin' && (
          <AdminPortal
            vendors={vendorsList}
            onUpdateVendorStatus={handleUpdateVendorStatus}
            onDeleteVendor={handleDeleteVendor}
            onAddVendor={handleAddVendor}
            onBackToMarketplace={() => setActiveTab('marketplace')}
            onToggleFeatured={handleToggleFeatured}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onOpenVendorRegister={() => setIsRegisterModalOpen(true)} />

      {/* Modals */}
      {selectedVendorModal && (
        <VendorDetailModal
          vendor={selectedVendorModal}
          onClose={() => setSelectedVendorModal(null)}
          isFavorite={favorites.includes(selectedVendorModal.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {isRegisterModalOpen && (
        <VendorRegistrationModal
          onClose={() => setIsRegisterModalOpen(false)}
          onAddVendor={handleAddVendor}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <FeaturedUpgradeModal
        isOpen={isFeaturedModalOpen}
        onClose={() => setIsFeaturedModalOpen(false)}
        vendors={vendorsList.filter(v => (v.status || 'approved') === 'approved')}
        selectedVendorId={featuredModalVendorId}
        onActivateFeatured={handleActivateFeatured}
      />

    </div>
  );
}
