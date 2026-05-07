import React from "react";
import { 
  FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt, 
  FaLock, FaClock, FaCreditCard, FaGlobe, FaQuestionCircle,
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram
} from "react-icons/fa";
import { SiSecurityscorecard } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl">
                <FaBuilding className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">EliteBank</h2>
                <p className="text-xs text-blue-300">Since 2024</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Redefining banking experience with cutting-edge technology, 
              absolute security, and customer-first approach. Your trusted 
              financial partner for life.
            </p>
            <div className="flex space-x-3 pt-2">
              <SocialIcon icon={<FaFacebook />} href="#" />
              <SocialIcon icon={<FaTwitter />} href="#" />
              <SocialIcon icon={<FaLinkedin />} href="#" />
              <SocialIcon icon={<FaInstagram />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaGlobe className="mr-2" size={18} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Services</FooterLink>
              <FooterLink href="#">Loan Products</FooterLink>
              <FooterLink href="#">Credit Cards</FooterLink>
              <FooterLink href="#">Investment Plans</FooterLink>
              <FooterLink href="#">Insurance</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaQuestionCircle className="mr-2" size={18} />
              Support & Help
            </h3>
            <ul className="space-y-3">
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Customer Support</FooterLink>
              <FooterLink href="#">Branch Locator</FooterLink>
              <FooterLink href="#">ATM Locations</FooterLink>
              <FooterLink href="#">Report Fraud</FooterLink>
              <FooterLink href="#">Complaints</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2" size={18} />
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  123 Banking Avenue, Financial District,<br />
                  Dhaka - 1212, Bangladesh
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone size={18} className="text-blue-400" />
                <p className="text-gray-300 text-sm">+880 1234-567890</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope size={18} className="text-blue-400" />
                <p className="text-gray-300 text-sm">support@elitebank.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock size={18} className="text-blue-400" />
                <p className="text-gray-300 text-sm">
                  24/7 Customer Support<br />
                  Banking Hours: 9 AM - 5 PM (Mon-Fri)
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
              title="100% Secure"
              description="256-bit encryption"
            />
            <TrustBadge 
              icon={<FaLock />}
              title="FDIC Insured"
              description="Up to $250,000"
            />
            <TrustBadge 
              icon={<FaCreditCard />}
              title="Zero Fraud Liability"
              description="24/7 monitoring"
            />
            <TrustBadge 
              icon={<FaClock />}
              title="Instant Support"
              description="24/7 assistance"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} EliteBank. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Sitemap</a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            EliteBank is a registered trademark. Banking services subject to approval.
            This is a demo application for educational purposes.
          </p>
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
      className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
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
    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition">
      <div className="text-blue-400">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
}