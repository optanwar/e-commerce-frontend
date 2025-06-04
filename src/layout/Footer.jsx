import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Candy,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-trust text-white py-14 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Candy size={26} className="text-white" />
            <h3 className="text-2xl font-heading font-bold">YummyGummies</h3>
          </div>
          <p className="text-sm leading-relaxed text-white/90 font-body">
            Nutritious & delicious gummies crafted for happy kids and happier parents. Pediatrician-approved and loved by families.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-body">Quick Links</h4>
          <ul className="space-y-2 text-sm font-body">
            <li><Link to="/products" className="hover:text-accent transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-accent transition">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-accent transition">FAQ</Link></li>
            <li><Link to="/contact-us" className="hover:text-accent transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-body">Get in Touch</h4>
          <div className="space-y-2 text-sm text-white/90 font-body">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:support@yummygummies.com" className="underline hover:text-accent">support@yummygummies.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+1234567890" className="underline hover:text-accent">+1 (234) 567-890</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>123 Gummy Lane, Sweet City, USA</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-body">Follow Us</h4>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent transition" aria-label="Facebook">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-accent transition" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-accent transition" aria-label="Twitter">
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/80 font-body">
        <p>© {new Date().getFullYear()} YummyGummies. All rights reserved.</p>
        <p>
          Made with <span className="text-accent">❤️</span> for happy, healthy kids.
        </p>
      </div>
    </footer>
  );
}
