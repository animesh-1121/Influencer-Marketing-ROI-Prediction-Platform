import { useState, useEffect } from 'react';
import './index.css';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  const API_BASE_URL = import.meta.env.MODE === 'development' ? 'http://127.0.0.1:5000' : '';

  // Check backend health on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then(res => {
        if (res.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      })
      .catch(() => {
        setBackendStatus('disconnected');
      });
  }, []);

  const handleStart = () => {
    setCurrentPage('predict');
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      setCurrentPage('dashboard');
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        setError(`Cannot connect to backend server. Please make sure the backend is running.`);
      } else {
        setError(err.message);
      }
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentPage === 'dashboard') {
      setCurrentPage('predict');
    } else if (currentPage === 'predict') {
      setCurrentPage('home');
    }
  };

  const handleNewPrediction = () => {
    setResult(null);
    setError(null);
    setCurrentPage('predict');
  };

  // Error Toast
  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-800 p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Error</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => setError(null)}
              className="flex-1 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Backend Status Warning */}
      {backendStatus === 'disconnected' && (
        <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm">
          Warning: Backend server not connected. Please make sure it's running on port 5000.
        </div>
      )}
      {currentPage === 'home' && <Home onStart={handleStart} />}
      {currentPage === 'predict' && <Predict onSubmit={handleSubmit} loading={loading} />}
      {currentPage === 'dashboard' && (
        <Dashboard
          result={result}
          onBack={handleBack}
          onNewPrediction={handleNewPrediction}
        />
      )}
    </div>
  );
}
