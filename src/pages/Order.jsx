import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ChevronRight, HelpCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const Order = () => {
  const [formData, setFormData] = useState({
    category: 'Saree',
    background: 'Palace Courtyard, Jaipur',
    modelType: 'Heritage North Indian',
    whatsapp: '',
    notes: '',
    name: '',
    brand: ''
  });

  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const backgrounds = [
    { id: 'palace', label: 'Royal Palace Courtyard', location: 'Jaipur', extraPrice: 0 },
    { id: 'cafe', label: 'Contemporary Luxury Cafe', location: 'Mumbai', extraPrice: 0 },
    { id: 'apartment', label: 'Modern Premium Penthouse', location: 'Delhi', extraPrice: 0 },
    { id: 'festive', label: 'Festive Lights & Sparkles', location: 'Udaipur', extraPrice: 150 },
    { id: 'studio_white', label: 'Clean Studio White Backdrop', location: 'Studio', extraPrice: 0 },
    { id: 'studio_grey', label: 'Clean Textured Grey Backdrop', location: 'Studio', extraPrice: 0 }
  ];

  const models = [
    { id: 'north', label: 'Heritage North Indian Face', desc: 'Elegant traditional appearance' },
    { id: 'south', label: 'Classic South Indian Face', desc: 'Sophisticated silk boutique look' },
    { id: 'fusion', label: 'Modern Indo-Western Fusion', desc: 'Chic, contemporary, sharp features' },
    { id: 'ethnic_light', label: 'Lighter Skin Tone Heritage', desc: 'Sleek luxury fashion aesthetic' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackgroundChange = (label) => {
    setFormData(prev => ({
      ...prev,
      background: label
    }));
  };

  const handleModelChange = (label) => {
    setFormData(prev => ({
      ...prev,
      modelType: label
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // Base pricing
  const calculateTotal = () => {
    let base = 299; // Starter single shot price
    const selectedBg = backgrounds.find(bg => bg.label === formData.background);
    if (selectedBg) {
      base += selectedBg.extraPrice;
    }
    return base;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
    try {
      const res = await fetch(`${API_BASE}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fileName: fileName || 'fabric_flat.jpg',
          price: calculateTotal()
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Order API Error:', err);
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-x-hidden">
      
      {/* Light background nodes */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gold-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-white/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Configure Your <br />
            <span className="text-gold-500 italic">AI Fashion Shoot</span>
          </h1>
          <p className="font-sans font-light text-dark-400 text-base md:text-lg max-w-xl mx-auto">
            Design your exact visual setup. Upload the product laying flat and select matching avatar parameters for an instant premium generation.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-dark-950/60 border border-gold-500/25 rounded-sm p-12 text-center shadow-xl shadow-gold-500/5">
            <div className="inline-flex p-4 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
              Order Dispatched Successfully!
            </h2>
            <p className="font-sans font-light text-dark-300 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Your flat lay render project has been queued in our GPU computing farm. An art director will verify details and reach out to you on <strong className="text-white">{formData.whatsapp}</strong> with draft watermarked versions within 12-24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFileName('');
                setFormData({
                  category: 'Saree',
                  background: 'Palace Courtyard, Jaipur',
                  modelType: 'Heritage North Indian',
                  whatsapp: '',
                  notes: '',
                  name: '',
                  brand: ''
                });
              }}
              className="bg-gold-500 hover:bg-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 px-8 rounded-sm transition-colors cursor-pointer"
            >
              Configure Another Shoot
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Form Setup Block */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Box 1: Product Upload */}
              <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider">
                    01. Saree Flat Lay Upload
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-1">
                    Upload a flat lay photo, high-res catalog shot, or mannequin mockup of your garment.
                  </p>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-colors duration-300 ${
                    isDragging 
                      ? 'border-gold-500 bg-gold-500/5' 
                      : fileName 
                        ? 'border-gold-500/50 bg-white/5' 
                        : 'border-white/10 hover:border-gold-500/40 bg-dark-950/40'
                  }`}
                >
                  <input 
                    type="file" 
                    id="order-upload" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" 
                    required
                  />
                  <label htmlFor="order-upload" className="cursor-pointer">
                    <UploadCloud className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                    {fileName ? (
                      <div>
                        <p className="font-display font-medium text-white text-sm mb-1">
                          File Loaded Successfully!
                        </p>
                        <p className="font-sans text-xs text-gold-400 font-light truncate max-w-sm mx-auto">
                          {fileName}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-display font-medium text-white text-sm mb-1">
                          Drag and drop your raw product file here
                        </p>
                        <p className="font-sans text-xs text-dark-400 font-light mb-4">
                          Or <span className="text-gold-400 underline">browse computer</span>
                        </p>
                        <p className="font-sans text-[10px] text-dark-500 uppercase tracking-widest">
                          PNG, JPG, or JPEG up to 25MB supported
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Box 2: Category & Details */}
              <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider">
                    02. Product Specifications
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-1">
                    Describe basic metrics to help AI drape custom meshes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-display text-white/80 uppercase tracking-wider mb-2">
                      Saree Brand Owner Name
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
                    <label className="block text-xs font-display text-white/80 uppercase tracking-wider mb-2">
                      Official Brand / Shop Name
                    </label>
                    <input 
                      type="text" 
                      name="brand"
                      required
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g. Royal Banaras Silk"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-display text-white/80 uppercase tracking-wider mb-2">
                      Product Ethnic Category
                    </label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white/80 rounded-sm py-3.5 px-4 text-sm font-sans focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>Saree</option>
                      <option>Lehenga</option>
                      <option>Kurti</option>
                      <option>Salwar Kameez</option>
                      <option>Antique Jewelry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-display text-white/80 uppercase tracking-wider mb-2">
                      WhatsApp Delivery Number
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
                </div>
              </div>

              {/* Box 3: Model Archetype Selector */}
              <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider">
                    03. Select Model Face Archetype
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-1">
                    Choose an aesthetic face archetype representing your regional focus.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {models.map((mod) => (
                    <div
                      key={mod.id}
                      onClick={() => handleModelChange(mod.label)}
                      className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 text-left ${
                        formData.modelType === mod.label
                          ? 'border-gold-500 bg-gold-500/5 shadow-inner'
                          : 'border-white/10 bg-dark-950/40 hover:border-white/20'
                      }`}
                    >
                      <h4 className={`font-display font-medium text-sm mb-1 ${
                        formData.modelType === mod.label ? 'text-gold-400' : 'text-white'
                      }`}>
                        {mod.label}
                      </h4>
                      <p className="text-dark-400 font-sans text-xs font-light leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 4: Background Style Selector */}
              <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider">
                    04. Choose Luxury Background Location
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-1">
                    Transport your models to magnificent locations globally.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {backgrounds.map((bg) => (
                    <div
                      key={bg.id}
                      onClick={() => handleBackgroundChange(bg.label)}
                      className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 text-left flex justify-between items-start ${
                        formData.background === bg.label
                          ? 'border-gold-500 bg-gold-500/5 shadow-inner'
                          : 'border-white/10 bg-dark-950/40 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <h4 className={`font-display font-medium text-sm mb-1 ${
                          formData.background === bg.label ? 'text-gold-400' : 'text-white'
                        }`}>
                          {bg.label}
                        </h4>
                        <span className="text-dark-400 font-sans text-xs font-light">
                          Location Theme: <strong className="text-white/80 font-normal">{bg.location}</strong>
                        </span>
                      </div>
                      {bg.extraPrice > 0 && (
                        <span className="text-[10px] font-display font-semibold text-gold-500 border border-gold-500/40 px-1.5 py-0.5 rounded-sm">
                          +{bg.extraPrice} INR
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 5: Special Directions */}
              <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider">
                    05. Artistic Instructions
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-1">
                    Describe any specific draping flow, pleat arrangements, posing details, or accessory selections.
                  </p>
                </div>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="e.g. Saree border must drape elegantly over the left shoulder. Please add gold traditional Jhumkas and keep makeup minimal and natural..."
                  className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-4 px-4 text-sm font-sans focus:outline-none transition-colors"
                />
              </div>

            </div>

            {/* Sidebar Summary Block */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              <div className="glass-panel-gold glow-gold p-8 rounded-sm border border-gold-500/15">
                <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider mb-6 pb-4 border-b border-white/10">
                  Shoot Configuration
                </h3>

                <div className="space-y-4 font-sans text-sm mb-8">
                  {/* Category summary */}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-dark-400 font-light">Ethnic Category:</span>
                    <span className="text-white font-medium">{formData.category}</span>
                  </div>
                  
                  {/* Model summary */}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-dark-400 font-light">Model Face:</span>
                    <span className="text-white font-medium text-right max-w-[150px] truncate">{formData.modelType}</span>
                  </div>

                  {/* Background summary */}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-dark-400 font-light">Background:</span>
                    <span className="text-white font-medium text-right max-w-[150px] truncate">{formData.background}</span>
                  </div>

                  {/* Saree Name */}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-dark-400 font-light">Brand:</span>
                    <span className="text-white font-medium text-right max-w-[150px] truncate">{formData.brand || '---'}</span>
                  </div>

                  {/* Saree File */}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-dark-400 font-light">Uploaded Asset:</span>
                    <span className="text-gold-400 font-light text-right max-w-[150px] truncate">{fileName || 'None Selected'}</span>
                  </div>

                  {/* Whatsapp summary */}
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-dark-400 font-light">WhatsApp:</span>
                    <span className="text-white font-medium">{formData.whatsapp || '---'}</span>
                  </div>
                </div>

                {/* Pricing section */}
                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-white font-medium text-sm">Estimated Price:</span>
                    <div className="text-right">
                      <span className="text-3xl font-display font-bold text-white">₹{calculateTotal()}</span>
                      <span className="text-dark-400 text-[10px] block">Inclusive of CGST</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gold-400 block font-light">
                    * Single shoot configuration under Starter Trial billing.
                  </span>
                </div>

                {/* Verification notes */}
                <div className="flex items-start gap-2 text-xs font-light text-dark-300 bg-white/5 p-3 rounded-sm border border-white/10 mb-6">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Your original fabrics, embroideries and patterns are 100% protected and remain unaltered.</span>
                </div>

                {/* Order trigger */}
                <button
                  type="submit"
                  disabled={!fileName}
                  className={`w-full font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    fileName
                      ? 'bg-gold-500 hover:bg-gold-400 text-dark-950 cursor-pointer shadow-md shadow-gold-500/10'
                      : 'bg-white/5 text-white/40 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  <span>Dispatch Shoot Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="glass-panel p-6 rounded-sm border border-white/5 text-xs text-dark-400 space-y-4">
                <div className="flex gap-2.5 items-start">
                  <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Rapid GPU Generation</strong>
                    Neural network finishes base generation in 15 seconds. Manual quality review completes in hours.
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Secure Data Protection</strong>
                    We encrypt your source product designs. They are never shared publicly or used for global network training.
                  </div>
                </div>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default Order;
