import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Target,
  Users,
  Heart,
  DollarSign,
  PieChart,
  Activity,
  BarChart3,
  Download,
  Share2,
  ChevronLeft,
  Zap,
  ShieldCheck,
  Info,
  RefreshCcw,
} from 'lucide-react';

const getRiskColor = (level) => {
  switch (level) {
    case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    case 'High': return 'text-red-500 bg-red-500/10 border-red-500/30';
    default: return 'text-slate-500 bg-slate-500/10 border-slate-500/30';
  }
};

const getConversionColor = (cls) => {
  switch (cls) {
    case 'High': return 'text-emerald-500';
    case 'Medium': return 'text-amber-500';
    case 'Low': return 'text-red-500';
    default: return 'text-slate-500';
  }
};

const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700
      ${onClick ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''}`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
      <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
      {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

const ProgressBar = ({ value, colorClass }) => (
  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
      style={{ width: `${Math.min(value, 100)}%` }}
    />
  </div>
);

const SimpleBarChart = ({ data, labels, userValue, average }) => {
  const maxVal = Math.max(...data, userValue, average);
  return (
    <div className="space-y-4">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-4">
          <div className="w-20 text-xs text-slate-500 dark:text-slate-400 text-right">{label}</div>
          <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
            <div
              className="h-full bg-primary rounded-lg flex items-center justify-end px-2 transition-all duration-1000"
              style={{ width: `${(data[i] / maxVal) * 100}%` }}
            >
              {data[i] > maxVal * 0.15 && (
                <span className="text-xs font-bold text-white">{data[i].toFixed(1)}%</span>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="w-20 text-xs font-bold text-slate-700 dark:text-slate-300 text-right">You</div>
        <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-end px-2"
            style={{ width: `${(userValue / maxVal) * 100}%` }}
          >
            <span className="text-xs font-bold text-white">{userValue.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RiskGauge = ({ score, level }) => {
  const getColor = () => {
    if (score <= 33) return 'text-emerald-500';
    if (score <= 66) return 'text-amber-500';
    return 'text-red-500';
  };

  const getGradient = () => {
    if (score <= 33) return 'from-emerald-500 to-emerald-400';
    if (score <= 66) return 'from-amber-500 to-amber-400';
    return 'from-red-500 to-red-400';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="50"
            x2={50 + 35 * Math.cos(Math.PI - (score / 100) * Math.PI)}
            y2={50 - 35 * Math.sin(Math.PI - (score / 100) * Math.PI)}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={getColor()}
          />
          <circle
            cx="50"
            cy="50"
            r="5"
            className={getColor()}
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="text-center -mt-2">
        <div className={`text-4xl font-black ${getColor()}`}>{score}</div>
        <div className={`text-sm font-bold uppercase tracking-wider mt-1 ${getColor()}`}>{level} Risk</div>
      </div>
    </div>
  );
};

export default function Dashboard({ result, onBack, onNewPrediction }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showInfo, setShowInfo] = useState(null);

  if (!result) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `campaign-analysis-${Date.now()}.json`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Campaign Analysis Results',
          text: `Predicted ROI: ${result.roi}% | Risk: ${result.risk_level}`,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const roiTrend = result.roi > result.niche_avg_roi ? 12 : -8;
  const engagementTrend = result.eng_ratio > result.niche_avg_eng ? 15 : -5;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Marketing Analytics Dashboard</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Campaign Analysis Report</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* ROI Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              {result.roi > result.niche_avg_roi ? (
                <div className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                  <TrendingUp className="w-4 h-4" />
                  Above Average
                </div>
              ) : (
                <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                  <TrendingDown className="w-4 h-4" />
                  Below Average
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Expected ROI</p>
              <p className={`text-3xl font-black ${result.roi >= 0 ? 'text-slate-900 dark:text-white' : 'text-red-500'}`}>
                {result.roi}%
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Niche avg: {result.niche_avg_roi}% | Est. Return: ${(result.budget * result.roi / 100).toLocaleString(undefined, {maximumFractionDigits: 0})}
              </p>
            </div>
          </div>

          {/* Conversion Class Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getConversionColor(result.conversion_class)} bg-opacity-10`}>
                {result.conversion_class}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Conversion Class</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{result.conversion_class} Potential</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Based on ML model analysis</p>
            </div>
          </div>

          {/* Risk Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <RiskGauge score={result.risk_score} level={result.risk_level} />
          </div>

          {/* Recommended Action Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Recommended Action</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{result.recommended_action}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Tailored to your {result.goal} goal</p>
            </div>
          </div>
        </div>

        {/* AI Insights + Niche Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Business Interpretation */}
          <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Business Interpretation</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Google Gemini</p>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                {result.justification}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Niche: {result.niche}
              </div>
              <div className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Goal: {result.goal}
              </div>
              <div className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Budget: ${Number(result.budget).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Niche Comparison */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Niche Comparison</h3>
              </div>
              <button
                onClick={() => setShowInfo(showInfo === 'niche' ? null : 'niche')}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Info className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {showInfo === 'niche' && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-blue-700 dark:text-blue-300">
                Comparing your predicted metrics against average performance in the {result.niche} niche.
              </div>
            )}

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">ROI Comparison</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                      Niche Avg: {result.niche_avg_roi}%
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      Your Predicted: {result.roi}%
                    </span>
                  </div>
                </div>
                <SimpleBarChart
                  data={[10, 15, result.niche_avg_roi]}
                  labels={['Food', 'Travel', result.niche]}
                  userValue={result.roi}
                  average={result.niche_avg_roi}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement Rate Comparison</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                      Niche Avg: {result.niche_avg_eng}%
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      Your Rate: {result.eng_ratio}%
                    </span>
                  </div>
                </div>
                <SimpleBarChart
                  data={[4, 5, result.niche_avg_eng]}
                  labels={['Tech', 'Fashion', result.niche]}
                  userValue={result.eng_ratio}
                  average={result.niche_avg_eng}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Campaign Metrics</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                <Users className="w-4 h-4" />
                Followers
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{Number(result.followers).toLocaleString()}</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                <Heart className="w-4 h-4" />
                Engagement
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{Number(result.engagement).toLocaleString()}</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                Engagement Rate
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{result.eng_ratio}%</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                <DollarSign className="w-4 h-4" />
                Campaign Budget
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">${Number(result.budget).toLocaleString()}</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                <DollarSign className="w-4 h-4" />
                Cost per Engagement
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">${result.cost_per_eng}</div>
            </div>

            {result.estimated_revenue && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Est. Revenue
                </div>
                <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">${Number(result.estimated_revenue).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Breakdown</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Calculated from engagement, cost, and ROI factors</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900 dark:text-white">{result.risk_score}</div>
              <div className={`text-sm font-bold uppercase ${getRiskColor(result.risk_level).split(' ')[0]}`}>{result.risk_level} Risk</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement Risk (40%)</span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{result.risk_breakdown?.engagement_risk || Math.max(0, (5 - result.eng_ratio) / 5 * 100).toFixed(1)}%</span>
              </div>
              <ProgressBar
                value={result.risk_breakdown?.engagement_risk || Math.max(0, (5 - result.eng_ratio) / 5 * 100)}
                colorClass="bg-gradient-to-r from-emerald-500 to-amber-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                {result.eng_ratio < 5 ? 'Low engagement rate increases risk' : 'Good engagement rate reduces risk'}
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Cost Risk (30%)</span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{result.risk_breakdown?.cost_risk || Math.min(100, (result.cost_per_eng / 2) * 100).toFixed(1)}%</span>
              </div>
              <ProgressBar
                value={result.risk_breakdown?.cost_risk || Math.min(100, (result.cost_per_eng / 2) * 100)}
                colorClass="bg-gradient-to-r from-emerald-500 to-red-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                ${result.cost_per_eng}/engagement - {result.cost_per_eng > 2 ? 'High cost increases risk' : result.cost_per_eng < 0.5 ? 'Efficient cost structure' : 'Average cost efficiency'}
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">ROI Risk (30%)</span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{result.risk_breakdown?.roi_risk || Math.max(0, (50 - result.roi) / 50 * 100).toFixed(1)}%</span>
              </div>
              <ProgressBar
                value={result.risk_breakdown?.roi_risk || Math.max(0, (50 - result.roi) / 50 * 100)}
                colorClass="bg-gradient-to-r from-red-500 to-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                {result.roi < 0 ? 'Negative ROI indicates high risk' : result.roi > 50 ? 'Strong ROI projection' : 'Moderate ROI projection'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewPrediction}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            New Prediction
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Form
          </button>
        </div>
      </main>
    </div>
  );
}
