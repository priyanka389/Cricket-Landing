import React from 'react'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    About: ['About Us', 'Our Story', 'Press', 'Contact'],
    Terms: ['Terms of Service', 'Privacy Policy', 'Content Policy', 'Community Guidelines'],
    Privacy: ['Data Protection', 'Security', 'Your Rights'],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

          {/* Brand Column */}
          <div className="ml-10 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 tracking-wide">
                  Cric<span className="text-green-600">Stream</span>
                </h2>
                <p className="text-xs text-gray-500 -mt-1">Live</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6 max-w-xs">
              Your Premium Cricket Hub. Experience live matches, real-time scores, and exclusive cricket content from around the world.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-600 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:support@cricstream.com" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
                <Mail size={16} />
                <span className="text-sm">support@cricstream.com</span>
              </a>

              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
                <Phone size={16} />
                <span className="text-sm">+91 1234567890</span>
              </a>

              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={16} />
                <span className="text-sm">Bhopal, India</span>
              </div>
            </div>

            {/* App Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-green-600 hover:text-green-600 transition-colors flex items-center gap-2">
                App Store
              </button>
              <button className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-green-600 hover:text-green-600 transition-colors flex items-center gap-2">
                Play Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © 2026 CricStream Live. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Cookies
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Sitemap
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer