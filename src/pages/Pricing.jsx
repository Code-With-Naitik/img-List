import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, ShieldCheck, Zap, Sparkles, Building, Settings } from 'lucide-react';

const Pricing = ({ setCurrentPage }) => {
  const [billingCycle, setBillingCycle] = useState('bulk'); // 'bulk' or 'subscription'

  const plans = {
    bulk: [
      {
        name: 'Starter Trial',
        price: '₹299',
        period: '3 Images',
        desc: 'Ideal for small boutiques starting out on online marketplaces.',
        popular: false,
        features: [
          '3 Premium AI Model renders',
          'Access to 5 standard studio backdrops',
          'HD resolution (1080p) download',
          'Standard 48-hour delivery timeline',
          'Basic fabric texture preservation',
          'Watermark-free commercial rights'
        ],
        btnText: 'Start Starter Trial',
        action: () => setCurrentPage('order')
      },
      {
        name: 'Growth Bundle',
        price: '₹999',
        period: '10 Images',
        desc: 'Perfect for monthly catalogue launches on social media.',
        popular: true,
        features: [
          '10 Premium AI Model renders',
          'Access to 25 luxury outdoor backdrops',
          '4K Ultra HD resolution downloads',
          'Fast-track 24-hour priority delivery',
          '100% exact textile weave preservation',
          'Multi-angle shoots (Front, Back, Side)',
          'Free social media aspect ratios'
        ],
        btnText: 'Purchase Growth Bundle',
        action: () => setCurrentPage('order')
      },
      {
        name: 'Catalog Master',
        price: '₹2999',
        period: '35 Images',
        desc: 'Designed for scaled launches and professional retailers.',
        popular: false,
        features: [
          '35 Premium AI Model renders',
          'Access to all premium festive backdrops',
          '4K Ultra HD + lossless source files',
          'Express 12-hour super-fast delivery',
          'Hyper-fidelity details mapping',
          'Custom brand watermark positioning',
          'Dedicate project manager support'
        ],
        btnText: 'Launch Catalog Master',
        action: () => setCurrentPage('order')
      }
    ],
    subscription: [
      {
        name: 'Boutique Pro',
        price: '₹2,499',
        period: 'month',
        desc: 'For growing boutiques listing new items weekly.',
        popular: false,
        features: [
          '30 AI Model photos included / mo',
          'All luxury backdrops unlocked',
          '4K Ultra HD downloads',
          '24-hour turnaround warranty',
          '100% fabric design guarantee',
          'Unused credits roll over (max 15)',
          'Standard priority chat support'
        ],
        btnText: 'Subscribe to Boutique Pro',
        action: () => setCurrentPage('order')
      },
      {
        name: 'Retail Powerhouse',
        price: '₹6,999',
        period: 'month',
        desc: 'For high-volume ethnic brands with active marketing.',
        popular: true,
        features: [
          '100 AI Model photos included / mo',
          'All luxury + festive backdrops unlocked',
          '4K Ultra HD + RAW file access',
          'Priority 12-hour turnaround guarantee',
          '100% fabric design guarantee',
          'Unused credits roll over (max 50)',
          'Instant WhatsApp support manager',
          'Bulk custom face archetypes training'
        ],
        btnText: 'Subscribe to Retail Power',
        action: () => setCurrentPage('order')
      },
      {
        name: 'Couture Enterprise',
        price: '₹14,999',
        period: 'month',
        desc: 'For designers requiring unique models and exclusive locations.',
        popular: false,
        features: [
          '250 AI Model photos included / mo',
          'Exclusive backgrounds not shared with others',
          'Hyper-fidelity 8K render files',
          'Express 6-hour delivery guarantee',
          'Exclusive custom trained model face',
          'Unlimited credits rollover',
          'API integration for automated cataloging',
          'Dedicated Art Director consultation'
        ],
        btnText: 'Launch Couture Elite',
        action: () => setCurrentPage('order')
      }
    ]
  };

  const comparisonFeatures = [
    { name: 'Photos Count', starter: '3 per project', growth: '10 per project', catalog: '35 per project' },
    { name: 'Resolution', starter: 'HD (1080p)', growth: '4K Ultra HD', catalog: '4K Ultra HD + RAW' },
    { name: 'Turnaround Time', starter: '48 Hours', growth: '24 Hours', catalog: '12 Hours' },
    { name: 'Fabric Design Match', starter: 'High Fidelity', growth: 'Exact (100% Constraint)', catalog: 'Exact (100% Constraint)' },
    { name: 'Backdrop Access', starter: '5 Studio Backdrops', growth: '25 Luxury Locations', catalog: 'All Unlocked + Festive' },
    { name: 'Model Archetypes', starter: 'Standard Faces', growth: 'Premium Cast (Aesthetic)', catalog: 'Exclusive Faces' },
    { name: 'Watermark-Free', starter: 'Yes', growth: 'Yes', catalog: 'Yes' },
    { name: 'Support', starter: 'Email Support', growth: 'Priority Chat', catalog: 'Dedicated WhatsApp Manager' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-x-hidden">
      
      {/* Dynamic light sources */}
      <div className="absolute top-40 left-1/4 w-[350px] h-[350px] bg-gold-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-white/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="font-display font-medium text-xs text-white/90 uppercase tracking-[0.2em]">
              Flexible Studio Tariffs
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Transparent Pricing <br />
            <span className="text-gold-500 italic">For All Fashion Scales</span>
          </h1>
          
          <p className="font-sans font-light text-dark-400 text-base md:text-lg max-w-xl mx-auto">
            Save thousands in agency costs. Pay exactly for what your brand requires, with zero monthly commitments or flexible subscriptions.
          </p>

          {/* Pricing Toggle Button */}
          <div className="inline-flex p-1.5 rounded-full bg-dark-950/60 border border-white/10 mt-10">
            <button
              onClick={() => setBillingCycle('bulk')}
              className={`px-6 py-2.5 rounded-full text-xs font-display tracking-widest uppercase transition-all duration-350 cursor-pointer ${
                billingCycle === 'bulk'
                  ? 'bg-gold-500 text-dark-950 font-semibold'
                  : 'text-white hover:text-gold-400'
              }`}
            >
              Pay Per Project
            </button>
            <button
              onClick={() => setBillingCycle('subscription')}
              className={`px-6 py-2.5 rounded-full text-xs font-display tracking-widest uppercase transition-all duration-350 cursor-pointer ${
                billingCycle === 'subscription'
                  ? 'bg-gold-500 text-dark-950 font-semibold'
                  : 'text-white hover:text-gold-400'
              }`}
            >
              Monthly Subscription
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-24">
          {plans[billingCycle].map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-sm p-8 transition-all duration-300 relative ${
                plan.popular 
                  ? 'bg-dark-950 border-2 border-gold-500/80 shadow-[0_0_40px_-5px_rgba(212,167,28,0.15)] scale-100 lg:scale-105 z-10' 
                  : 'bg-dark-950/40 border border-white/5 hover:border-gold-500/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-dark-950 font-display text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  MOST POPULAR Choice
                </div>
              )}

              <div>
                <h3 className="font-display font-medium text-base text-white/90 uppercase tracking-widest mb-3">
                  {plan.name}
                </h3>
                <p className="font-sans font-light text-dark-400 text-xs leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display font-bold text-4xl text-white">{plan.price}</span>
                  <span className="font-sans text-xs text-dark-400 font-light">
                    / {billingCycle === 'bulk' ? plan.period : `month`}
                  </span>
                </div>

                {billingCycle === 'subscription' && (
                  <p className="font-display font-medium text-xs text-gold-400 mb-8 uppercase tracking-widest">
                    Billing recurs monthly
                  </p>
                )}
                {billingCycle === 'bulk' && (
                  <p className="font-display font-medium text-xs text-gold-400 mb-8 uppercase tracking-widest">
                    {plan.period} included
                  </p>
                )}

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-light text-dark-300">
                      <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={plan.action}
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

        {/* Detailed Comparison Table (Pay-per-shoot focused) */}
        {billingCycle === 'bulk' && (
          <div className="mt-20 hidden md:block max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-12">
              Compare Features Side-by-Side
            </h2>
            
            <div className="glass-panel rounded-sm border border-white/10 overflow-hidden">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/2">
                    <th className="p-6 font-display font-medium text-sm text-white uppercase tracking-wider">Features</th>
                    <th className="p-6 font-display font-medium text-sm text-gold-500 uppercase tracking-wider">Starter Trial</th>
                    <th className="p-6 font-display font-medium text-sm text-gold-500 uppercase tracking-wider bg-gold-500/5">Growth Bundle</th>
                    <th className="p-6 font-display font-medium text-sm text-gold-500 uppercase tracking-wider">Catalog Master</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans font-light text-sm text-dark-300">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/1">
                      <td className="p-6 font-medium text-white">{row.name}</td>
                      <td className="p-6">{row.starter}</td>
                      <td className="p-6 bg-gold-500/2 text-white font-normal">{row.growth}</td>
                      <td className="p-6">{row.catalog}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enterprise & Custom integrations */}
        <div className="mt-24 bg-gradient-to-r from-dark-950 via-dark-900/60 to-dark-950 border border-white/5 rounded-sm p-10 md:p-14 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none">
            <Building className="w-96 h-96 text-white" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center relative z-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-display font-medium text-xs text-gold-400 uppercase tracking-widest">
                  Custom Studio Training
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 leading-tight">
                Need Custom Brand Avatars or API Integrations?
              </h3>
              <p className="font-sans font-light text-dark-400 text-sm leading-relaxed max-w-2xl">
                We train exclusive AI model assets solely using faces under your contract, matching specific heights, locations, or studio setups. Automate massive daily cataloging pipelines with our low-latency Rest APIs.
              </p>
            </div>
            
            <div className="text-left lg:text-right">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full lg:w-auto bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 px-8 rounded-sm shadow-md transition-all cursor-pointer flex items-center justify-center lg:inline-flex gap-2"
              >
                <span>Talk to Art Directors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
