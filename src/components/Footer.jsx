// src/components/Footer.jsx
import React from "react";
import { 
  FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt, 
  FaLock, FaClock, FaBrain, FaGlobe, FaQuestionCircle,
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram,
  FaHandsHelping, FaNewspaper, FaUserMd, FaLeaf,
  FaYoutube, FaSpotify
} from "react-icons/fa";
import { SiSecurityscorecard } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl">
                <FaBrain className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  wellness<span className="text-blue-400">Portal</span>
                </h2>
                <p className="text-xs text-blue-300">Supporting Mental Health Since 2024</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with accessible mental health support, 
              daily wellness tracking, and resources for a healthier mind. 
              Your well-being is our priority.
            </p>
            <div className="flex space-x-3 pt-2">
              <SocialIcon icon={<FaFacebook />} href="#" />
              <SocialIcon icon={<FaTwitter />} href="#" />
              <SocialIcon icon={<FaLinkedin />} href="#" />
              <SocialIcon icon={<FaInstagram />} href="#" />
              <SocialIcon icon={<FaYoutube />} href="#" />
              <SocialIcon icon={<FaSpotify />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaGlobe className="mr-2" size={18} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/submit-check">Daily Check-in</FooterLink>
              <FooterLink href="/records">View Records</FooterLink>
              <FooterLink href="/profile">My Profile</FooterLink>
              <FooterLink href="/resources">Wellness Resources</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaQuestionCircle className="mr-2" size={18} />
              Support & Resources
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/counseling">Counseling Services</FooterLink>
              <FooterLink href="/crisis-support">Crisis Support</FooterLink>
              <FooterLink href="/self-help">Self-Help Tools</FooterLink>
              <FooterLink href="/community">Community Forum</FooterLink>
              <FooterLink href="/contact">Contact Support</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2" size={18} />
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  University Wellness Center<br />
                  Student Services Building, Floor 3<br />
                  Dhaka, Bangladesh
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone size={18} className="text-blue-400" />
                <p className="text-gray-300 text-sm">+880 1234-567890</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope size={18} className="text-blue-400" />
                <p className="text-gray-300 text-sm">wellness@university.edu</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock size={18} className="text-blue-400" />
                <p className="text-gray-300 text-sm">
                  24/7 Crisis Support Available<br />
                  Counseling Hours: 9 AM - 6 PM (Mon-Fri)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrustBadge 
              icon={<FaShieldAlt />}
              title="100% Confidential"
              description="Your privacy matters"
            />
            <TrustBadge 
              icon={<FaLock />}
              title="Secure Storage"
              description="Encrypted data"
            />
            <TrustBadge 
              icon={<FaHandsHelping />}
              title="Professional Support"
              description="Licensed counselors"
            />
            <TrustBadge 
              icon={<FaLeaf />}
              title="Holistic Wellness"
              description="Mind & body health"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center">
              <FaHeart className="text-pink-400 mr-2 animate-pulse" />
              © {currentYear} wellnessPortal. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-blue-400 text-sm transition">
                Cookie Policy
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-blue-400 text-sm transition">
                Accessibility
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            This is a student mental health tracking system for educational purposes.
            If you're in crisis, please contact your local crisis support hotline.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse"></span>
              24/7 Crisis Support Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Social Icon Component
function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href}
      className="p-2 bg-gray-700/50 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Social media link"
    >
      {icon}
    </a>
  );
}

// Reusable Footer Link
function FooterLink({ href, children }) {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-300 hover:text-blue-400 text-sm transition duration-200 flex items-center group"
      >
        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
        {children}
      </a>
    </li>
  );
}

// Trust Badge Component
function TrustBadge({ icon, title, description }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition border border-gray-600/30">
      <div className="text-blue-400 text-lg">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm text-white">{title}</p>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
}