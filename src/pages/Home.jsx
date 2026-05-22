import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Zap, Heart, CheckCircle2, ChevronRight, 
  UploadCloud, ArrowRight, Star, ChevronDown, Check,
  Camera, ShoppingBag, Instagram, Eye, HelpCircle, LayoutGrid
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Home = ({ setCurrentPage }) => {
  // Testimonial Carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Gallery filters and items
  const [activeFilter, setActiveFilter] = useState('sarees');
  const [previewImage, setPreviewImage] = useState(null);

  // Form states for the free sample
  const [fileName, setFileName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const stats = [
    { value: '500,000+', label: 'AI Photos Generated' },
    { value: '1,200+', label: 'Saree Brands Empowered' },
    { value: '90%', label: 'Cost Reductions' },
    { value: '24 Hours', label: 'Average Turnaround' }
  ];

  const brandLogos = [
    'Zari Heritage', 'Silk Emporium', 'Vedic Weaves', 'Royal Ethno', 'Kalyan Silks (Mock)', 'Kora Couture'
  ];

  const services = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold-400" />,
      title: 'AI Saree Photoshoot',
      desc: 'Drape your sarees virtually onto custom AI avatars representing diverse Indian profiles with photorealistic fabrics.'
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-gold-400" />,
      title: 'Ecommerce Catalog Images',
      desc: 'Clean, high-fidelity catalog images matching Amazon, Myntra, and AJIO requirements without expensive studio rental.'
    },
    {
      icon: <Instagram className="w-6 h-6 text-gold-400" />,
      title: 'Instagram Fashion Creatives',
      desc: 'Visually stunning aesthetic photos in premium apartments, luxury cafes, and high-end cityscapes for social media buzz.'
    },
    {
      icon: <Camera className="w-6 h-6 text-gold-400" />,
      title: 'Luxury Outdoor Shoots',
      desc: 'Transport your sarees to Jaipur Palaces, Kerala backwaters, or European streets with realistic lighting and shadows.'
    },
    {
      icon: <LayoutGrid className="w-6 h-6 text-gold-400" />,
      title: 'White Background Listings',
      desc: 'Get highly precise, wrinkle-free, perfect studio white background shots optimized for quick online sales.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-400" />,
      title: 'Festival Theme Promotions',
      desc: 'Celebrate Diwali, Navratri, or Durga Puja with customized luxury backdrops full of premium festive lights.'
    }
  ];

  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold-400" />,
      title: 'Exact Saree Design Preservation',
      desc: 'Our proprietary neural network keeps your exact zari patterns, intricate embroidery, and fabric texture 100% unaltered.'
    },
    {
      icon: <Eye className="w-8 h-8 text-gold-400" />,
      title: 'Ultra HD Zoom Quality',
      desc: 'Export high-definition 4K photos that allow customers to zoom in and check every elegant silk weave clearly.'
    },
    {
      icon: <Zap className="w-8 h-8 text-gold-400" />,
      title: 'Fast 24-Hour Delivery',
      desc: 'Skip the 2-week studio booking. Upload your saree photos today and download gorgeous fashion shoots tomorrow.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-gold-400" />,
      title: 'Affordable Pricing',
      desc: 'Save more than 90% compared to typical human photoshoots. Plans start at just ₹99 per premium image.'
    },
    {
      icon: <Instagram className="w-8 h-8 text-gold-400" />,
      title: 'Instagram Ready Images',
      desc: 'Cropped, formatted, color-graded, and styled perfectly for immediate upload to Instagram Reels, posts, or stories.'
    },
    {
      icon: <Heart className="w-8 h-8 text-gold-400" />,
      title: 'No Photoshoot Required',
      desc: 'No models to book, no makeup artists, no travel fees, no scheduling headaches. Pure convenience from your desktop.'
    }
  ];

  const portfolioCategories = [
    { id: 'sarees', label: 'Sarees' },
    { id: 'lehengas', label: 'Lehengas' },
    { id: 'kurtis', label: 'Kurtis' },
    { id: 'jewelry', label: 'Jewelry' }
  ];

  const portfolioItems = [
    // Sarees
    { id: 1, category: 'sarees', title: 'Banarasi Brocade Saree', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
    { id: 2, category: 'sarees', title: 'Kanjeevaram Silk Elegance', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop' },
    { id: 3, category: 'sarees', title: 'Emerald Chanderi Collection', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop' },
    // Lehengas
    { id: 4, category: 'lehengas', title: 'Royal Crimson Lehenga', img: 'https://images.unsplash.com/photo-1610030470208-eb1a9c39474b?q=80&w=600&auto=format&fit=crop' },
    { id: 5, category: 'lehengas', title: 'Gold Velvet Bridal Set', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop' },
    // Kurtis
    { id: 6, category: 'kurtis', title: 'Modern Indigo Anarkali', img: 'https://images.unsplash.com/photo-1608963503737-f3329246b7a0?q=80&w=600&auto=format&fit=crop' },
    { id: 7, category: 'kurtis', title: 'Casual Pastel Cotton Wear', img: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?q=80&w=600&auto=format&fit=crop' },
    // Jewelry
    { id: 8, category: 'jewelry', title: 'Antique Polki Choker Set', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop' },
  ];

  const filteredItems = portfolioItems.filter(item => item.category === activeFilter);

  const steps = [
    {
      num: '01',
      title: 'Upload Saree Image',
      desc: 'Snap a photo of your saree flat on a table or hanging on a simple dummy. Upload it directly to our dashboard.'
    },
    {
      num: '02',
      title: 'AI Fashion Generation',
      desc: 'Select your preferred Indian model archetype, posing style, and luxury background setting (palace, cafe, studio).'
    },
    {
      num: '03',
      title: 'Download Ready Photos',
      desc: 'Receive stunning ultra-HD model images showing your exact saree draped flawlessly, ready to publish online.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter Plan',
      price: '₹299',
      images: '3 AI Images',
      popular: false,
      features: [
        'Standard AI Models',
        'Indoor Studio Backdrops',
        'Fabric Texture Match (High)',
        'Delivery in 48 hours',
        'HD Quality Output (1080p)'
      ],
      btnText: 'Start Trial'
    },
    {
      name: 'Growth Plan',
      price: '₹999',
      images: '10 AI Images',
      popular: true,
      features: [
        'Premium Models & Poses',
        'Luxury Outdoor Backdrops (Palaces, Cafes)',
        'Fabric Texture Match (Exact 100%)',
        'Priority 24-hour turnaround',
        'Ultra HD Quality Output (4K)',
        'Free Instagram Aspect Ratios'
      ],
      btnText: 'Get Growth Bundle'
    },
    {
      name: 'Brand Catalog Plan',
      price: '₹2999',
      images: '35 AI Images',
      popular: false,
      features: [
        'Exclusive Face Generation',
        'Custom Poses & Multi-angles',
        'All Outdoor & Festive Backdrops',
        'Super Fast Express Turnaround (12h)',
        'Ultra HD 4K + Source TIFF Files',
        'Custom Brand Logo Watermarks'
      ],
      btnText: 'Maximize Scale'
    }
  ];

  const testimonials = [
    {
      quote: "AI Fashion Studio completely changed our business model. We used to spend ₹50,000 on every new saree collection launch. Now, we do it under ₹3,000. The sarees look perfectly real on the models, and customer returns did not increase at all!",
      name: "Prerna Shah",
      role: "Founder, Zari Heritage",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
      rating: 5
    },
    {
      quote: "We uploaded simple smartphone flat-lays of our lehengas, and the outputs looked like high-end designer shoots shot in a Rajasthan palace. Our Instagram engagement went up by 300% in just two weeks!",
      name: "Rohan Hegde",
      role: "Marketing Director, Silk Emporium",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
      rating: 5
    },
    {
      quote: "The texture preservation is outstanding. I was skeptical if the golden zari borders on my silk sarees would look authentic, but the AI mapped them perfectly. Best tech for modern clothing boutiques.",
      name: "Anjali Menon",
      role: "Owner, Vedic Weaves",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "Will my saree design change in the AI photo?",
      a: "Absolutely not. Our state-of-the-art neural network treats your saree fabric as an unalterable constraint. The exact weave pattern, embroidery, border detail, and color scheme are strictly preserved. Only the wrapping and draping onto the fashion model are generated."
    },
    {
      q: "How fast is the image delivery?",
      a: "For our Starter package, images are delivered within 48 hours. For our Growth and Brand Catalog packages, we deliver in 12 to 24 hours. Express rush orders can be processed even faster."
    },
    {
      q: "Can I use these images on Instagram and Amazon?",
      a: "Yes! All images are fully royalty-free and commercial-use cleared. They comply perfectly with Amazon, Myntra, Flipkart, and Instagram standards. We offer aspect ratios optimized for both stories/reels and ecommerce grids."
    },
    {
      q: "Is HD/4K quality included?",
      a: "Yes. Our Starter plan features sharp HD (1080p) files. The Growth and Brand Catalog plans export in Ultra HD (4K) quality, capturing the microscopic silk fibers and thread details for rich zooming."
    },
    {
      q: "Can you create shoots with outdoor luxury locations?",
      a: "Certainly! You can select from dozens of locations: Royal palaces in Udaipur, premium cafes in Mumbai, luxury apartments, beach dunes, or high-end studio setups."
    }
  ];

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      name: data.get('name'),
      whatsapp: data.get('whatsapp'),
      brand: data.get('brand'),
      category: data.get('category'),
      fileName: fileName || 'sample_fabric.jpg'
    };

    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

    try {
      const res = await fetch(`${API_BASE}/api/free-sample`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFileName('');
          e.target.reset();
        }, 5000);
      } else {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error('API Error:', err);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-12 overflow-x-hidden">
      
      {/* ---------------- SECTION 1 — HERO SECTION ---------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
        {/* Dynamic lighting gradients */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gold-600/10 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
        
        {/* Abstract luxury background backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,25,0.8),#050507)] opacity-95 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="font-display font-medium text-xs text-white/90 uppercase tracking-[0.2em]">
                Revolutionizing Saree E-Commerce
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-tight max-w-5xl mx-auto"
          >
            Premium AI Fashion Photoshoots <br className="hidden md:block"/>
            <span className="text-gold-500 italic">For Saree Brands</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans font-light text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Create high-end luxury model photos without hiring expensive models, makeup artists, photographers, or luxury studios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => setCurrentPage('order')}
              className="w-full sm:w-auto bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-sm tracking-wider uppercase py-4 px-8 rounded-sm shadow-xl shadow-gold-600/10 hover:shadow-gold-500/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>Get Free Sample</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setCurrentPage('portfolio')}
              className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-gold-500 text-white font-display font-medium text-sm tracking-wider uppercase py-4 px-8 rounded-sm hover:text-gold-400 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Portfolio</span>
            </button>
          </motion.div>

          {/* Counters Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/5 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-white mb-1.5">{stat.value}</div>
                <div className="font-sans font-light text-xs text-dark-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trusted By strip */}
          <div className="mt-16 text-center">
            <span className="font-sans font-light text-[10px] text-dark-500 uppercase tracking-[0.25em] block mb-4">
              Trusted by leading ethnic brands
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 hover:opacity-75 transition-opacity duration-300">
              {brandLogos.map((logo, index) => (
                <span key={index} className="font-serif text-lg tracking-widest text-white italic">{logo}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 2 — BEFORE VS AFTER ---------------- */}
      <section className="py-24 bg-dark-950 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Transform Simple Product Images <br />
              <span className="text-gold-500 italic">Into Premium Fashion Shoots</span>
            </h2>
            <p className="font-sans font-light text-dark-400 text-base max-w-2xl mx-auto">
              Our advanced AI wraps your saree flat lay files perfectly onto professional photorealistic avatars. Compare the breathtaking transformation below.
            </p>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* ---------------- SECTION 3 — SERVICES ---------------- */}
      <section className="py-24 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
              WHAT WE EXCEL IN
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-4">
              Premium AI Photography Services
            </h2>
            <p className="font-sans font-light text-dark-400 text-base max-w-2xl mx-auto">
              Custom-tailored photography styles created digitally for high-end saree stores and designer ethnic wear boutiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div 
                key={i}
                className="luxury-border-hover glass-panel p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm w-fit mb-6 group-hover:border-gold-500/40 group-hover:bg-gold-500/5 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="font-display font-medium text-lg text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {svc.title}
                </h3>
                <p className="font-sans font-light text-dark-300 text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4 — WHY CHOOSE US ---------------- */}
      <section className="py-24 bg-[#08080a] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
              THE AI FASHION EDGE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-4">
              Why Choose Our Studio?
            </h2>
            <p className="font-sans font-light text-dark-400 text-base max-w-2xl mx-auto">
              Engineered by neural imaging pioneers to preserve the exact details of complex Indian textiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div 
                key={i}
                className="p-8 rounded-sm bg-dark-950/40 border border-white/5 flex flex-col items-start hover:border-gold-500/20 hover:bg-dark-950/80 transition-all duration-300"
              >
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="font-display font-medium text-lg text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="font-sans font-light text-dark-400 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5 — PORTFOLIO GALLERY ---------------- */}
      <section className="py-24 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
                STUDIO PORTFOLIO
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-2">
                Stunning AI Generation Samples
              </h2>
              <p className="font-sans font-light text-dark-400 text-sm max-w-md">
                Flip through realistic, high-fashion catalog mockups generated instantly by our studio.
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded-sm border cursor-pointer transition-all duration-300 ${
                    activeFilter === cat.id 
                      ? 'bg-gold-500 border-gold-500 text-dark-950 font-medium' 
                      : 'border-white/10 hover:border-gold-500/50 text-white/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-md border border-white/5 aspect-[3/4] cursor-pointer"
                  onClick={() => setPreviewImage(item.img)}
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6" />
                  
                  {/* Hover content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-gold-500 font-display text-[10px] uppercase tracking-widest mb-1.5">
                      {item.category}
                    </p>
                    <h4 className="font-display font-medium text-white text-base leading-tight mb-2">
                      {item.title}
                    </h4>
                    <span className="font-sans text-xs text-white/60 hover:text-white flex items-center gap-1.5">
                      <span>Preview Shoot</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('portfolio')}
              className="bg-transparent border border-white/10 hover:border-gold-500 text-white font-sans text-xs tracking-widest uppercase py-3.5 px-8 rounded-sm hover:text-gold-400 transition-colors cursor-pointer"
            >
              Explore Full Dedicated Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[85vh] overflow-hidden rounded-md border border-white/10">
            <img 
              src={previewImage} 
              alt="Fashion Preview" 
              className="w-full h-auto max-h-[85vh] object-contain mx-auto"
            />
            <button 
              className="absolute top-4 right-4 bg-dark-950/80 hover:bg-gold-500 border border-white/10 hover:border-gold-500 text-white hover:text-dark-950 p-2.5 rounded-full transition-colors cursor-pointer"
              onClick={() => setPreviewImage(null)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 6 — HOW IT WORKS ---------------- */}
      <section className="py-24 bg-[#08080a] relative border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
              CREATIVE PIPELINE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-4">
              How It Works
            </h2>
            <p className="font-sans font-light text-dark-400 text-base max-w-2xl mx-auto">
              Our 3-step high-efficiency digital workflow gets your collection ready in hours instead of weeks.
            </p>
          </div>

          <div className="relative">
            {/* Connector line for desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-gold-500/10 via-gold-500/50 to-gold-500/10" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {steps.map((st, i) => (
                <div key={i} className="text-center group">
                  <div className="w-24 h-24 rounded-full bg-dark-950 border border-white/10 hover:border-gold-500 flex items-center justify-center mx-auto mb-8 shadow-2xl relative transition-all duration-300 group-hover:scale-105">
                    <span className="font-serif text-2xl font-semibold text-gold-500 italic">
                      {st.num}
                    </span>
                    {/* Glowing outer aura */}
                    <div className="absolute inset-0 rounded-full bg-gold-500/0 group-hover:bg-gold-500/5 transition-all duration-300 blur-md" />
                  </div>
                  <h3 className="font-display font-medium text-lg text-white mb-3">
                    {st.title}
                  </h3>
                  <p className="font-sans font-light text-dark-400 text-sm leading-relaxed max-w-xs mx-auto">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7 — PRICING ---------------- */}
      <section className="py-24 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
              TRANSPARENT PLANS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-4">
              Invest in World-Class Catalogs
            </h2>
            <p className="font-sans font-light text-dark-400 text-base max-w-2xl mx-auto">
              Select an option that matches your launch frequency. Standardize your catalogs with high-end digital precision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i}
                className={`flex flex-col justify-between rounded-sm p-8 transition-all duration-300 relative ${
                  plan.popular 
                    ? 'bg-dark-950 border-2 border-gold-500/80 shadow-[0_0_40px_-5px_rgba(212,167,28,0.15)] scale-100 lg:scale-105 z-10' 
                    : 'bg-dark-950/40 border border-white/5 hover:border-gold-500/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-dark-950 font-display text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <div>
                  <h3 className="font-display font-medium text-base text-white/90 uppercase tracking-widest mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-bold text-4xl text-white">{plan.price}</span>
                    <span className="font-sans text-xs text-dark-400 font-light">INR total</span>
                  </div>
                  
                  <p className="font-display font-medium text-sm text-gold-400 mb-8 tracking-wide">
                    {plan.images}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm font-light text-dark-300">
                        <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentPage('pricing')}
                  className={`w-full font-sans text-xs font-semibold tracking-widest uppercase py-4 rounded-sm transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? 'bg-gold-500 hover:bg-gold-400 text-dark-950 shadow-md shadow-gold-500/10'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {plan.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 8 — FREE SAMPLE CTA ---------------- */}
      <section className="py-24 bg-[#0b0b0d] border-t border-b border-white/5 relative overflow-hidden">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-600/5 to-white/0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3 animate-pulse">
              EXCLUSIVELY FOR BUSINESS OWNERS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-4">
              Get 1 FREE AI Fashion Sample
            </h2>
            <p className="font-sans font-light text-dark-400 text-sm max-w-lg mx-auto">
              Upload one flat lay image of your saree. We will generate a luxury model render and WhatsApp it back to you within 24 hours.
            </p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-sm border border-white/10">
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  Sample Request Received!
                </h3>
                <p className="font-sans font-light text-dark-300 text-sm max-w-sm mx-auto mb-6">
                  Our neural engine has started processing. You will receive your watermarked premium model render on WhatsApp within 12-24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-display uppercase tracking-widest text-gold-500 hover:text-gold-400"
                >
                  Submit another sample
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Priyan Sen"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* WhatsApp field */}
                  <div>
                    <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                      WhatsApp Number
                    </label>
                    <input 
                      type="tel" 
                      name="whatsapp"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brand name */}
                  <div>
                    <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                      Brand / Shop Name
                    </label>
                    <input 
                      type="text" 
                      name="brand"
                      required
                      placeholder="e.g. Kanchipuram Silks"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                      Select Ethnic Type
                    </label>
                    <select 
                      name="category"
                      className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white/80 rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>Saree</option>
                      <option>Lehenga</option>
                      <option>Kurti</option>
                      <option>Anarkali</option>
                    </select>
                  </div>
                </div>

                {/* Upload Area */}
                <div>
                  <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                    Upload Saree Flat Lay or Dummy Photo
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-colors duration-300 ${
                      isDragging 
                        ? 'border-gold-500 bg-gold-500/5' 
                        : fileName 
                          ? 'border-gold-500/50 bg-white/5' 
                          : 'border-white/10 hover:border-gold-500/40 bg-dark-950'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="saree-upload" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden" 
                      required={!fileName}
                    />
                    <label htmlFor="saree-upload" className="cursor-pointer">
                      <UploadCloud className="w-10 h-10 text-gold-400 mx-auto mb-3" />
                      {fileName ? (
                        <div>
                          <p className="font-display font-medium text-white text-sm mb-1">
                            Successfully Loaded!
                          </p>
                          <p className="font-sans text-xs text-gold-400 font-light truncate max-w-xs mx-auto">
                            {fileName}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-display font-medium text-white text-sm mb-1">
                            Drag and drop your file here, or <span className="text-gold-400 underline">browse</span>
                          </p>
                          <p className="font-sans text-xs text-dark-400 font-light">
                            Supports high-res PNG, JPG, or JPEG up to 15MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-sm tracking-widest uppercase py-4 rounded-sm transition-all duration-300 shadow-md shadow-gold-500/10 cursor-pointer"
                >
                  Generate Free Sample Shoot
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 9 — TESTIMONIALS ---------------- */}
      <section className="py-24 bg-dark-950 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
              CLIENT CONFIDENCE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-2">
              Loved by Elite Saree Boutiques
            </h2>
          </div>

          {/* Testimonial slider view */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6 text-gold-400">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="font-serif italic text-white/95 text-lg md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
                  “{testimonials[activeTestimonial].quote}”
                </p>

                {/* Profile detail */}
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-12 h-12 rounded-full object-cover border border-gold-500/30"
                  />
                  <div className="text-left">
                    <span className="block font-display font-medium text-sm text-white">
                      {testimonials[activeTestimonial].name}
                    </span>
                    <span className="block font-sans font-light text-xs text-gold-400">
                      {testimonials[activeTestimonial].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-350 ${
                  activeTestimonial === i ? 'bg-gold-500 scale-125' : 'bg-white/10 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 10 — FAQ ---------------- */}
      <section className="py-24 bg-[#08080a] relative border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3">
              KNOWLEDGE BANK
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border-b border-white/5 pb-4 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-4 text-white hover:text-gold-400 cursor-pointer group"
                  >
                    <span className="font-display font-medium text-base md:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-dark-400 group-hover:text-gold-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-gold-400' : ''
                      }`} 
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans font-light text-dark-300 text-sm leading-relaxed pb-4 pl-1">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
