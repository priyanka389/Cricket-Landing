// import React from 'react'
// import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

// const Footer = () => {
//   const footerLinks = {
//     About: ['About Us', 'Our Story', 'Press', 'Contact'],
//     Terms: ['Terms of Service', 'Privacy Policy', 'Content Policy', 'Community Guidelines'],
//     Privacy: ['Data Protection', 'Security', 'Your Rights'],
//   }

//   const socialLinks = [
//     { icon: Facebook, href: '#', label: 'Facebook' },
//     { icon: Instagram, href: '#', label: 'Instagram' },
//     { icon: Twitter, href: '#', label: 'Twitter' },
//     { icon: Youtube, href: '#', label: 'YouTube' },
//   ]

//   return (
//     <footer className="bg-primary border-t border-border">
//       {/* Main Footer */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
//           {/* Brand Column */}
//           <div className="ml-10 lg:col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
//                 <span className="text-primary font-bold text-lg">C</span>
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-white">
//                   Cric<span className="text-accent">Stream</span>
//                 </h2>
//                 <p className="text-xs text-text-muted -mt-1">Live</p>
//               </div>
//             </div>
//             <p className="text-text-secondary text-sm mb-6 max-w-xs">
//               Your Premium Cricket Hub. Experience live matches, real-time scores, and exclusive cricket content from around the world.
//             </p>
            
//             {/* Social Links */}
//             <div className="flex items-center gap-3">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all"
//                   aria-label={social.label}
//                 >
//                   <social.icon size={18} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Links Columns */}
//           {Object.entries(footerLinks).map(([title, links]) => (
//             <div key={title}>
//               <h3 className="font-semibold text-white mb-4">{title}</h3>
//               <ul className="space-y-2">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <a
//                       href="#"
//                       className="text-sm text-text-muted hover:text-accent transition-colors"
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Contact Bar */}
//         <div className="mt-12 pt-8 border-t border-border">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex flex-wrap items-center gap-6">
//               <a href="mailto:support@cricstream.com" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors">
//                 <Mail size={16} />
//                 <span className="text-sm">support@cricstream.com</span>
//               </a>
//               <a href="tel:+1234567890" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors">
//                 <Phone size={16} />
//                 <span className="text-sm">+91 1234567890</span>
//               </a>
//               <div className="flex items-center gap-2 text-text-muted">
//                 <MapPin size={16} />
//                 <span className="text-sm">Bhopal, India</span>
//               </div>
//             </div>
            
//             {/* App Download Buttons */}
//             <div className="flex items-center gap-3">
//               <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-white hover:border-accent transition-colors flex items-center gap-2">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zm-5.85-15.1c.07-1.04.89-2.17 1.92-2.63.21 1.15-.29 2.28-1.03 3.05-.76.79-1.97 1.38-2.98 1.23.13-1.08.78-2.1 2.09-1.65z"/>
//                 </svg>
//                 App Store
//               </button>
//               <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-white hover:border-accent transition-colors flex items-center gap-2">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
//                 </svg>
//                 Play Store
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-secondary/50 border-t border-border">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <p className="text-sm text-text-muted">
//               © 2026 CricStream Live. All rights reserved.
//             </p>
//             <div className="flex items-center gap-6">
//               <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
//                 Terms
//               </a>
//               <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
//                 Privacy
//               </a>
//               <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
//                 Cookies
//               </a>
//               <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
//                 Sitemap
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer


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