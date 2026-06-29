import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Container from '../components/ui/Container';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = () => {
    const q = searchQuery.trim();
    if (q) navigate(`/shop?search=${encodeURIComponent(q)}`);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') submitSearch();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <Container>
          <nav className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-primary tracking-tight shrink-0">
              PaulsMart
            </Link>

            <div className="hidden md:block flex-1 max-w-md mx-auto">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search products, brands, and categories"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-l-2xl border-r-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <button onClick={submitSearch} className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-r-2xl hover:bg-blue-700 transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/shop" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                Shop
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary focus:outline-none transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Account</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full right-0 w-56 pt-2 hidden group-hover:block z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-4">
                    {user ? (
                      <>
                        <p className="px-5 pb-3 text-sm font-semibold text-dark truncate">Hi, {user.name}!</p>
                        <div className="space-y-1">
                          <Link to="/account" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-dark transition-colors">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Account
                          </Link>
                          <Link to="/orders" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-dark transition-colors">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Orders
                          </Link>
                          <Link to="/wishlist" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-dark transition-colors">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Wishlist
                          </Link>
                        </div>
                        <hr className="my-2 border-gray-100" />
                        <button onClick={() => logout()} className="flex items-center gap-3 w-full px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-red-500 transition-colors">
                          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="px-5 pb-3 text-sm text-gray-500">Hi there!</p>
                        <div className="px-5 pb-3">
                          <Link to="/login"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-2xl transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In
                          </Link>
                        </div>
                        <div className="space-y-1">
                          <Link to="/login" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-dark transition-colors">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Account
                          </Link>
                          <Link to="/login" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-dark transition-colors">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Orders
                          </Link>
                          <Link to="/login" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 focus:outline-none hover:text-dark transition-colors">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Wishlist
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary focus:outline-none transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Help</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full right-0 w-56 pt-2 hidden group-hover:block z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-3">
                    <div className="px-3 mb-2">
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white bg-orange-500 border border-orange-500 rounded-lg shadow hover:bg-orange-600 focus:outline-none cursor-pointer transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                        </svg>
                        Live Chat
                      </button>
                    </div>
                    <div className="px-3">
                      <a href="https://wa.me/2347031340974" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-green-600 bg-green-100 border border-green-400 rounded-lg shadow hover:bg-green-200 focus:outline-none cursor-pointer transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                    <hr className="my-2 mx-4 border-gray-100" />
                    <Link to="/help" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help Center
                    </Link>
                    <Link to="/shop" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Place an order
                    </Link>
                    <Link to="/payment-options" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment options
                    </Link>
                    <Link to="/track-order" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Track an order
                    </Link>
                    <Link to="/cancel-order" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel an order
                    </Link>
                    <Link to="/returns" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Returns & Refunds
                    </Link>
                    <Link to="/cookie-preferences" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-dark focus:outline-none transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Cookie Preferences
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/cart" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                <span className="relative">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </span>
                <span>Cart</span>
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </Container>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-primary">PaulsMart</span>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-0 mb-6">
                <div className="relative flex-1">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setMobileOpen(false); submitSearch(); } }}
                    placeholder="Search products, brands, and categories"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-l-2xl border-r-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <button onClick={() => { setMobileOpen(false); submitSearch(); }} className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-r-2xl hover:bg-blue-700 transition-colors shrink-0">
                  Search
                </button>
              </div>
              <nav className="space-y-4">
                <Link to="/shop" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-primary transition-colors">Shop</Link>
                {user ? (
                  <div className="space-y-1 border-b border-gray-100 pb-3 mb-3">
                    <p className="text-sm font-semibold text-dark px-1">Hi, {user.name}!</p>
                    <Link to="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Account
                    </Link>
                    <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Orders
                    </Link>
                    <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 border-b border-gray-100 pb-3 mb-3">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full px-4 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-2xl transition-colors justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </Link>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Account
                    </Link>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Orders
                    </Link>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </Link>
                  </div>
                )}
                <div className="border-b border-gray-100 pb-3 mb-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Help</p>
                  <Link to="/help" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help Center
                  </Link>
                  <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Place an order
                  </Link>
                  <Link to="/payment-options" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment options
                  </Link>
                  <Link to="/track-order" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Track an order
                  </Link>
                  <Link to="/cancel-order" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel an order
                  </Link>
                  <Link to="/returns" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Returns & Refunds
                  </Link>
                  <Link to="/cookie-preferences" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Cookie Preferences
                  </Link>
                </div>
                <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                  Cart
                  {totalItems > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">{totalItems}</span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-dark text-white py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">PaulsMart</h3>
              <p className="text-gray-400 text-sm">
                Premium electronics for the modern lifestyle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Shop</p>
                <p>About</p>
                <p>Contact</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>FAQ</p>
                <p>Shipping</p>
                <p>Returns</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PaulsMart. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
}
