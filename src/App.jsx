import { useState, useEffect } from 'react';
import { Target, Circle, CheckCircle, Award, TrendingUp, Star, Sparkles, Heart, Users, Briefcase, Mountain, Book, PartyPopper, Globe, Zap, Calendar, Trophy, ArrowRight, Clock, BarChart3, Lightbulb, AlertCircle, ChevronRight, X } from 'lucide-react';

function App() {
  const [clientData, setClientData] = useState({
    name: 'Welcome',
    readinessScore: 0,
    wheelOfLife: { spirituality: 0, career: 0, family: 0, relationships: 0, health: 0, personal: 0, leisure: 0, contribution: 0 },
    actionItems: []
  });
  const [mounted, setMounted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showInsights, setShowInsights] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Load completed tasks
    const savedCompleted = localStorage.getItem('completed_tasks');
    if (savedCompleted) {
      try {
        setCompletedTasks(JSON.parse(savedCompleted));
      } catch (e) { console.error('Error loading completed tasks:', e); }
    }

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
    } else {
      // Demo data to showcase the UI
      setClientData({
        name: 'Sarah',
        readinessScore: 78,
        wheelOfLife: {
          spirituality: 7,
          career: 8,
          family: 6,
          relationships: 7,
          health: 5,
          personal: 8,
          leisure: 6,
          contribution: 7
        },
        actionItems: [
          'Complete morning meditation practice 3x this week',
          'Schedule coffee meeting with mentor by Friday',
          'Finish online course module on leadership',
          'Plan family weekend activity',
          'Attend yoga class twice this week'
        ]
      });
    }
  }, []);

  const toggleTask = (index) => {
    const newCompleted = completedTasks.includes(index)
      ? completedTasks.filter(i => i !== index)
      : [...completedTasks, index];
    setCompletedTasks(newCompleted);
    localStorage.setItem('completed_tasks', JSON.stringify(newCompleted));
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good morning';
    if (hour < 18) return '☀️ Good afternoon';
    return '🌙 Good evening';
  };

  const getLowestAreas = () => {
    const areas = Object.entries(clientData.wheelOfLife)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2);
    return areas;
  };

  const getInsights = () => {
    const insights = [];
    const lowest = getLowestAreas();

    if (clientData.readinessScore >= 80) {
      insights.push({
        type: 'success',
        icon: Trophy,
        title: 'Excellent Readiness!',
        message: 'You\'re showing strong commitment. Keep this momentum going!'
      });
    } else if (clientData.readinessScore < 50) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Let\'s boost your readiness',
        message: 'Consider scheduling a session to overcome any blockers.'
      });
    }

    if (lowest[0] && lowest[0][1] < 6) {
      const areaName = lifeAreas.find(a => a.key === lowest[0][0])?.label;
      insights.push({
        type: 'info',
        icon: Lightbulb,
        title: `Focus on ${areaName}`,
        message: 'This area needs attention. Let\'s create an action plan together.'
      });
    }

    if (completedTasks.length > 0 && clientData.actionItems.length > 0) {
      const progress = Math.round((completedTasks.length / clientData.actionItems.length) * 100);
      insights.push({
        type: 'success',
        icon: Star,
        title: `${progress}% tasks completed!`,
        message: 'Great progress this week. You\'re building excellent habits.'
      });
    }

    return insights;
  };

  const wheelAverage = Object.values(clientData.wheelOfLife).reduce((a, b) => a + b, 0) / 8;

  const getScoreLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-600', bgColor: 'bg-emerald-500' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-500' };
    if (score >= 40) return { label: 'Fair', color: 'text-amber-600', bgColor: 'bg-amber-500' };
    return { label: 'Needs Focus', color: 'text-rose-600', bgColor: 'bg-rose-500' };
  };

  const scoreLevel = getScoreLevel(clientData.readinessScore);
  const balanceLevel = getScoreLevel(wheelAverage * 10);
  const insights = getInsights();
  const completionRate = clientData.actionItems.length > 0
    ? Math.round((completedTasks.length / clientData.actionItems.length) * 100)
    : 0;

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
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">My Journey</h2>
                <p className="text-xs text-gray-500">with Coach Sony Ho</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Next Session: Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">{getTimeGreeting()}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                  Welcome back, {clientData.name}!
                </h1>
                <p className="text-lg text-white/90 mb-6 max-w-xl">
                  {completionRate > 0
                    ? `You've completed ${completionRate}% of your tasks. Keep up the great work!`
                    : "You're making incredible progress. Here's your personal growth dashboard."
                  }
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                    <BarChart3 className="w-5 h-5" />
                    View Full Report
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all">
                    <Clock className="w-5 h-5" />
                    Book Session
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl transform rotate-6"></div>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl transform -rotate-6"></div>
                  <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center h-full border border-white/40">
                    <Trophy className="w-20 h-20 text-yellow-300 mb-3" />
                    <div className="text-5xl font-bold text-white mb-1">{clientData.readinessScore}%</div>
                    <div className="text-sm font-semibold text-white/90">Ready to Succeed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scoreLevel.bgColor} flex items-center justify-center`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${scoreLevel.color} bg-opacity-10`}>
                {scoreLevel.label}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{clientData.readinessScore}%</div>
            <div className="text-sm text-gray-500 font-medium">Readiness</div>
          </div>

          <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '50ms' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Circle className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${balanceLevel.color} bg-opacity-10`}>
                {balanceLevel.label}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{wheelAverage.toFixed(1)}/10</div>
            <div className="text-sm text-gray-500 font-medium">Life Balance</div>
          </div>

          <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{clientData.actionItems.length}</div>
            <div className="text-sm text-gray-500 font-medium">Action Items</div>
          </div>

          <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '150ms' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-500 font-medium">Milestones</div>
          </div>
        </div>

        {/* Insights Section */}
        {insights.length > 0 && showInsights && (
          <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">Insights & Recommendations</h3>
              </div>
              <button
                onClick={() => setShowInsights(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {insights.map((insight, idx) => {
                const Icon = insight.icon;
                const colorClass = insight.type === 'success' ? 'bg-green-100 text-green-700 border-green-200'
                  : insight.type === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200'
                  : 'bg-blue-100 text-blue-700 border-blue-200';

                return (
                  <div key={idx} className={`${colorClass} rounded-xl p-4 border-2`}>
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className="text-xs opacity-90">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Wheel of Life */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Wheel of Life</h3>
                <p className="text-sm text-gray-500 mt-1">Your life balance overview</p>
              </div>
              <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {lifeAreas.map(({ key, label, icon: Icon, color, textColor }, index) => (
                <div
                  key={key}
                  className={`transform transition-all duration-500 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: `${200 + index * 30}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">{label}</span>
                    </div>
                    <span className={`text-xl font-bold ${textColor}`}>
                      {clientData.wheelOfLife[key]}/10
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
                      style={{ width: mounted ? `${(clientData.wheelOfLife[key] / 10) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Summary Card */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <h3 className="text-lg font-bold">This Week</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-sm text-white/80 mb-1">Tasks Completed</div>
                <div className="text-3xl font-bold">{completedTasks.length}/{clientData.actionItems.length}</div>
                <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                {completionRate > 0 && (
                  <div className="mt-2 text-xs text-white/90 font-medium">{completionRate}% complete!</div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-sm text-white/80 mb-1">Readiness Level</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold">{clientData.readinessScore}%</div>
                  {clientData.readinessScore >= 70 && (
                    <div className="flex items-center gap-1 text-green-300 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{scoreLevel.label}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${scoreLevel.bgColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${clientData.readinessScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-white/90">Next Coaching Session</span>
              </div>
              <div className="text-lg font-semibold">Coming Soon</div>
              <button className="mt-3 w-full bg-white text-purple-600 rounded-lg py-2.5 font-semibold hover:bg-white/90 transition-colors">
                Schedule Now
              </button>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Action Plan</h3>
              <p className="text-sm text-gray-500 mt-1">Your weekly focus areas</p>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Add Task
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {clientData.actionItems.length > 0 ? (
            <div className="space-y-2">
              {clientData.actionItems.map((item, idx) => {
                const isCompleted = completedTasks.includes(idx);
                return (
                  <div
                    key={idx}
                    className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border-2 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} ${
                      isCompleted
                        ? 'bg-green-50/50 border-green-200 opacity-75'
                        : 'bg-gray-50 border-transparent hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer'
                    }`}
                    style={{ transitionDelay: `${400 + idx * 40}ms` }}
                    onClick={() => toggleTask(idx)}
                  >
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleTask(idx)}
                        className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <span className={`flex-1 font-medium transition-all ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {item}
                    </span>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">No action items yet</h4>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-4">
                Your coach will work with you to create personalized action steps.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Schedule Session
              </button>
            </div>
          )}
        </div>

        {/* Inspirational Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="relative">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Award className="w-12 h-12 text-yellow-300" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <blockquote className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  "The only impossible journey is the one you never begin."
                </blockquote>
                <p className="text-lg text-white/90 font-medium">— Tony Robbins</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Coach Sony Ho</div>
                <div className="text-xs text-gray-500">Your Growth Partner</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
