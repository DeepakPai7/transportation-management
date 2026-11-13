import {
  Sparkles,
  GitPullRequest,
  Shield,
  Footprints,
  ArrowRight,
  Radio,
  HeartHandshake,
} from 'lucide-react';
import { studentRequests } from '../../data/mockData';

export default function LiveFeedSection({ onNavigateToStudentPortal, onNavigateToAi }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Pending Last-Mile Cluster Requests */}
      <div className="lg:col-span-7 rounded-2xl bg-[#0b1220] border border-slate-800/90 p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-black/20">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <GitPullRequest className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Pending Last-Mile Feeder Requests
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              19 Hamlets In Queue
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Remote agrarian households requesting dynamic pickup stops to eliminate dangerous walking distances through forest & stream corridors.
          </p>

          <div className="space-y-3">
            {studentRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{req.studentName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {req.gender}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-medium">
                        {req.village}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{req.course}</div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      req.urgency === 'Critical'
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {req.urgency} Priority
                  </span>
                </div>

                <div className="text-xs text-slate-300 mb-2 leading-relaxed">
                  <strong className="text-slate-400 font-normal">Condition:</strong> {req.reason}
                </div>

                <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/40 text-[11px] text-cyan-300 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">AI Recommendation:</span> {req.aiRecommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Batch optimizer can save <strong className="text-emerald-400">42 mins walk/day</strong> for 19 scholars
          </span>
          <button
            onClick={onNavigateToStudentPortal}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>Review All Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Rural Education Retention & Safety Impact */}
      <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#0b1426] to-[#070b14] border border-slate-800/90 p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-black/20">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Shield className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Rural Student Retention & Safety Index
            </h3>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Direct real-world social impact achieved through RouteLess AI dynamic fleet orchestration.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-pink-400" /> Female Higher Ed Retention
                </span>
                <span className="font-bold text-emerald-400 text-sm">97.8%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-emerald-400 h-full w-[97.8%] rounded-full"></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1.5">
                Up from 72.4% baseline before door-to-corridor pickup service.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5 text-cyan-400" /> Avg Walking Distance
                </span>
                <span className="font-bold text-cyan-400 text-sm">0.45 km</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[12%] rounded-full"></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1.5">
                Reduced by 88.5% from 3.9 km through hazardous unlit trails.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" /> RFID Parent Live SMS Delivery
                </span>
                <span className="font-bold text-white text-sm">99.4%</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Instant vernacular SMS delivered upon student boarding & college arrival.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Autonomous Rural Logistics Model</span>
          <button
            onClick={onNavigateToAi}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>Ask AI Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
