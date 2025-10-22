import { useState, useEffect } from 'react';
import { Target, Circle, CheckCircle, Award, TrendingUp, Star, Sparkles, Heart, Users, Briefcase, Mountain, Book, PartyPopper, Globe } from 'lucide-react';

function App() {
  const [clientData, setClientData] = useState({
    name: 'Welcome',
    readinessScore: 0,
    wheelOfLife: { spirituality: 0, career: 0, family: 0, relationships: 0, health: 0, personal: 0, leisure: 0, contribution: 0 },
    actionItems: []
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem('coaching_current_session');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const totalScore = Object.values(parsed.readinessScores || {}).flat().reduce((a, b) => a + b, 0);
        setClientData({
          name: parsed.clientName || 'Welcome',
          readinessScore: Math.round((totalScore / 160) * 100),
          wheelOfLife: parsed.wheelOfLife || clientData.wheelOfLife,
          actionItems: parsed.actionPlan ? parsed.actionPlan.split('\n').filter(Boolean) : []
        });
      } catch (e) { console.error('Error:', e); }
    }
  }, []);

  const wheelAverage = Object.values(clientData.wheelOfLife).reduce((a, b) => a + b, 0) / 8;

  const getScoreLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-600', bgColor: 'bg-emerald-500' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-500' };
    if (score >= 40) return { label: 'Fair', color: 'text-amber-600', bgColor: 'bg-amber-500' };
    return { label: 'Needs Focus', color: 'text-rose-600', bgColor: 'bg-rose-500' };
  };

  const scoreLevel = getScoreLevel(clientData.readinessScore);
  const balanceLevel = getScoreLevel(wheelAverage * 10);

  const lifeAreas = [
    { key: 'spirituality', label: 'Spirituality', icon: Sparkles, color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    { key: 'career', label: 'Career', icon: Briefcase, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { key: 'family', label: 'Family', icon: Users, color: 'from-green-500 to-green-600', textColor: 'text-green-600', bgColor: 'bg-green-50' },
    { key: 'relationships', label: 'Relationships', icon: Heart, color: 'from-pink-500 to-pink-600', textColor: 'text-pink-600', bgColor: 'bg-pink-50' },
    { key: 'health', label: 'Health & Fitness', icon: Mountain, color: 'from-red-500 to-red-600', textColor: 'text-red-600', bgColor: 'bg-red-50' },
    { key: 'personal', label: 'Personal Growth', icon: Book, color: 'from-amber-500 to-amber-600', textColor: 'text-amber-600', bgColor: 'bg-amber-50' },
    { key: 'leisure', label: 'Fun & Leisure', icon: PartyPopper, color: 'from-indigo-500 to-indigo-600', textColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { key: 'contribution', label: 'Contribution', icon: Globe, color: 'from-teal-500 to-teal-600', textColor: 'text-teal-600', bgColor: 'bg-teal-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaC0ydjJoMnptMC0xNXYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className={`text-center transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">Your Growth Journey</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome back, <span className="text-yellow-300">{clientData.name}</span>!
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Track your progress, celebrate your wins, and continue your journey to personal excellence.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-16 space-y-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Readiness Score Card */}
          <div className={`group bg-white rounded-3xl shadow-xl p-8 border-2 border-transparent hover:border-emerald-200 transition-all duration-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} hover:scale-105`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`w-5 h-5 ${scoreLevel.color}`} />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Readiness</span>
                </div>
                <h3 className={`text-sm font-medium ${scoreLevel.color}`}>{scoreLevel.label}</h3>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <CheckCircle className="w-9 h-9 text-white" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  {clientData.readinessScore}
                </span>
                <span className="text-2xl font-semibold text-gray-400">%</span>
              </div>
            </div>
            <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${scoreLevel.bgColor} to-emerald-500 rounded-full transition-all duration-1000 shadow-sm`}
                style={{ width: mounted ? `${clientData.readinessScore}%` : '0%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-4">Your commitment to growth</p>
          </div>

          {/* Life Balance Card */}
          <div className={`group bg-white rounded-3xl shadow-xl p-8 border-2 border-transparent hover:border-purple-200 transition-all duration-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} hover:scale-105`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Circle className={`w-5 h-5 ${balanceLevel.color}`} />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Balance</span>
                </div>
                <h3 className={`text-sm font-medium ${balanceLevel.color}`}>{balanceLevel.label}</h3>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Circle className="w-9 h-9 text-white" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {wheelAverage.toFixed(1)}
                </span>
                <span className="text-2xl font-semibold text-gray-400">/10</span>
              </div>
            </div>
            <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: mounted ? `${(wheelAverage / 10) * 100}%` : '0%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-4">Overall life satisfaction</p>
          </div>

          {/* Action Items Card */}
          <div className={`group bg-white rounded-3xl shadow-xl p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} hover:scale-105 sm:col-span-2 lg:col-span-1`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Actions</span>
                </div>
                <h3 className="text-sm font-medium text-blue-600">Active Goals</h3>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Target className="w-9 h-9 text-white" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  {clientData.actionItems.length}
                </span>
                <span className="text-2xl font-semibold text-gray-400">tasks</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="text-xs font-medium text-gray-500">0% done</span>
            </div>
            <p className="text-sm text-gray-600 mt-4">Focus areas this week</p>
          </div>
        </div>

        {/* Wheel of Life */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Circle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Wheel of Life</h3>
                <p className="text-sm text-gray-500">Balance across all life areas</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lifeAreas.map(({ key, label, icon: Icon, color, textColor, bgColor }, index) => (
              <div
                key={key}
                className={`group relative bg-gradient-to-br ${bgColor} to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:scale-105 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${300 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${textColor}`}>
                      {clientData.wheelOfLife[key]}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">/10</div>
                  </div>
                </div>

                <h4 className={`font-semibold ${textColor} mb-3 text-sm`}>{label}</h4>

                <div className="relative w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
                    style={{ width: mounted ? `${(clientData.wheelOfLife[key] / 10) * 100}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Your Action Plan</h3>
                <p className="text-sm text-gray-500">Steps to achieve your goals</p>
              </div>
            </div>
          </div>

          {clientData.actionItems.length > 0 ? (
            <div className="space-y-3">
              {clientData.actionItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`group flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 transform hover:scale-[1.02] ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: `${700 + idx * 50}ms` }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-emerald-600 bg-white border-2 border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Target className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No action items yet</h4>
              <p className="text-gray-500 max-w-md mx-auto">Your coach will work with you to create personalized action steps in your next session.</p>
            </div>
          )}
        </div>

        {/* Motivational Quote */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-lg">
              <Award className="w-10 h-10 text-yellow-300" />
            </div>
            <blockquote className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              "The only impossible journey is the one you never begin."
            </blockquote>
            <p className="text-xl font-medium text-white/90 mb-8">— Tony Robbins</p>
            <div className="flex items-center justify-center gap-2 pt-8 border-t border-white/20">
              <Star className="w-5 h-5 text-yellow-300" />
              <p className="text-lg font-semibold">Keep up the amazing work!</p>
              <Star className="w-5 h-5 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Coach Sony Ho
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">Your Personal Growth Partner</p>
            <p className="text-gray-400 text-xs">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
