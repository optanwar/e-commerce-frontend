import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4FC3F7] text-white py-12 px-6 md:px-20 z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">YummyGummies</h3>
          <p className="text-sm text-white/90">
            Delicious, healthy gummies made with love for your little ones. Trusted by parents and pediatricians nationwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#BA68C8] transition">Home</a></li>
            <li><a href="/products" className="hover:text-[#BA68C8] transition">Shop</a></li>
            <li><a href="/about" className="hover:text-[#BA68C8] transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#BA68C8] transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-[#BA68C8] transition">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-sm mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:support@yummygummies.com" className="underline hover:text-[#BA68C8]">support@yummygummies.com</a>
          </p>
          <p className="text-sm mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href="tel:+1234567890" className="underline hover:text-[#BA68C8]">+1 (234) 567-890</a>
          </p>
          <p className="text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            123 Gummy Lane, Sweet City, USA
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#BA68C8] transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#BA68C8] transition">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#BA68C8] transition">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-white/30 pt-6 text-center text-sm text-white/80 select-none">
        <p>© 2025 YummyGummies. All rights reserved.</p>
        <p>Made with <span className="text-[#BA68C8]">❤️</span> for happy, healthy kids.</p>
      </div>
    </footer>
  );
}
