import { useState, useEffect } from 'react';
import { Target, Circle, CheckCircle, Award } from 'lucide-react';

function App() {
  const [clientData, setClientData] = useState({
    name: 'Welcome',
    readinessScore: 0,
    wheelOfLife: { spirituality: 0, career: 0, family: 0, relationships: 0, health: 0, personal: 0, leisure: 0, contribution: 0 },
    actionItems: []
  });

  useEffect(() => {
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

  const lifeAreas = [
    { key: 'spirituality', label: '🙏 Spirituality', color: 'bg-purple-500' },
    { key: 'career', label: '💼 Career', color: 'bg-blue-500' },
    { key: 'family', label: '👨‍👩‍👧 Family', color: 'bg-green-500' },
    { key: 'relationships', label: '❤️ Relationships', color: 'bg-pink-500' },
    { key: 'health', label: '💪 Health', color: 'bg-red-500' },
    { key: 'personal', label: '📚 Personal Growth', color: 'bg-yellow-500' },
    { key: 'leisure', label: '🎉 Fun & Leisure', color: 'bg-indigo-500' },
    { key: 'contribution', label: '🌟 Contribution', color: 'bg-teal-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Coaching Journey
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {clientData.name}! 👋</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Readiness Score</h3>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">{clientData.readinessScore}%</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${clientData.readinessScore}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">Your commitment level</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Life Balance</h3>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Circle className="w-7 h-7 text-purple-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {wheelAverage.toFixed(1)}<span className="text-2xl text-gray-400">/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(wheelAverage / 10) * 100}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">Overall satisfaction</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Action Items</h3>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{clientData.actionItems.length}</div>
            <p className="text-sm text-gray-600 mt-3">Tasks to complete</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Circle className="w-7 h-7 text-purple-600" />
            Your Life Balance
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {lifeAreas.map(({ key, label, color }) => (
              <div key={key} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <span className="text-lg font-bold text-gray-900">{clientData.wheelOfLife[key]}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className={`${color} h-4 rounded-full transition-all duration-700`}
                    style={{ width: `${(clientData.wheelOfLife[key] / 10) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-green-600" />
            My Action Plan
          </h3>
          {clientData.actionItems.length > 0 ? (
            <div className="space-y-3">
              {clientData.actionItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition">
                  <input type="checkbox" className="mt-1 w-6 h-6 text-green-600 rounded-lg cursor-pointer" />
                  <span className="text-gray-700 flex-1">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No action items yet</p>
              <p className="text-gray-400 text-sm mt-2">Your coach will set these in your next session</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-10 text-white text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <blockquote className="text-2xl font-semibold mb-4">
            "The only impossible journey is the one you never begin."
          </blockquote>
          <p className="text-lg opacity-90">— Tony Robbins</p>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-75">Keep up the great work! 🌟</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-600 text-sm">
          <p>© Coach Sony Ho - Your Personal Growth Partner</p>
        </div>
      </div>
    </div>
  );
}

export default App;
