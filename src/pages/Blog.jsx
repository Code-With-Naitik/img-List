import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, User, ArrowLeft, Sparkles, 
  ChevronRight, Share2, Facebook, Twitter, Link as LinkIcon, AlertCircle 
} from 'lucide-react';
import { blogs } from './blogsData';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleImageError = (e, blogId) => {
    e.target.onerror = null;
    const fallbacks = {
      1: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1537832821221-099be9aefb5b?q=80&w=800&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      5: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      6: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
      7: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop",
      8: "https://images.unsplash.com/photo-1520004434532-668416a08753?q=80&w=800&auto=format&fit=crop",
      9: "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
      10: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
      11: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    };
    e.target.src = fallbacks[blogId] || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop";
  };

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop";
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'tech', label: 'AI Technology' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'tutorials', label: 'Tutorials' }
  ];

  const handleShare = (title) => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs.find(blog => blog.featured);

  return (
    <div className="bg-[#050507] text-white min-h-screen pt-28 pb-20">
      
      {/* ---------------- SEO META / HEADING ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedBlog ? (
          <>
            {/* Header Title Section */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-3 animate-pulse">
                STUDIO KNOWLEDGE & INSIGHTS
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-medium text-white mb-5 leading-tight">
                The Ethnic Fashion <span className="text-gold-500 italic font-normal">AI Hub</span>
              </h1>
              <p className="font-sans font-light text-dark-400 text-sm md:text-base leading-relaxed">
                Expert blueprints, industry statistics, and deep-dive technical tutorials on how generative AI models, virtual draping, and neural texture mapping are shaping ethnic e-commerce globally.
              </p>
            </div>

            {/* Live Interactive Controls: Search & Category Filter */}
            <div className="glass-panel p-6 mb-12 rounded-lg border border-white/5 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-[10px] font-display tracking-widest uppercase rounded-sm border cursor-pointer transition-all duration-300 ${
                      selectedCategory === cat.id 
                        ? 'bg-gold-500 border-gold-500 text-dark-950 font-bold' 
                        : 'border-white/10 hover:border-gold-500/50 text-white/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-dark-950/80 border border-white/10 hover:border-white/20 focus:border-gold-500 text-white rounded-sm py-2.5 pl-10 pr-4 text-xs font-sans focus:outline-none transition-all placeholder:text-dark-500"
                />
              </div>

            </div>

            {/* ---------------- 1. FEATURED ARTICLE BANNER (2000+ words) ---------------- */}
            {selectedCategory === 'all' && searchQuery === '' && featuredBlog && (
              <div 
                className="glass-panel rounded-lg border border-white/5 overflow-hidden mb-16 shadow-2xl cursor-pointer group hover:border-gold-500/30 transition-all duration-500 flex flex-col lg:flex-row"
                onClick={() => handleBlogClick(featuredBlog)}
              >
                {/* Image panel */}
                <div className="lg:w-1/2 overflow-hidden aspect-[16/10] lg:aspect-auto relative min-h-[300px]">
                  <img 
                    src={featuredBlog.cover} 
                    alt={featuredBlog.title} 
                    onError={(e) => handleImageError(e, featuredBlog.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-gold-500 text-dark-950 font-display text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    CORNERSTONE ARTICLE
                  </div>
                </div>

                {/* Content description panel */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-dark-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-500" />
                        <span>{featuredBlog.date}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-500" />
                        <span>{featuredBlog.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl font-medium text-white group-hover:text-gold-400 transition-colors leading-tight">
                      {featuredBlog.title}
                    </h2>

                    <p className="font-sans font-light text-dark-300 text-sm leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={featuredBlog.avatar} 
                        alt={featuredBlog.author} 
                        onError={handleAvatarError}
                        className="w-10 h-10 rounded-full object-cover border border-gold-500/20"
                      />
                      <div>
                        <span className="block font-display font-medium text-xs text-white">
                          {featuredBlog.author}
                        </span>
                        <span className="block font-sans text-[10px] text-dark-400">
                          Senior Contributor
                        </span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-display uppercase tracking-wider text-gold-500 group-hover:text-gold-450 transition-colors">
                      <span>Read Blueprint</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- 2. MULTI-CARD BLOG GRID (More than 10 blogs!) ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.filter(b => b.id !== 1 || selectedCategory !== 'all' || searchQuery !== '').map((blog) => (
                <article 
                  key={blog.id}
                  onClick={() => handleBlogClick(blog)}
                  className="glass-panel rounded-lg border border-white/5 overflow-hidden shadow-xl cursor-pointer group hover:border-gold-500/20 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover image wrapper */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={blog.cover} 
                        alt={blog.title} 
                        onError={(e) => handleImageError(e, blog.id)}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-sm border border-white/10 text-gold-400 font-display text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {blog.category === 'tech' ? 'AI Technology' : blog.category === 'ecommerce' ? 'E-Commerce' : blog.category === 'marketing' ? 'Marketing' : 'Tutorials'}
                      </div>
                    </div>

                    {/* Metadata & Description */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3.5 text-[10px] text-dark-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gold-500/80" />
                          <span>{blog.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold-500/80" />
                          <span>{blog.readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-serif font-medium text-lg text-white group-hover:text-gold-400 transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="font-sans font-light text-dark-300 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer profile detail */}
                  <div className="p-6 border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={blog.avatar} 
                        alt={blog.author} 
                        onError={handleAvatarError}
                        className="w-7 h-7 rounded-full object-cover border border-gold-500/10"
                      />
                      <span className="font-display font-medium text-[10px] text-white/95 line-clamp-1 max-w-[130px]">
                        {blog.author}
                      </span>
                    </div>
                    <span className="flex items-center gap-0.5 text-[10px] font-display uppercase tracking-wider text-gold-500/80 group-hover:text-gold-500 transition-colors">
                      <span>Read Now</span>
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              ))}

              {filteredBlogs.length === 0 && (
                <div className="col-span-full text-center py-20 bg-dark-950/30 rounded-lg border border-dashed border-white/10">
                  <AlertCircle className="w-10 h-10 text-gold-400/50 mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-lg text-white mb-1">No Articles Found</h3>
                  <p className="text-dark-400 text-sm font-light max-w-sm mx-auto">
                    We couldn't find any articles matching your search query. Try broadening your keywords or changing categories.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* ---------------- 3. DETAILED SINGLE BLOG VIEW ---------------- */
          <article className="max-w-3xl mx-auto animate-fadeIn">
            {/* Back button link */}
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-dark-400 hover:text-gold-400 text-xs font-display uppercase tracking-widest mb-10 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to all articles</span>
            </button>

            {/* Article category badge */}
            <div className="inline-flex py-1.5 px-3 rounded-sm bg-gold-500/10 border border-gold-500/20 text-gold-400 font-display text-[9px] uppercase tracking-widest mb-6">
              {selectedBlog.category === 'tech' ? 'AI Technology' : selectedBlog.category === 'ecommerce' ? 'E-Commerce' : selectedBlog.category === 'marketing' ? 'Marketing' : 'Tutorials'}
            </div>

            {/* Headline Title */}
            <h1 className="font-serif text-3xl md:text-5xl font-medium text-white mb-6 leading-tight">
              {selectedBlog.title}
            </h1>

            {/* Author Profile and Share controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-t border-white/5 py-6 mb-10">
              <div className="flex items-center gap-3.5">
                <img 
                  src={selectedBlog.avatar} 
                  alt={selectedBlog.author} 
                  onError={handleAvatarError}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gold-500/20 ring-offset-4 ring-offset-[#050507]"
                />
                <div className="text-left">
                  <span className="block font-display font-medium text-sm text-white">
                    {selectedBlog.author}
                  </span>
                  <span className="block font-sans text-xs text-dark-400 font-light mt-0.5">
                    Published on {selectedBlog.date} • {selectedBlog.readTime}
                  </span>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <button 
                  onClick={() => handleShare(selectedBlog.title)}
                  className="p-2.5 rounded-sm bg-white/5 border border-white/5 hover:border-gold-500 hover:text-gold-400 flex items-center justify-center transition-colors cursor-pointer"
                  title="Copy Page Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {copied && (
                  <span className="text-[10px] font-display text-gold-400 animate-pulse tracking-widest uppercase pl-1.5">
                    Copied URL!
                  </span>
                )}
              </div>
            </div>

            {/* Full-width cover image */}
            <div className="rounded-lg overflow-hidden aspect-[16/9] mb-12 shadow-2xl">
              <img 
                src={selectedBlog.cover} 
                alt={selectedBlog.title} 
                onError={(e) => handleImageError(e, selectedBlog.id)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Masterpiece 2000+ words SEO Content Rendering (HTML Safe Injection) */}
            <div 
              className="blog-content font-sans font-light text-dark-200 text-base leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />

            {/* Bottom Back Button */}
            <div className="border-t border-white/5 pt-10 mt-16 text-center">
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-transparent border border-white/10 hover:border-gold-500 text-white font-sans text-xs tracking-widest uppercase py-3.5 px-8 rounded-sm hover:text-gold-450 transition-colors cursor-pointer"
              >
                Return to Hub Directory
              </button>
            </div>
          </article>
        )}
      </div>

    </div>
  );
};

export default Blog;
