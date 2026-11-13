import {
  AlertTriangle,
  Play,
  RotateCcw,
  Clock,
  Bus,
  TrendingUp,
  Waves,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function CrisisAlertBanner({
  crisisActive,
  onActivateCrisis,
  onDeactivateCrisis,
  onOpenCrisisView,
  crisisData,
}) {
  if (!crisisActive) {
    return (
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border-b border-rose-900/40 px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="p-1 rounded-md bg-rose-500/20 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <span className="font-semibold text-white">Surprise Challenge Simulation:</span>
          <span className="text-slate-400 hidden sm:inline">
            Test simultaneous vehicle breakdown, +40% demand surge, canal flood & exam deadlines.
          </span>
        </div>

        <button
          onClick={onActivateCrisis}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all hover:scale-105"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Activate Exam Day Crisis</span>
        </button>
      </div>
    );
  }

  const { macroStats, tierCounts } = crisisData;

  return (
    <div className="bg-gradient-to-r from-red-950/90 via-rose-950/80 to-amber-950/90 border-b-2 border-rose-500/80 px-4 sm:px-6 lg:px-8 py-3 shadow-2xl relative overflow-hidden">
      {/* Background Pulse Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative z-10">
        {/* Left: Emergency Alert Header */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/50 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase flex items-center gap-1.5">
                <span>EXAM DAY CRISIS MODE: ACTIVE</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                  LEVEL 4 EMERGENCY
                </span>
              </h2>
            </div>
            <p className="text-[11px] text-rose-200 mt-0.5 flex items-center gap-2">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>T-minus 58 mins to Session 1 Board Exams (09:00 AM) • Autonomous AI Rerouting Active</span>
            </p>
          </div>
        </div>

        {/* Middle: 4 Emergency Condition Summary Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-rose-500/40 text-rose-200 flex items-center gap-1.5">
            <Bus className="w-3.5 h-3.5 text-rose-400" />
            <span>2 Buses Down (WB-01, WB-02)</span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/40 text-amber-200 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>+40% Surge (+{macroStats.surgeStudentCount} stds)</span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-cyan-500/40 text-cyan-200 flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>Canal Road Flooded (Detour Active)</span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-emerald-500/40 text-emerald-200 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{tierCounts.tier1.allocated + tierCounts.tier2.allocated} Exam Stds Secured</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCrisisView}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all hover:scale-102"
          >
            <span>Open Crisis Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onDeactivateCrisis}
            title="Reset back to standard baseline conditions"
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

