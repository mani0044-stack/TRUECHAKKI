import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9A6B29]">
          WE ARE HERE TO HELP
        </span>
        <h1 className="font-serif text-4xl font-bold text-[#4A2B18]">
          Get in Touch with True Chakki
        </h1>
        <p className="text-sm text-[#7C5C43]">
          Have questions about our stone-milled products, bulk orders, or farm visits? Drop us a message.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Info Box (5 Cols) */}
        <div className="md:col-span-5 bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DCCB] space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Contact Details</h2>
          <div className="space-y-4 text-xs text-[#4A2B18]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#9A6B29] shrink-0" />
              <div>
                <strong className="block font-semibold">Milling Unit & Farm Office:</strong>
                <span className="text-[#7C5C43]">Farm Estate, NH-8, Gurugram, Haryana - 122001</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#9A6B29] shrink-0" />
              <div>
                <strong className="block font-semibold">Customer Helpline:</strong>
                <span className="text-[#7C5C43]">+91 98765 43210 (Toll-Free: 1800-TRUE-CHAKKI)</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#9A6B29] shrink-0" />
              <div>
                <strong className="block font-semibold">Email Support:</strong>
                <span className="text-[#7C5C43]">care@truechakki.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="md:col-span-7 bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DCCB]">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#4A2B18]">Message Sent!</h3>
              <p className="text-xs text-[#7C5C43]">Thank you for contacting True Chakki. Our customer care team will reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#4A2B18] mb-1">Your Name</label>
                <input type="text" required placeholder="Aarav Sharma" className="w-full p-3 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]" />
              </div>
              <div>
                <label className="block font-semibold text-[#4A2B18] mb-1">Email Address</label>
                <input type="email" required placeholder="aarav@example.com" className="w-full p-3 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]" />
              </div>
              <div>
                <label className="block font-semibold text-[#4A2B18] mb-1">Message</label>
                <textarea rows={4} required placeholder="How can we help you today?" className="w-full p-3 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2">
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
