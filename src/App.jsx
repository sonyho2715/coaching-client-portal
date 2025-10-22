import { useState, useEffect } from 'react';
import { Target, TrendingUp, Star, Sparkles, Heart, CheckCircle, Award, Flame, Zap, Calendar, Trophy, BarChart3, PlayCircle } from 'lucide-react';

function App() {
  const [clientData, setClientData] = useState({
    name: 'Champion',
    readinessScore: 0,
    wheelOfLife: {
      spirituality: 0,
      career: 0,
      family: 0,
      relationships: 0,
      health: 0,
      personal: 0,
      leisure: 0,
      contribution: 0
    },
    actionItems: []
  });
  const [mounted, setMounted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    setMounted(true);

    // Load completed tasks
    const savedCompleted = localStorage.getItem('completed_tasks');
    if (savedCompleted) {
      try {
        setCompletedTasks(JSON.parse(savedCompleted));
      } catch (e) { console.error('Error:', e); }
    }

    // Load coaching data
    const savedData = localStorage.getItem('coaching_current_session');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const totalScore = Object.values(parsed.readinessScores || {}).flat().reduce((a, b) => a + b, 0);
        setClientData({
          name: parsed.clientName || 'Champion',
          readinessScore: Math.round((totalScore / 160) * 100),
          wheelOfLife: parsed.wheelOfLife || clientData.wheelOfLife,
          actionItems: parsed.actionPlan ? parsed.actionPlan.split('\n').filter(Boolean) : []
        });
      } catch (e) { console.error('Error:', e); }
    } else {
      // Demo data
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

  const wheelAverage = Object.values(clientData.wheelOfLife).reduce((a, b) => a + b, 0) / 8;
  const completionRate = clientData.actionItems.length > 0
    ? Math.round((completedTasks.length / clientData.actionItems.length) * 100)
    : 0;

  const lifeCategories = [
    { key: 'spirituality', label: 'Spirituality', emoji: '🙏', color: 'from-purple-500 to-violet-600' },
    { key: 'career', label: 'Career', emoji: '💼', color: 'from-blue-500 to-cyan-600' },
    { key: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', color: 'from-green-500 to-emerald-600' },
    { key: 'relationships', label: 'Relationships', emoji: '❤️', color: 'from-pink-500 to-rose-600' },
    { key: 'health', label: 'Health', emoji: '💪', color: 'from-red-500 to-orange-600' },
    { key: 'personal', label: 'Growth', emoji: '📚', color: 'from-amber-500 to-yellow-600' },
    { key: 'leisure', label: 'Fun', emoji: '🎉', color: 'from-indigo-500 to-purple-600' },
    { key: 'contribution', label: 'Impact', emoji: '🌟', color: 'from-teal-500 to-cyan-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Header */}
        <div className="pt-12 pb-8 px-4 text-center">
          <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 shadow-2xl">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white font-bold text-sm">YOUR GROWTH DASHBOARD</span>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              Hello, {clientData.name}! 👋
            </h1>

            <p className="text-2xl text-white/90 font-semibold mb-8 drop-shadow-lg">
              You're crushing it! Here's your progress
            </p>

            {/* Main Stats */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {/* Readiness */}
              <div className={`bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Flame className="w-16 h-16 text-white mx-auto mb-4" />
                <div className="text-7xl font-black text-white mb-2">{clientData.readinessScore}%</div>
                <div className="text-white/90 font-bold text-xl mb-4">READINESS</div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${clientData.readinessScore}%` }}></div>
                </div>
              </div>

              {/* Life Balance */}
              <div className={`bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
                <Heart className="w-16 h-16 text-white mx-auto mb-4" />
                <div className="text-7xl font-black text-white mb-2">{wheelAverage.toFixed(1)}</div>
                <div className="text-white/90 font-bold text-xl mb-4">LIFE BALANCE</div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${(wheelAverage/10)*100}%` }}></div>
                </div>
              </div>

              {/* Tasks */}
              <div className={`bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                <div className="text-7xl font-black text-white mb-2">{completedTasks.length}/{clientData.actionItems.length}</div>
                <div className="text-white/90 font-bold text-xl mb-4">COMPLETED</div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${completionRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 pb-16 space-y-8">
          {/* Life Areas Grid */}
          <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/20">
              <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-3">
                <Star className="w-10 h-10 text-yellow-300" />
                LIFE AREAS
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {lifeCategories.map((category, idx) => (
                  <div
                    key={category.key}
                    className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer`}
                  >
                    <div className="text-5xl mb-3">{category.emoji}</div>
                    <div className="text-white font-bold text-lg mb-2">{category.label}</div>
                    <div className="text-6xl font-black text-white mb-2">{clientData.wheelOfLife[category.key]}</div>
                    <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${(clientData.wheelOfLife[category.key]/10)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/20">
              <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-3">
                <Target className="w-10 h-10 text-green-300" />
                YOUR ACTION PLAN
              </h2>

              {clientData.actionItems.length > 0 ? (
                <div className="space-y-3">
                  {clientData.actionItems.map((item, idx) => {
                    const isCompleted = completedTasks.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={`p-6 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : 'bg-white/20 hover:bg-white/30'
                        } backdrop-blur-md shadow-xl border-2 ${isCompleted ? 'border-green-300' : 'border-white/20'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-white' : 'bg-white/30'}`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <span className={`text-xl font-bold flex-1 ${isCompleted ? 'text-white line-through' : 'text-white'}`}>
                            {item}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="w-20 h-20 text-white/50 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white/70">No tasks yet - let's create your action plan!</p>
                </div>
              )}
            </div>
          </div>

          {/* Quote Banner */}
          <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl text-center">
              <Award className="w-24 h-24 text-white mx-auto mb-6 animate-bounce" />
              <blockquote className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                "The only impossible journey is the one you never begin."
              </blockquote>
              <p className="text-2xl font-bold text-white/90">— Tony Robbins</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block shadow-xl">
              <p className="text-white font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                Coach Sony Ho - Your Growth Partner
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
