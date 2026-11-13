import { useState } from 'react';
import {
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import { emergencyScenarios } from '../../data/mockData';

export default function EmergencySimulatorView() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(emergencyScenarios[0].id);
  const [simState, setSimState] = useState('idle');
  const [activeStep, setActiveStep] = useState(0);

  const scenario =
    emergencyScenarios.find((s) => s.id === selectedScenarioId) || emergencyScenarios[0];

  const handleStartSimulation = () => {
    setSimState('running');
    setActiveStep(1);

    const stepIntervals = [1200, 2400, 3600, 4800, 5800];

    stepIntervals.forEach((time, index) => {
      setTimeout(() => {
        setActiveStep(index + 1);
        if (index === stepIntervals.length - 1) {
          setSimState('completed');
        }
      }, time);
    });
  };

  const handleReset = () => {
    setSimState('idle');
    setActiveStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#13111f] to-[#090e1a] border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Rural Crisis & Emergency Response Simulator
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
              Zero-Stranded Student Safety Protocol
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Stress-test autonomous rerouting, backup vehicle interception, and automated multilingual parental SMS notifications during sudden rural incidents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {simState === 'idle' ? (
            <button
              onClick={handleStartSimulation}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Trigger Live Emergency Simulation</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {emergencyScenarios.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;

          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                handleReset();
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-rose-950/20 border-rose-500/60 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30'
                  : 'bg-[#0b1220] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    sc.severity === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : sc.severity === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-blue-500/20 text-cyan-300 border-blue-500/30'
                  }`}
                >
                  {sc.severity} Severity
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{sc.id}</span>
              </div>
              <div className="text-xs font-bold text-white mb-1 leading-snug">{sc.title}</div>
              <div className="text-[11px] text-slate-400 line-clamp-1">{sc.affectedVehicle}</div>
            </button>
          );
        })}
      </div>

      {/* Active Simulation Stage Panel */}
      <div className="rounded-2xl bg-[#0b1220] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Active Crisis Scenario
            </div>
            <h3 className="text-lg font-extrabold text-white mt-0.5">{scenario.title}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">{scenario.description}</p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">Target Corridor</div>
              <div className="text-xs font-bold text-white mt-0.5">{scenario.targetRoute}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">Vehicle Affected</div>
              <div className="text-xs font-bold text-cyan-400 mt-0.5">
                {scenario.affectedVehicle}
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulation Step Execution Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Autonomous AI Execution Log</span>
            </span>
            <span className="text-xs text-cyan-400 font-semibold">
              {simState === 'idle'
                ? 'Ready to initiate test'
                : simState === 'running'
                ? `Executing Step ${activeStep} of 5...`
                : 'Protocol Fully Resolved (Safe Arrival)'}
            </span>
          </div>

          <div className="space-y-2.5">
            {scenario.aiActionPlan.map((action, idx) => {
              const stepNumber = idx + 1;
              const isPast = activeStep > stepNumber || simState === 'completed';
              const isCurrent = activeStep === stepNumber && simState === 'running';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isPast
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                      : isCurrent
                      ? 'bg-blue-950/40 border-cyan-500/60 shadow-lg text-white ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                        {stepNumber}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-xs leading-relaxed">
                    <span className="font-bold mr-1.5">Step {stepNumber}:</span>
                    {action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Simulation Impact Metrics */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Recalibration Impact & Safety Outcomes
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 text-[11px] block">Detour Distance</span>
              <span className="text-base font-bold text-white mt-1 block">
                {scenario.rerouteMapData.detourKm} km
              </span>
              <span className="text-[10px] text-amber-400">
                +{scenario.rerouteMapData.detourKm - scenario.rerouteMapData.originalKm} km bypass
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 text-[11px] block">Delay To College Hub</span>
              <span className="text-base font-bold text-amber-400 mt-1 block">
                +{scenario.rerouteMapData.delayMinutes} mins
              </span>
              <span className="text-[10px] text-slate-400">Arrival window maintained</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 text-[11px] block">Student Safety Index</span>
              <span className="text-base font-bold text-emerald-400 mt-1 block">
                {scenario.rerouteMapData.safetyScore}
              </span>
              <span className="text-[10px] text-emerald-400">Zero roadside stranding</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 text-[11px] block">Parent SMS Broadcast</span>
              <span className="text-base font-bold text-cyan-400 mt-1 block">100% Delivered</span>
              <span className="text-[10px] text-slate-400">Tamil & Kannada vernacular</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
