import { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Radio,
} from 'lucide-react';
import { aiSuggestions } from '../../data/mockData';

export default function AiAssistantView() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Dr. Aruna Rao! I am your RouteLess AI Copilot for the Rayakottai Rural Transit Hub. I continuously analyze road surface telemetry, stream water levels, student walking distances, and fleet occupancy across all 32 hamlets. How can I assist your transit dispatch today?",
      timestamp: '08:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgCounter, setMsgCounter] = useState(2);

  const predefinedAnswers = {
    'Which hamlets have students walking >2.5 km?':
      'Based on current topological graph data:\n• Bettamugilalam High Forest: 6 students had an avg walk of 7.8 km (now eliminated by 4WD CR-07).\n• Yelagiri Foothills Cluster: 12 students walk up to 6.1 km along forest trails.\n• Madhugiri Ridge: 8 students on steep terrain.\nRecommendation: Cluster approval for Request REQ-2041 and REQ-2043 will reduce walking distance under 400m for 100% of these scholars.',
    'Simulate adding 15 seats to Yelagiri route':
      'Simulation Result for Route R-05 (Yelagiri Foothills):\n• Current Vehicle: Mahindra Supro EV (16 seats, 12 occupied).\n• Proposed Adjustment: Deploy 32-Seater Electric Bus WB-03 from Standby Depot.\n• Outcome: Absorbs 14 pending last-mile requests from Marandahalli crossing. Average student morning commute time reduced by 18 minutes. Energy cost increases by only ₹42/trip due to off-peak solar depot charging.',
    'Show female student retention correlation with RouteLess AI':
      'Impact Telematics Report for Rayakottai District:\n• Female enrollment retention increased from 72.4% to 97.8% (+25.4% improvement) since launching door-to-corridor pickup.\n• 884 rural female scholars now have safe, well-monitored transportation with RFID boarding validation and automated vernacular SMS to parents.\n• Zero harassment or roadside isolation incidents reported across all 6 active corridors.',
    'Optimize evening return routes for heavy rain forecast':
      'Weather Forecast Advisory for 03:30 PM - 05:00 PM:\n• Heavy monsoon showers expected over West Forest & Canal sectors.\n• Dynamic Plan Activated: Pre-dispatch 4WD Cruiser CR-04 to high-elevation transfer hub at Km 7.2.\n• Reroute Route R-04 via NH-844 ring road to avoid Channapatna low culvert.\n• Student parents notified in Tamil & Kannada with updated 12-minute arrival shift.',
    'Compare fuel expenditure vs traditional fixed-route bus':
      'Cost Efficiency Analysis:\n• Traditional Fixed Buses: ₹1,84,200/month (high diesel idling on unpaved roads).\n• RouteLess AI Dynamic Fleet: ₹98,600/month (-46.5% expenditure).\n• Savings Driver: AI pairs heavy EV buses for paved highway trunks and lightweight 4WD cruisers for rocky spurs, cutting 170 empty deadhead kilometers daily.',
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const currentId = msgCounter;
    const userMessage = {
      id: currentId,
      sender: 'user',
      text: query,
      timestamp: '08:12 AM',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setMsgCounter((prev) => prev + 2);

    setTimeout(() => {
      const replyText =
        predefinedAnswers[query] ||
        `RouteLess AI Heuristic Analysis: Under current morning road conditions for Rayakottai Hub, all 24 active fleet units are operating within safe speed governor limits (mean speed: 38 km/h). 1,480 students are in transit or have safely arrived. Telemetry latency is 180ms.`;

      const aiReply = {
        id: currentId + 1,
        sender: 'ai',
        text: replyText,
        timestamp: '08:12 AM',
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0d1627] to-[#090e1a] border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Bot className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              RouteLess AI Dispatch Copilot
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              GPT-Rural Heuristic Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Ask questions regarding road durability, walking distance reductions, seat reallocation, female scholar safety, or weather contingencies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Real-time IoT Telemetry Connected</span>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Suggested Prompts:
        </span>
        {aiSuggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-cyan-300 transition-all text-left"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="rounded-2xl bg-[#0b1220] border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-bold text-xs'
                    : 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white p-1'
                }`}
              >
                {m.sender === 'user' ? 'AR' : <Bot className="w-4 h-4 text-white" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75">
                  <span className="font-bold">
                    {m.sender === 'user' ? 'Dr. Aruna Rao' : 'RouteLess AI Dispatch Copilot'}
                  </span>
                  <span>{m.timestamp}</span>
                </div>
                <div>{m.text}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white p-1 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>RouteLess AI is analyzing fleet telematics & rural topological graph...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about rural routes, vehicle occupancy, walking distance, or road hazards..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
