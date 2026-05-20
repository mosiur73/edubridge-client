import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">EduBridge</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting learners with expert tutors. Learn anything, anytime, anywhere with personalized one-on-one sessions.
            </p>
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>support@edubridge.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* For Students */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base">For Students</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tutors" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Browse Tutors
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="text-gray-400 hover:text-blue-400 transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reviews" className="text-gray-400 hover:text-blue-400 transition-colors">
                  My Reviews
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Sign Up Free
                </Link>
              </li>
            </ul>
          </div>

          {/* For Tutors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base">For Tutors</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/register" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link href="/tutor-dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tutor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/tutor-dashboard/profile" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tutor Profile
                </Link>
              </li>
              <li>
                <Link href="/tutor-dashboard/availability" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Set Availability
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/tutors" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} EduBridge. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}