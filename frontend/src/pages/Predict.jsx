import { useState } from 'react';
import { Users, Heart, DollarSign, Target, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

const niches = [
  { value: '', label: 'Select Niche', disabled: true },
  { value: 'Fashion', label: 'Fashion & Lifestyle' },
  { value: 'Tech', label: 'Technology & Gadgets' },
  { value: 'Fitness', label: 'Health & Fitness' },
  { value: 'Food', label: 'Food & Culinary' },
  { value: 'Travel', label: 'Travel & Adventure' },
  { value: 'Education', label: 'Education & Learning' },
];

const goals = [
  { value: '', label: 'Select Goal', disabled: true },
  { value: 'Awareness', label: 'Brand Awareness' },
  { value: 'Engagement', label: 'Community Engagement' },
  { value: 'Conversion', label: 'Lead Conversion' },
  { value: 'Sales', label: 'Direct Sales' },
];

export default function Predict({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    followers: '',
    engagement: '',
    budget: '',
    niche: '',
    goal: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.followers || formData.followers < 1) {
      newErrors.followers = 'Enter valid follower count';
    }
    if (!formData.engagement || formData.engagement < 1) {
      newErrors.engagement = 'Enter valid engagement number';
    }
    if (!formData.budget || formData.budget < 1) {
      newErrors.budget = 'Enter valid budget';
    }
    if (!formData.niche) newErrors.niche = 'Select a niche';
    if (!formData.goal) newErrors.goal = 'Select a goal';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClass = (field) => `
    w-full h-14 bg-slate-50 dark:bg-slate-800/50
    border ${errors[field] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}
    rounded-xl px-4 pl-12
    focus:ring-2 focus:ring-primary focus:border-transparent
    transition-all outline-none
    text-slate-900 dark:text-white text-base
  `;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Campaign Prediction</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Predict Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              {' '}Campaign ROI
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Enter your influencer campaign details and our AI models will predict your expected returns,
            risk level, and provide actionable recommendations.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-slate-100 dark:bg-slate-900 h-2">
            <div className="h-full bg-gradient-to-r from-primary to-purple-500 w-1/3 rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Followers Input */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                  Followers Count
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="followers"
                    value={formData.followers}
                    onChange={handleChange}
                    placeholder="e.g. 500000"
                    className={inputClass('followers')}
                    min="1"
                  />
                </div>
                {errors.followers && (
                  <p className="text-red-500 text-sm">{errors.followers}</p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total reach across all platforms
                </p>
              </div>

              {/* Engagement Input */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                  Total Engagement
                </label>
                <div className="relative">
                  <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="engagement"
                    value={formData.engagement}
                    onChange={handleChange}
                    placeholder="e.g. 25000"
                    className={inputClass('engagement')}
                    min="1"
                  />
                </div>
                {errors.engagement && (
                  <p className="text-red-500 text-sm">{errors.engagement}</p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Average likes + comments + shares per post
                </p>
              </div>

              {/* Budget Input */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                  Campaign Budget (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. 10000"
                    className={inputClass('budget')}
                    min="1"
                  />
                </div>
                {errors.budget && (
                  <p className="text-red-500 text-sm">{errors.budget}</p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total spend including talent fees and ad spend
                </p>
              </div>

              {/* Niche Select */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                  Influencer Niche
                </label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    className={`${inputClass('niche')} appearance-none cursor-pointer`}
                  >
                    {niches.map(niche => (
                      <option
                        key={niche.value}
                        value={niche.value}
                        disabled={niche.disabled}
                      >
                        {niche.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.niche && (
                  <p className="text-red-500 text-sm">{errors.niche}</p>
                )}
              </div>

              {/* Goal Select */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                  Brand Goal
                </label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className={`${inputClass('goal')} appearance-none cursor-pointer`}
                  >
                    {goals.map(goal => (
                      <option
                        key={goal.value}
                        value={goal.value}
                        disabled={goal.disabled}
                      >
                        {goal.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.goal && (
                  <p className="text-red-500 text-sm">{errors.goal}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full group bg-primary hover:bg-blue-700 disabled:bg-slate-400 text-white h-16 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Campaign...
                  < />
                ) : (
                  <>
                    Predict Campaign Success
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-4">
                By clicking predict, you agree to our Terms of Service and Data Policy.
              </p>
            </div>
          </form>

          {/* Info Cards */}
          <div className="grid grid-cols-3 border-t border-slate-200 dark:border-slate-700">
            <div className="p-6 text-center border-r border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-primary mb-1">95%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
            </div>
            <div className="p-6 text-center border-r border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-primary mb-1">&lt;2s</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Response Time</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-2xl font-black text-primary mb-1">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Free</div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-slate-400 dark:text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No Registration Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
