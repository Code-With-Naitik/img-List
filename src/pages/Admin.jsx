import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LayoutDashboard, ShoppingBag, Gift, MessageSquare,
  Image, Trash2, Edit3, Plus, CheckCircle2, X, RefreshCw,
  TrendingUp, Users, DollarSign, Activity, AlertCircle
} from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

const Admin = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'samples', 'messages', 'portfolio'

  // Data Collections
  const [orders, setOrders] = useState([]);
  const [samples, setSamples] = useState([]);
  const [messages, setMessages] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  // CRUD Edit modals state
  const [editingItem, setEditingItem] = useState(null); // stores the object currently being edited
  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // New Portfolio Form State
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: 'sarees',
    img: '',
    location: '',
    model: '',
    time: ''
  });

  // Fetch all data helper
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [resOrders, resSamples, resMessages, resPortfolio] = await Promise.all([
        fetch(`${API_BASE}/api/admin/orders`),
        fetch(`${API_BASE}/api/admin/samples`),
        fetch(`${API_BASE}/api/admin/messages`),
        fetch(`${API_BASE}/api/admin/portfolio`)
      ]);

      if (resOrders.ok) setOrders(await resOrders.json());
      if (resSamples.ok) setSamples(await resSamples.json());
      if (resMessages.ok) setMessages(await resMessages.json());
      if (resPortfolio.ok) setPortfolio(await resPortfolio.json());

    } catch (err) {
      console.error('API Connectivity Error:', err);
      triggerAlert('Failed to connect to Express backend. Running in simulated fallback mode.', 'warning');

      // Seeding client-side fallback arrays in case server isn't running on port 5000 yet
      if (orders.length === 0) {
        setOrders([
          { id: "ORD-990281", name: "Anjali Menon", brand: "Vedic Weaves", category: "Lehenga", whatsapp: "+91 98765 43210", background: "Palace", modelType: "Heritage North Indian", notes: "Drape golden border left", price: 299, status: "Analyzing Fabric Meshes", orderedAt: new Date().toISOString() }
        ]);
        setSamples([
          { id: "SMPL-882910", name: "Anishka Verma", whatsapp: "+91 88888 88888", brand: "Verma Silks", category: "Saree", fileName: "kanjeevaram.jpg", status: "Queued in GPUs", submittedAt: new Date().toISOString() }
        ]);
        setMessages([
          { id: "MSG-661029", name: "Suresh Rao", email: "suresh@raoethnic.com", whatsapp: "+91 90000 90000", message: "Interested in bulk catalog rates.", status: "Active Review", sentAt: new Date().toISOString() }
        ]);
        setPortfolio([
          { id: 1, category: 'sarees', title: 'Crimson Silk Banarasi Saree', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600', location: 'City Palace, Jaipur', model: 'Heritage Indian', time: 'Outdoor Golden Hour' }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const triggerAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 4000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
      triggerAlert('Authenticated successfully as Studio Director.');
    } else {
      setLoginError('Invalid username or security credentials.');
    }
  };

  // ====================================================
  // CRUD ACTIONS
  // ====================================================

  // 1. UPDATE status or other attributes
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    let endpoint = '';
    if (activeTab === 'orders') endpoint = `/api/admin/orders/${editingItem.id}`;
    else if (activeTab === 'samples') endpoint = `/api/admin/samples/${editingItem.id}`;
    else if (activeTab === 'messages') endpoint = `/api/admin/messages/${editingItem.id}`;
    else if (activeTab === 'portfolio') endpoint = `/api/admin/portfolio/${editingItem.id}`;

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        triggerAlert('Record modified successfully.');
        setEditingItem(null);
        fetchAllData();
      } else {
        // Fallback update for client-only sandbox
        updateStateLocally();
      }
    } catch (err) {
      updateStateLocally();
    }
  };

  const updateStateLocally = () => {
    if (activeTab === 'orders') {
      setOrders(orders.map(o => o.id === editingItem.id ? editingItem : o));
    } else if (activeTab === 'samples') {
      setSamples(samples.map(s => s.id === editingItem.id ? editingItem : s));
    } else if (activeTab === 'messages') {
      setMessages(messages.map(m => m.id === editingItem.id ? editingItem : m));
    } else if (activeTab === 'portfolio') {
      setPortfolio(portfolio.map(p => p.id === editingItem.id ? editingItem : p));
    }
    triggerAlert('Record modified in local state.');
    setEditingItem(null);
  };

  // 2. DELETE records
  const handleDeleteItem = async (id) => {
    if (!id) return;

    let endpoint = '';
    if (activeTab === 'orders') endpoint = `/api/admin/orders/${id}`;
    else if (activeTab === 'samples') endpoint = `/api/admin/samples/${id}`;
    else if (activeTab === 'messages') endpoint = `/api/admin/messages/${id}`;
    else if (activeTab === 'portfolio') endpoint = `/api/admin/portfolio/${id}`;

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
      if (res.ok) {
        triggerAlert('Record removed from database.');
        fetchAllData();
      } else {
        deleteStateLocally(id);
      }
    } catch (err) {
      deleteStateLocally(id);
    }
  };

  const deleteStateLocally = (id) => {
    if (activeTab === 'orders') setOrders(orders.filter(o => o.id !== id));
    else if (activeTab === 'samples') setSamples(samples.filter(s => s.id !== id));
    else if (activeTab === 'messages') setMessages(messages.filter(m => m.id !== id));
    else if (activeTab === 'portfolio') setPortfolio(portfolio.filter(p => p.id !== id));
    triggerAlert('Record removed from local workspace.');
  };

  // 3. CREATE Portfolio Item live
  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/admin/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPortfolio)
      });

      if (res.ok) {
        triggerAlert('New showcase item published in live portfolio.');
        setShowAddPortfolioModal(false);
        setNewPortfolio({ title: '', category: 'sarees', img: '', location: '', model: '', time: '' });
        fetchAllData();
      } else {
        createPortfolioLocally();
      }
    } catch (err) {
      createPortfolioLocally();
    }
  };

  const createPortfolioLocally = () => {
    const fallbackItem = { ...newPortfolio, id: Date.now() };
    setPortfolio([fallbackItem, ...portfolio]);
    triggerAlert('New showcase item added in local portfolio.');
    setShowAddPortfolioModal(false);
    setNewPortfolio({ title: '', category: 'sarees', img: '', location: '', model: '', time: '' });
  };

  // Statistics summaries
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const pendingSamples = samples.filter(s => s.status !== 'Rendered & Sent').length;
  const activeOrders = orders.filter(o => o.status !== 'Completed').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4 relative pt-10">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gold-600/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-white/5 blur-[100px] pointer-events-none" />

        <div className="max-w-md w-full glass-panel-gold border border-gold-500/20 p-8 rounded-sm shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="p-3 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-full w-fit mx-auto mb-4">
              <Lock className="w-6 h-6 text-gold-400" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-white tracking-wide">
              Studio Director Login
            </h2>
            <p className="font-sans font-light text-dark-400 text-xs mt-1 uppercase tracking-widest">
              AI Fashion Studio secure console
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="e.g. admin"
                className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-medium text-white/80 uppercase tracking-widest mb-2">
                Security Password
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 text-xs font-light text-red-400 bg-red-400/5 p-3 rounded-sm border border-red-500/20">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 rounded-sm transition-all duration-300 shadow-md shadow-gold-500/10 cursor-pointer text-center"
            >
              Access Command Console
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-[10px] text-dark-500 uppercase tracking-widest">
              Demo Credentials: <strong className="text-white/60">admin</strong> / <strong className="text-white/60">admin123</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-x-hidden bg-[#050507]">

      {/* Alert Overlay Banner */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-sm shadow-2xl border text-sm font-medium flex items-center gap-3 ${alert.type === 'success'
              ? 'bg-dark-950 border-gold-500/40 text-gold-400 glow-gold'
              : 'bg-dark-950 border-red-500/40 text-red-400'
              }`}
          >
            {alert.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Console */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-5 h-5 text-gold-400" />
              <span className="font-display font-medium text-xs text-gold-400 uppercase tracking-widest">Studio Workspace</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white font-medium mt-1">
              Command Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={isLoading}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/50 text-white rounded-sm text-xs font-display tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-gold-400' : ''}`} />
              <span>Refresh GPU Logs</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 hover:border-red-500/40 text-red-400 rounded-sm text-xs font-display tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="glass-panel p-6 rounded-sm border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-xs text-dark-400 uppercase tracking-widest">Calculated Revenue</span>
              <DollarSign className="w-5 h-5 text-gold-500" />
            </div>
            <div className="font-display font-bold text-2xl text-white">₹{totalRevenue}</div>
            <div className="font-sans text-[10px] text-gold-500/80 mt-1 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-gold-400" />
              <span>Project sales in memory</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-sm border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-xs text-dark-400 uppercase tracking-widest">Active Bulk Projects</span>
              <ShoppingBag className="w-5 h-5 text-gold-500" />
            </div>
            <div className="font-display font-bold text-2xl text-white">{activeOrders}</div>
            <div className="font-sans text-[10px] text-dark-400 mt-1 uppercase tracking-widest">
              Fabric drapes processing
            </div>
          </div>

          <div className="glass-panel p-6 rounded-sm border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-xs text-dark-400 uppercase tracking-widest">Pending Free Samples</span>
              <Gift className="w-5 h-5 text-gold-500" />
            </div>
            <div className="font-display font-bold text-2xl text-white">{pendingSamples}</div>
            <div className="font-sans text-[10px] text-dark-400 mt-1 uppercase tracking-widest">
              Queued draft tasks
            </div>
          </div>

          <div className="glass-panel p-6 rounded-sm border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-xs text-dark-400 uppercase tracking-widest">GPU Server Node</span>
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div className="font-display font-bold text-2xl text-emerald-400">98.4%</div>
            <div className="font-sans text-[10px] text-dark-500 mt-1 uppercase tracking-widest">
              GPU Rendering Load Online
            </div>
          </div>

        </div>

        {/* Tab Switcher Console */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-8 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'orders', label: 'Bulk Orders', count: orders.length, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'samples', label: 'Free Samples', count: samples.length, icon: <Gift className="w-4 h-4" /> },
            { id: 'messages', label: 'Contact Inbox', count: messages.length, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'portfolio', label: 'Live Showroom', count: portfolio.length, icon: <Image className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-sm text-xs font-display tracking-widest uppercase transition-all duration-350 cursor-pointer flex items-center gap-2 border ${activeTab === tab.id
                ? 'bg-gold-500 border-gold-500 text-dark-950 font-semibold shadow-md'
                : 'border-white/5 hover:border-white/20 text-white/80'
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-dark-950 text-gold-400 font-bold' : 'bg-white/5 text-dark-300'
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Contents lists */}
        <div className="glass-panel rounded-sm border border-white/5 overflow-hidden">

          {/* TAB 1: BULK ORDERS */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/2 font-display text-xs text-white uppercase tracking-wider">
                    <th className="p-5 font-semibold">Order ID</th>
                    <th className="p-5 font-semibold">Client / Brand</th>
                    <th className="p-5 font-semibold">Specifications</th>
                    <th className="p-5 font-semibold">Calculated Tariff</th>
                    <th className="p-5 font-semibold">GPU Pipeline Stage</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-sm text-dark-300">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-10 text-center font-light text-dark-400">No active bulk projects.</td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id} className="hover:bg-white/1">
                        <td className="p-5 font-display font-medium text-white">{o.id}</td>
                        <td className="p-5">
                          <strong className="text-white block font-medium">{o.name}</strong>
                          <span className="text-dark-400 text-xs block font-light">{o.brand} • {o.whatsapp}</span>
                        </td>
                        <td className="p-5">
                          <span className="text-gold-400 font-medium block">{o.category}</span>
                          <span className="text-dark-400 text-xs block font-light max-w-xs truncate">{o.background} • {o.modelType}</span>
                        </td>
                        <td className="p-5 text-white font-medium">₹{o.price || 299}</td>
                        <td className="p-5">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider ${o.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : o.status === 'Analyzing Fabric Meshes'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                            }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-5 text-right space-x-2">
                          <button
                            onClick={() => setEditingItem(o)}
                            className="p-2 bg-white/5 border border-white/10 hover:border-gold-500 text-white hover:text-gold-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(o.id)}
                            className="p-2 bg-red-950/20 border border-red-500/10 hover:border-red-500/40 text-red-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: FREE SAMPLES */}
          {activeTab === 'samples' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/2 font-display text-xs text-white uppercase tracking-wider">
                    <th className="p-5 font-semibold">Sample ID</th>
                    <th className="p-5 font-semibold">Boutique / Representative</th>
                    <th className="p-5 font-semibold">Visual Segment</th>
                    <th className="p-5 font-semibold">Original Asset File</th>
                    <th className="p-5 font-semibold">GPU Pipeline Stage</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-sm text-dark-300">
                  {samples.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-10 text-center font-light text-dark-400">No active free sample submissions.</td>
                    </tr>
                  ) : (
                    samples.map((s) => (
                      <tr key={s.id} className="hover:bg-white/1">
                        <td className="p-5 font-display font-medium text-white">{s.id}</td>
                        <td className="p-5">
                          <strong className="text-white block font-medium">{s.name}</strong>
                          <span className="text-dark-400 text-xs block font-light">{s.brand} • {s.whatsapp}</span>
                        </td>
                        <td className="p-5 text-gold-400 font-medium">{s.category}</td>
                        <td className="p-5 text-dark-300 text-xs font-light max-w-xs truncate">{s.fileName}</td>
                        <td className="p-5">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider ${s.status === 'Rendered & Sent'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                            }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-5 text-right space-x-2">
                          <button
                            onClick={() => setEditingItem(s)}
                            className="p-2 bg-white/5 border border-white/10 hover:border-gold-500 text-white hover:text-gold-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(s.id)}
                            className="p-2 bg-red-950/20 border border-red-500/10 hover:border-red-500/40 text-red-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: CONTACT INBOX */}
          {activeTab === 'messages' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/2 font-display text-xs text-white uppercase tracking-wider">
                    <th className="p-5 font-semibold">Message ID</th>
                    <th className="p-5 font-semibold">Representative</th>
                    <th className="p-5 font-semibold">Inquiry Message</th>
                    <th className="p-5 font-semibold">Stage Status</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-sm text-dark-300">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-10 text-center font-light text-dark-400">No customer support entries.</td>
                    </tr>
                  ) : (
                    messages.map((m) => (
                      <tr key={m.id} className="hover:bg-white/1">
                        <td className="p-5 font-display font-medium text-white">{m.id}</td>
                        <td className="p-5">
                          <strong className="text-white block font-medium">{m.name}</strong>
                          <span className="text-dark-400 text-xs block font-light">{m.email} • {m.whatsapp}</span>
                        </td>
                        <td className="p-5 max-w-sm">
                          <p className="font-sans font-light text-xs text-dark-200 leading-relaxed truncate group-hover:text-clip hover:text-white" title={m.message}>
                            {m.message}
                          </p>
                        </td>
                        <td className="p-5">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider ${m.status === 'Replied'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : m.status === 'Active Review'
                              ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                              : 'bg-white/5 text-dark-400 border border-white/10'
                            }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="p-5 text-right space-x-2">
                          <button
                            onClick={() => setEditingItem(m)}
                            className="p-2 bg-white/5 border border-white/10 hover:border-gold-500 text-white hover:text-gold-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(m.id)}
                            className="p-2 bg-red-950/20 border border-red-500/10 hover:border-red-500/40 text-red-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: LIVE SHOWROOM */}
          {activeTab === 'portfolio' && (
            <div>
              <div className="p-4 bg-white/2 border-b border-white/10 flex justify-between items-center">
                <span className="font-display font-medium text-xs text-white uppercase tracking-wider">Showroom Showcase Items</span>
                <button
                  onClick={() => setShowAddPortfolioModal(true)}
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-dark-950 rounded-sm text-xs font-display font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md shadow-gold-500/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Saree</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/2 font-display text-xs text-white uppercase tracking-wider">
                      <th className="p-5 font-semibold">Visual</th>
                      <th className="p-5 font-semibold">Collection Title</th>
                      <th className="p-5 font-semibold">Ethnic Segment</th>
                      <th className="p-5 font-semibold">Scene & Avatar Params</th>
                      <th className="p-5 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-sm text-dark-300">
                    {portfolio.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-10 text-center font-light text-dark-400">Showcase showroom is currently empty.</td>
                      </tr>
                    ) : (
                      portfolio.map((p) => (
                        <tr key={p.id} className="hover:bg-white/1">
                          <td className="p-5">
                            <img
                              src={p.img}
                              alt={p.title}
                              className="w-12 h-16 object-cover rounded-sm border border-white/10"
                            />
                          </td>
                          <td className="p-5">
                            <strong className="text-white font-medium">{p.title}</strong>
                          </td>
                          <td className="p-5">
                            <span className="text-gold-400 font-display text-xs uppercase tracking-widest font-semibold">{p.category}</span>
                          </td>
                          <td className="p-5">
                            <span className="text-white block">{p.location}</span>
                            <span className="text-dark-400 text-xs block font-light">{p.model} • {p.time}</span>
                          </td>
                          <td className="p-5 text-right space-x-2">
                            <button
                              onClick={() => setEditingItem(p)}
                              className="p-2 bg-white/5 border border-white/10 hover:border-gold-500 text-white hover:text-gold-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingId(p.id)}
                              className="p-2 bg-red-950/20 border border-red-500/10 hover:border-red-500/40 text-red-400 rounded-sm transition-colors cursor-pointer inline-flex items-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* CRUD 1: EDIT ITEM POPUP MODAL (Glassmorphic form) */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-dark-950/90 flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg w-full glass-panel-gold border border-gold-500/30 p-8 rounded-sm shadow-2xl relative"
            >
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-4 right-4 bg-white/5 border border-white/10 hover:border-gold-500/50 p-2 rounded-full text-white hover:text-gold-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-2xl text-white mb-6 border-b border-white/5 pb-3">
                Modify Record Spec
              </h3>

              <form onSubmit={handleUpdateItem} className="space-y-5">

                {/* FIELDS DYNAMIC RENDER FOR ORDERS */}
                {activeTab === 'orders' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Client Name</label>
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Brand / Shop</label>
                        <input
                          type="text"
                          value={editingItem.brand}
                          onChange={(e) => setEditingItem({ ...editingItem, brand: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">WhatsApp Contact</label>
                      <input
                        type="text"
                        value={editingItem.whatsapp}
                        onChange={(e) => setEditingItem({ ...editingItem, whatsapp: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Tariff (INR)</label>
                        <input
                          type="number"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({ ...editingItem, price: parseInt(e.target.value) })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">GPU Status Stage</label>
                        <select
                          value={editingItem.status}
                          onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white/80 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans cursor-pointer"
                        >
                          <option>Analyzing Fabric Meshes</option>
                          <option>Generating Model Shadows</option>
                          <option>4K Rendering Active</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* FIELDS DYNAMIC RENDER FOR FREE SAMPLES */}
                {activeTab === 'samples' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Boutique Representative</label>
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Brand / Shop</label>
                        <input
                          type="text"
                          value={editingItem.brand}
                          onChange={(e) => setEditingItem({ ...editingItem, brand: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">WhatsApp Contact</label>
                      <input
                        type="text"
                        value={editingItem.whatsapp}
                        onChange={(e) => setEditingItem({ ...editingItem, whatsapp: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Category</label>
                        <input
                          type="text"
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">GPU Status Stage</label>
                        <select
                          value={editingItem.status}
                          onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white/80 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans cursor-pointer"
                        >
                          <option>Queued in GPUs</option>
                          <option>Generating Model Shadows</option>
                          <option>Rendered & Sent</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* FIELDS DYNAMIC RENDER FOR CONTACT MESSAGES */}
                {activeTab === 'messages' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Email Support</label>
                        <input
                          type="email"
                          value={editingItem.email}
                          onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">WhatsApp Contact</label>
                      <input
                        type="text"
                        value={editingItem.whatsapp}
                        onChange={(e) => setEditingItem({ ...editingItem, whatsapp: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Resolution Status</label>
                      <select
                        value={editingItem.status}
                        onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 text-white/80 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans cursor-pointer"
                      >
                        <option>Unassigned</option>
                        <option>Active Review</option>
                        <option>Replied</option>
                      </select>
                    </div>
                  </>
                )}

                {/* FIELDS DYNAMIC RENDER FOR PORTFOLIO */}
                {activeTab === 'portfolio' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Collection Title</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Ethnic Segment</label>
                        <select
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white/80 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans cursor-pointer"
                        >
                          <option value="sarees">Saree</option>
                          <option value="lehengas">Lehenga</option>
                          <option value="kurtis">Kurti</option>
                          <option value="jewelry">Jewelry</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Scene Location</label>
                        <input
                          type="text"
                          value={editingItem.location}
                          onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Model Archetype</label>
                        <input
                          type="text"
                          value={editingItem.model}
                          onChange={(e) => setEditingItem({ ...editingItem, model: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Lighting Theme</label>
                        <input
                          type="text"
                          value={editingItem.time}
                          onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Image Asset URL</label>
                      <input
                        type="text"
                        value={editingItem.img}
                        onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 rounded-sm transition-all duration-300 shadow-md shadow-gold-500/10 cursor-pointer text-center"
                >
                  Save Specification Modifications
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CRUD 2: ADD NEW SHOWROOM ITEM MODAL (Portfolio upload) */}
      <AnimatePresence>
        {showAddPortfolioModal && (
          <div className="fixed inset-0 z-50 bg-dark-950/90 flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg w-full glass-panel-gold border border-gold-500/30 p-8 rounded-sm shadow-2xl relative"
            >
              <button
                onClick={() => setShowAddPortfolioModal(false)}
                className="absolute top-4 right-4 bg-white/5 border border-white/10 hover:border-gold-500/50 p-2 rounded-full text-white hover:text-gold-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-2xl text-white mb-6 border-b border-white/5 pb-3">
                Publish Showcase Saree
              </h3>

              <form onSubmit={handleAddPortfolio} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Collection Title</label>
                  <input
                    type="text"
                    required
                    value={newPortfolio.title}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                    placeholder="e.g. Royal Wedding Kanjeevaram"
                    className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Ethnic Segment</label>
                    <select
                      value={newPortfolio.category}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 text-white/80 rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans cursor-pointer"
                    >
                      <option value="sarees">Saree</option>
                      <option value="lehengas">Lehenga</option>
                      <option value="kurtis">Kurti</option>
                      <option value="jewelry">Jewelry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Scene Location</label>
                    <input
                      type="text"
                      required
                      value={newPortfolio.location}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, location: e.target.value })}
                      placeholder="e.g. Royal Haveli, Jaipur"
                      className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Model Archetype</label>
                    <input
                      type="text"
                      required
                      value={newPortfolio.model}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, model: e.target.value })}
                      placeholder="e.g. Classic South Indian"
                      className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Lighting Theme</label>
                    <input
                      type="text"
                      required
                      value={newPortfolio.time}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, time: e.target.value })}
                      placeholder="e.g. Warm Golden Hour"
                      className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-display font-medium text-white/70 uppercase tracking-widest mb-1.5">Showcase Image URL</label>
                  <input
                    type="text"
                    required
                    value={newPortfolio.img}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, img: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-dark-950 border border-white/10 text-white rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-gold-500 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 rounded-sm transition-all duration-300 shadow-md shadow-gold-500/10 cursor-pointer text-center"
                >
                  Publish Live Showcase
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CRUD 2: PREMIUM DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 bg-dark-950/90 flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full glass-panel-gold border border-gold-500/30 p-8 rounded-sm shadow-2xl relative text-center"
            >
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full w-fit mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl text-white mb-2">
                Confirm Record Discard
              </h3>

              <p className="font-sans font-light text-dark-300 text-sm mb-8 leading-relaxed">
                Are you sure you want to permanently discard this record? This action will remove the record from active databases immediately and cannot be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display text-xs tracking-widest uppercase py-3.5 rounded-sm transition-colors cursor-pointer"
                >
                  No, Preserve
                </button>
                <button
                  onClick={() => {
                    handleDeleteItem(deletingId);
                    setDeletingId(null);
                  }}
                  className="flex-1 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 font-display font-semibold text-xs tracking-widest uppercase py-3.5 rounded-sm transition-colors cursor-pointer shadow-lg shadow-red-500/5"
                >
                  Yes, Discard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
