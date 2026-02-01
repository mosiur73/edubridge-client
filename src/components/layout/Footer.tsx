import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="font-bold text-lg text-foreground">SkillBridge</span>
            </Link>
            <p className="text-sm text-foreground/60">
              Connecting learners with expert tutors. Learn anything, anytime, anywhere.
            </p>
          </div>

          {/* For Students */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Browse Tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Tutors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">For Tutors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Tutor Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Earnings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} SkillBridge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <span className="text-lg">𝕏</span>
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <span className="sr-only">LinkedIn</span>
              <span className="text-lg">in</span>
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <span className="sr-only">Facebook</span>
              <span className="text-lg">f</span>
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <span className="sr-only">Instagram</span>
              <span className="text-lg">📷</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
