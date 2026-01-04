import React, { useState } from 'react';
import { Send, Brain, BarChart, Lightbulb } from 'lucide-react';

const AIChatPanel = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hi! I\'m your AI analyst. Ask me anything about your sales data, trends, or performance metrics.',
      timestamp: new Date().toISOString()
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user question
    setConversation(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      message: question,
      timestamp: new Date().toISOString()
    }]);

    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        message: 'Based on the data from last week, I notice a 15% drop in sales from Wednesday onwards. This coincides with a competitor\'s promotional campaign that launched on the same day.',
        explanation: 'The correlation suggests external market factors may have influenced your sales.',
        recommendations: [
          'Consider running a counter-promotion',
          'Analyze competitor pricing strategies',
          'Focus on customer retention efforts'
        ],
        timestamp: new Date().toISOString()
      }]);
    }, 1000);

    setQuestion('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Chat Panel</h2>
          <p className="text-slate-500">Ask questions about your data and get AI-powered insights</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 rounded-lg">
          <Brain className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-bold text-indigo-600">AI Analyst Online</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="h-[500px] overflow-y-auto space-y-6 mb-6">
              {conversation.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.type === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                    <p className="text-sm">{msg.message}</p>
                    
                    {msg.type === 'ai' && msg.explanation && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart className="w-4 h-4" />
                          <span className="font-bold text-sm">Analysis:</span>
                        </div>
                        <p className="text-sm text-slate-700">{msg.explanation}</p>
                        
                        {msg.recommendations && (
                          <>
                            <div className="flex items-center space-x-2 mt-4 mb-2">
                              <Lightbulb className="w-4 h-4" />
                              <span className="font-bold text-sm">Recommendations:</span>
                            </div>
                            <ul className="space-y-2">
                              {msg.recommendations.map((rec, idx) => (
                                <li key={idx} className="text-sm text-slate-700 flex items-start">
                                  <span className="mr-2">•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about your data, e.g., 'Why did my sales drop last week?'"
                className="flex-grow border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sample Questions */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Try asking:</h3>
            <div className="space-y-3">
              {[
                "What were my top products last month?",
                "Show me revenue trends for Q3",
                "Identify any anomalies in customer behavior",
                "Predict next month's sales",
                "Compare performance across regions"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuestion(q)}
                  className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm text-slate-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Generated Chart</h3>
            <div className="h-48 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
              <BarChart className="w-12 h-12 text-indigo-300" />
            </div>
            <p className="text-sm text-slate-500 mt-4">Interactive charts appear here based on your question</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;