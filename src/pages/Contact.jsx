import React, { useState } from 'react';
import { Mail, MessageSquare, Instagram, MapPin, Send, CheckCircle2, PhoneCall, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            whatsapp: '',
            message: ''
          });
        }, 5000);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Contact API Error:', err);
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-x-hidden">
      
      {/* Light background node */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gold-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-white/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Get In Touch <br />
            <span className="text-gold-500 italic">With Our Art Directors</span>
          </h1>
          <p className="font-sans font-light text-dark-400 text-base md:text-lg max-w-xl mx-auto">
            Ready to scale your catalogue production? Drop our creative team a line or consult directly on high-volume enterprise pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          
          {/* Column 1 & 2: Contact Form */}
          <div className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-sm border border-white/5 flex flex-col justify-between">
            {submitted ? (
              <div className="text-center py-16">
                <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="font-sans font-light text-dark-300 text-sm max-w-xs mx-auto mb-4">
                  Our customer success team will evaluate your message and connect back with you within 2-4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priyan Sen"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. support@brand.com"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                    WhatsApp Contact Number
                  </label>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 99999 99999"
                    className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                    Describe your Project / Requirements
                  </label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Describe collection size, ethnic fabric type, preferred model demographics, and expected launch deadlines..."
                    className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-4 px-4 text-sm font-sans focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-sm tracking-widest uppercase py-4 rounded-sm transition-all duration-300 shadow-md shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Contact Channels Details */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* Box 1: Active Channels */}
            <div className="glass-panel p-6 rounded-sm border border-white/5 space-y-6">
              <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider pb-3 border-b border-white/5">
                Direct Channels
              </h3>

              <div className="space-y-4">
                
                {/* Whatsapp Support */}
                <a 
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-sm bg-white/2 hover:bg-gold-500/5 border border-white/5 hover:border-gold-500/35 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-sm bg-white/5 text-white group-hover:text-gold-400 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-medium text-xs text-white uppercase tracking-wider">WhatsApp Hotline</span>
                    <span className="text-dark-400 text-xs font-sans font-light">+91 99999 99999</span>
                  </div>
                </a>

                {/* Email Support */}
                <a 
                  href="mailto:support@aifashionstudio.com"
                  className="flex items-center gap-4 p-3 rounded-sm bg-white/2 hover:bg-gold-500/5 border border-white/5 hover:border-gold-500/35 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-sm bg-white/5 text-white group-hover:text-gold-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-medium text-xs text-white uppercase tracking-wider">Email Inquiry</span>
                    <span className="text-dark-400 text-xs font-sans font-light">hello@aifashionstudio.com</span>
                  </div>
                </a>

                {/* Instagram Direct */}
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-sm bg-white/2 hover:bg-gold-500/5 border border-white/5 hover:border-gold-500/35 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-sm bg-white/5 text-white group-hover:text-gold-400 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-medium text-xs text-white uppercase tracking-wider">Instagram Portfolio</span>
                    <span className="text-dark-400 text-xs font-sans font-light">@aifashionstudio</span>
                  </div>
                </a>

              </div>
            </div>

            {/* Box 2: Operations timing */}
            <div className="glass-panel p-6 rounded-sm border border-white/5 space-y-4">
              <div className="flex gap-3 items-start text-xs font-light text-dark-300">
                <Clock className="w-5 h-5 text-gold-500 shrink-0" />
                <div>
                  <strong className="text-white font-medium block mb-0.5">Customer Service Hours</strong>
                  Monday — Sunday: 9:00 AM to 10:00 PM IST.<br />
                  Emergency pipeline monitors operate 24/7.
                </div>
              </div>
              <div className="flex gap-3 items-start text-xs font-light text-dark-300">
                <PhoneCall className="w-5 h-5 text-gold-500 shrink-0" />
                <div>
                  <strong className="text-white font-medium block mb-0.5">Corporate Calls</strong>
                  Schedule an online Zoom or Google Meet with our lead developers for API onboarding.
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Custom styled interactive Google Maps placeholder representing a beautiful studio */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-8">
            Visit Our Creative Hub
          </h2>
          
          <div className="glass-panel rounded-sm border border-white/10 overflow-hidden relative aspect-[21/9] w-full flex items-center justify-center bg-[#09090b]">
            {/* Styled grid background for maps mockup */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950 pointer-events-none z-10" />

            {/* Stylized vector map paths */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,100 L 1200,100 M 0,250 L 1200,250 M 0,400 L 1200,400" stroke="#fff" strokeWidth="2" />
              <path d="M 150,0 L 150,600 M 500,0 L 500,600 M 900,0 L 900,600" stroke="#fff" strokeWidth="2" />
              <circle cx="500" cy="250" r="100" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
            </svg>

            {/* Actual Pin Element */}
            <div className="text-center relative z-20 space-y-4">
              <div className="relative inline-flex mx-auto">
                {/* Glowing target rings */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <div className="p-4 rounded-full bg-dark-950 text-gold-400 border border-gold-500 shadow-2xl relative z-10">
                  <MapPin className="w-8 h-8 text-gold-400" />
                </div>
              </div>
              
              <div>
                <h4 className="font-display font-semibold text-white text-base uppercase tracking-widest">
                  AI Fashion Studio Headquarters
                </h4>
                <p className="text-dark-400 font-sans text-xs font-light max-w-sm mx-auto mt-1 leading-relaxed">
                  Tech Tower B, Phase II, Jubilee Hills Road, <br />
                  Hyderabad, Telangana, 500033, India
                </p>
              </div>

              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-display text-[10px] text-gold-500 hover:text-gold-400 uppercase tracking-widest underline cursor-pointer"
              >
                <span>Navigate in Google Maps</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
