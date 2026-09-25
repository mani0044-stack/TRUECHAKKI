import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink, Check, Copy } from 'lucide-react';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/MV54%2BMW8+True+Chakki,+Airport+Rd,+Gumtala+Sub+Urban,+Defence+Colony,D-Block,+Ranjit+Avenue,+Amritsar,+Punjab+143001/@31.6591504,74.8572704,16z/data=!4m6!3m5!1s0x391965007fe6d2c7:0x531acda800df9099!8m2!3d31.6591504!4d74.8572704!16s%2Fg%2F11yqk7rvzz?g_ep=Eg1tbF8yMDI2MDkwOF8wIOC7DCoASAJQAg%3D%3D";

export const ContactPage: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
      showToast(`${label} copied to clipboard!`);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hello True Chakki! I would like to inquire about your products.");
    window.open(`https://wa.me/919877614747?text=${msg}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/_truechakki_/', '_blank');
  };

  const handleFacebook = () => {
    window.open('https://facebook.com/truechakki', '_blank');
  };

  const openGoogleMaps = () => {
    window.open(GOOGLE_MAPS_URL, '_blank');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#9A6B29] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-green-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9A6B29] bg-[#9A6B29]/10 px-3.5 py-1.5 rounded-full inline-block">
          CONNECT WITH US
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#4A2B18]">
          Get in Touch with True Chakki
        </h1>
        <p className="text-sm sm:text-base text-[#7C5C43] leading-relaxed max-w-2xl mx-auto">
          Connect directly with our team on social media or visit our store & milling unit in Amritsar.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Info Box & Store Details (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DCCB] space-y-8 shadow-xs">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#4A2B18] mb-2">Contact & Store Location</h2>
            <p className="text-xs text-[#7C5C43]">Our team is always happy to assist you with fresh stone-milled flours, oils, and organic produce.</p>
          </div>

          <div className="space-y-5 text-xs text-[#4A2B18]">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-[#9A6B29]/10 rounded-xl text-[#9A6B29] shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-2 w-full">
                <strong className="block font-semibold text-sm text-[#4A2B18]">True Chakki Store & Milling Unit</strong>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C5C43] hover:text-[#9A6B29] leading-relaxed block transition-colors group"
                >
                  MV54+MW8 True Chakki, Airport Rd, Gumtala Sub Urban, Defence Colony, D-Block, Ranjit Avenue, Amritsar, Punjab 143001
                </a>
                <button
                  onClick={openGoogleMaps}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9A6B29] hover:bg-[#80561F] text-white text-[11px] font-semibold rounded-lg transition-colors cursor-pointer shadow-xs mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>s

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-[#9A6B29]/10 rounded-xl text-[#9A6B29] shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 w-full">
                <strong className="block font-semibold text-sm text-[#4A2B18]">Customer Helpline</strong>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#7C5C43]">+91 98776 14747</span>
                  <button 
                    onClick={() => copyToClipboard('+919876543210', 'Phone number')}
                    className="p-1 hover:bg-[#9A6B29]/10 rounded text-[#9A6B29] transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-[#9A6B29]">Toll-Free: 1800-TRUE-CHAKKI</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-[#9A6B29]/10 rounded-xl text-[#9A6B29] shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 w-full">
                <strong className="block font-semibold text-sm text-[#4A2B18]">Email Support</strong>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#7C5C43]">truechakki@gmail.com</span>
                  <button 
                    onClick={() => copyToClipboard('truechakki@gmail.com', 'Email')}
                    className="p-1 hover:bg-[#9A6B29]/10 rounded text-[#9A6B29] transition-colors cursor-pointer"
                    title="Copy email"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-2 border-t border-[#E8DCCB]">
              <div className="p-2.5 bg-[#9A6B29]/10 rounded-xl text-[#9A6B29] shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <strong className="block font-semibold text-sm text-[#4A2B18]">Working Hours</strong>
                <span className="text-[#7C5C43] block">Monday – Saturday: 8:00 AM – 8:00 PM</span>
                <span className="text-[#7C5C43] block">Sunday: Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Handles Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DCCB] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Connect via Social Media</h2>
                <p className="text-xs text-[#7C5C43] mt-1">
                  Reach out directly on WhatsApp, Instagram, or Facebook for instant assistance and updates.
                </p>
              </div>
              <MessageSquare className="w-6 h-6 text-[#9A6B29] hidden sm:block shrink-0" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* WhatsApp Handle Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DCCB] hover:border-[#25D366] transition-all hover:shadow-md group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors">
                    <svg className="w-6 h-6 fill-[#25D366] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-[#4A2B18] text-base">WhatsApp Support</h3>
                      <span className="bg-[#25D366]/10 text-[#128C7E] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">Fastest</span>
                    </div>
                    <p className="text-xs font-semibold text-[#9A6B29] mt-0.5">+91 98765 43210</p>
                    <p className="text-xs text-[#7C5C43] mt-1">Instant chat for product inquiry & live assistance</p>
                  </div>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Instagram Handle Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DCCB] hover:border-[#E1306C] transition-all hover:shadow-md group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E1306C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E1306C] transition-colors">
                    <svg className="w-6 h-6 fill-[#E1306C] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-[#4A2B18] text-base">Instagram</h3>
                      <span className="bg-[#E1306C]/10 text-[#E1306C] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">Updates</span>
                    </div>
                    <p className="text-xs font-semibold text-[#9A6B29] mt-0.5">@truechakki</p>
                    <p className="text-xs text-[#7C5C43] mt-1">Farm stories, stone-milling videos & healthy tips</p>
                  </div>
                </div>

                <button
                  onClick={handleInstagram}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#E1306C] hover:bg-[#d0245f] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Follow on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Facebook Handle Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DCCB] hover:border-[#1877F2] transition-all hover:shadow-md group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1877F2] transition-colors">
                    <svg className="w-6 h-6 fill-[#1877F2] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-[#4A2B18] text-base">Facebook</h3>
                      <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">Community</span>
                    </div>
                    <p className="text-xs font-semibold text-[#9A6B29] mt-0.5">@truechakki</p>
                    <p className="text-xs text-[#7C5C43] mt-1">Community posts, reviews & customer feedback</p>
                  </div>
                </div>

                <button
                  onClick={handleFacebook}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#1877F2] hover:bg-[#1565d8] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Connect on Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
