import React, { useState, useEffect } from 'react'
import { Search, User, Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isAuthPage = location.pathname === '/signin'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Matches', href: '#matches' },
    { name: 'Series', href: '#series' },
    { name: 'Stats', href: '#stats' },
    { name: 'News', href: '#news' },
    { name: 'Community', href: '#community' },
  ]

  return (
    <header
      className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isAuthPage
          ? 'relative bg-transparent'
          : isScrolled
          ? 'fixed bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200'
          : 'fixed bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                Cric<span className="text-green-600">Stream</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Live</p>
            </div>
          </div>

          {/* Nav */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium relative group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          )}

          {/* Right Section */}
          {!isAuthPage && (
            <div className="flex items-center gap-4">

              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-green-600"
                >
                  <Search size={20} />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64">
                    <input
                      type="text"
                      placeholder="Search matches, teams..."
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}
              </div>

              {/* Sign In */}
              <button
                onClick={() => navigate('/signin')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm"
              >
                <User size={18} />
                <span className="text-sm font-medium">Sign In</span>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        {!isAuthPage && isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 bg-white rounded-b-xl shadow-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 px-2 text-gray-700 hover:text-green-600 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header