import { Users, Heart, DollarSign, Target, TrendingUp, ShieldCheck, Sparkles, Activity, BarChart3, PieChart, Zap, LineChart } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered ROI Prediction',
    description: 'Our Random Forest models analyze 10M+ data points to predict campaign returns with 95% accuracy.',
    color: 'bg-blue-500',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment Engine',
    description: 'Get a comprehensive risk score (0-100) based on engagement quality, cost efficiency, and predicted returns.',
    color: 'bg-amber-500',
  },
  {
    icon: PieChart,
    title: 'Niche Performance Analytics',
    description: 'Compare your campaign against industry benchmarks across 6 major niches: Fashion, Tech, Fitness, Food, Travel, Education.',
    color: 'bg-purple-500',
  },
  {
    icon: Activity,
    title: 'Real-time Campaign Insights',
    description: 'Instant predictions with actionable recommendations tailored to your brand goals: Awareness, Engagement, Conversion, or Sales.',
    color: 'bg-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Competitive Benchmarking',
    description: 'See how your metrics stack up against niche averages for ROI and engagement rates.',
    color: 'bg-rose-500',
  },
  {
    icon: Sparkles,
    title: 'AI Business Reports',
    description: 'Generate professional business justifications powered by Google Gemini AI for stakeholder presentations.',
    color: 'bg-indigo-500',
  },
];

const steps = [
  {
    number: '01',
    title: 'Input Campaign Data',
    description: 'Enter influencer metrics: followers, engagement rate, budget, and select your niche.',
  },
  {
    number: '02',
    title: 'Get ML Predictions',
    description: 'Our trained models instantly calculate expected ROI, conversion probability, and risk score.',
  },
  {
    number: '03',
    title: 'Receive Actionable Insights',
    description: 'Get AI-generated business recommendations and compare against industry benchmarks.',
  },
];

const testimonials = [
  {
    quote: "InfluenceAI helped us increase our campaign ROI by 40%. The risk assessment alone saved us from a bad $50K investment.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "Velocity Digital",
    avatar: "SC"
  },
  {
    quote: "The niche benchmarking feature is a game-changer. We now know exactly which influencer categories deliver the best returns.",
    author: "Marcus Johnson",
    role: "Head of Growth",
    company: "Nexus Brands",
    avatar: "MJ"
  },
  {
    quote: "Finally, a tool that speaks the language of marketing analytics. The AI business reports are impressively accurate.",
    author: "Elena Rodriguez",
    role: "CMO",
    company: "Zenith Media",
    avatar: "ER"
  },
];

export default function Home({ onStart }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Machine Learning</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              Predict Campaign Success
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                with AI Precision
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Machine learning-powered ROI prediction for influencer marketing.
              Know your return before you invest a single dollar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={onStart}
                className="group px-8 py-4 bg-primary hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
              >
                Start Predicting
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors">
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">10M+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">95%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">6</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Niche Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">500+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Brands Trust Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Trusted by marketing teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200">VELOCITY</span>
            <span className="text-2xl font-black tracking-tighter italic text-slate-800 dark:text-slate-200">NEXUS</span>
            <span className="text-2xl font-bold uppercase text-slate-800 dark:text-slate-200">Zenith</span>
            <span className="text-2xl font-black tracking-widest text-slate-800 dark:text-slate-200">AETHER</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Everything You Need to
              <span className="text-primary"> Optimize Campaigns</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful AI-driven tools designed to maximize your influencer marketing returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Three Steps to
              <span className="text-primary"> Smarter Campaigns</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="text-center">
                  <div className="text-6xl font-black text-primary/10 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Loved by Marketing Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAzMGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptLTE4LTI0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0wIDMwYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0zNi0xNWMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAzMGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to Optimize Your Campaigns?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join 500+ marketing teams using InfluenceAI to make data-driven decisions and maximize ROI.
              </p>
              <button
                onClick={onStart}
                className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-blue-50 transition-colors shadow-xl"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LineChart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">InfluenceAI</span>
            </div>
            <div className="flex gap-8 text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="text-slate-500 text-sm">
              © 2025 InfluenceAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
