import React from 'react'
import { Facebook, Instagram, Youtube, MessageCircle, Link as LinkIcon } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#001f54] text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT SECTION */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Generals' Arena</h3>
            <p className="mt-3 max-w-xs leading-relaxed text-sm md:text-base">
              A generational, life-transforming ministry. Join us at our venues for
              worship, teaching and fellowship.
            </p>

            <div className="mt-4 text-sm md:text-base space-y-1">
              <div>
                <strong>Main Venue:</strong>
                <div>Generals' Arena Nairobi</div>
              </div>
              <div>
                <strong>Branch Venue:</strong>
                <div>Rongo Campus</div>
              </div>
              <div className="mt-2">
                <strong>Event Days:</strong>
                <div>Friday — 4:30PM</div>
                <div>Saturday-6:00PM</div>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="mt-4 flex flex-col gap-2 text-sm md:text-base">
              <a className="hover:text-[#FFD700] cursor-pointer">About Us</a>
              <a className="hover:text-[#FFD700] cursor-pointer">Contact Us</a>
              <a className="hover:text-[#FFD700] cursor-pointer">Privacy Policy</a>
            </nav>
          </div>

          {/* RIGHT SECTION */}
          <div>
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <p className="mt-1 text-sm md:text-base leading-relaxed max-w-sm">
              Follow us on our social platforms for updates, livestreams and events.
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm md:text-base">
              <a className="flex items-center cursor-pointer gap-2 hover:text-[#FFD700]"><Facebook size={18} /> Facebook</a>
              <a className="flex items-center gap-2 cursor-pointer hover:text-[#FFD700]"><MessageCircle size={18} /> WhatsApp</a>
              <a className="flex items-center gap-2 cursor-pointer hover:text-[#FFD700]"><Youtube size={18} /> YouTube</a>
              <a className="flex items-center gap-2 cursor-pointer hover:text-[#FFD700]"><LinkIcon size={18} /> TikTok</a>
              <a className="flex items-center gap-2 cursor-pointer hover:text-[#FFD700]"><Instagram size={18} /> Instagram</a>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full bg-[#001a45] text-gray-300 text-sm py-3 text-center">
        © {year} Generals' Arena. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer;

