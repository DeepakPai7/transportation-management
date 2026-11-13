import { useState } from 'react';
import {
  Route,
  Sparkles,
  Sliders,
  ShieldCheck,
  Fuel,
  Footprints,
  Compass,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { connectedVillages, optimizationComparison } from '../../data/mockData';

export default function RoutePlannerView() {
  const [maxWalkThreshold, setMaxWalkThreshold] = useState(500);
  const [unpavedAvoidance, setUnpavedAvoidance] = useState('smart');
  const [monsoonWeatherMode, setMonsoonWeatherMode] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastOptimizedTime, setLastOptimizedTime] = useState('Today at 06:30 AM');

  // Dynamic application logic for algorithm parameters
  const computedWalkKm = ((maxWalkThreshold * 0.75) / 1000).toFixed(2);
  const walkPercentReduction = Math.round(((3.9 - Number(computedWalkKm)) / 3.9) * 100);

  let fuelMultiplier = 1.0;
  if (unpavedAvoidance === 'strict') fuelMultiplier += 0.12;
  if (unpavedAvoidance === 'none') fuelMultiplier += 0.05;
  if (monsoonWeatherMode) fuelMultiplier += 0.04;

  const computedFuelValue = Math.round(98600 * fuelMultiplier);
  const fuelSavingsPercent = Math.round(((184200 - computedFuelValue) / 184200) * 100);

  let computedAttendance;
  if (maxWalkThreshold <= 400) computedAttendance = '98.8%';
  else if (maxWalkThreshold <= 700) computedAttendance = '97.8%';
  else if (maxWalkThreshold <= 1000) computedAttendance = '94.2%';
  else computedAttendance = '89.5%';

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setLastOptimizedTime('Just now (Autonomous Heuristics Synced)');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0d1627] to-[#090e1a] border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Route className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Route Optimization & Dynamic Corridor Studio
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-cyan-300 border border-blue-500/30">
              Machine Learning Heuristics
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Solves the last-mile constraint by pairing heavy electric trunk buses on paved highways with 4WD rural cruisers on dirt spurs to eliminate dangerous student walking journeys.
          </p>
        </div>

        <button
          onClick={handleRunOptimization}
          disabled={isOptimizing}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Recalculating Corridors...' : 'Run Route Recalibration'}</span>
        </button>
      </div>

      {/* Traditional vs RouteLess AI Benchmark Card (Dynamically Recalculated) */}
      <div className="rounded-2xl bg-[#0b1220] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Model Performance Benchmark: Traditional Fixed Bus vs RouteLess AI
            </h3>
          </div>
          <span className="text-xs text-slate-400">Dynamically recalculated from parameters below</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Student Walk */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-cyan-400" /> Average Daily Student Walk
              </span>
              <span className="text-emerald-400 font-bold">-{walkPercentReduction}%</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Traditional</div>
                <div className="text-sm font-semibold text-slate-400 line-through">
                  {optimizationComparison.traditional.averageStudentWalk}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <div className="text-right">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">RouteLess AI</div>
                <div className="text-xl font-extrabold text-emerald-400">
                  {computedWalkKm} km / day
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Fuel / Operational Expense */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-amber-400" /> Monthly Fuel & Energy Spend
              </span>
              <span className="text-emerald-400 font-bold">-{fuelSavingsPercent}%</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Traditional</div>
                <div className="text-sm font-semibold text-slate-400 line-through">
                  {optimizationComparison.traditional.monthlyFuelExpense}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <div className="text-right">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">RouteLess AI</div>
                <div className="text-xl font-extrabold text-emerald-400">
                  ₹ {computedFuelValue.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Female Student Retention */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400" /> Female Scholar Retention
              </span>
              <span className="text-emerald-400 font-bold">High Correlation</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Traditional</div>
                <div className="text-sm font-semibold text-slate-400">
                  {optimizationComparison.traditional.femaleAttendanceRate}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <div className="text-right">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">RouteLess AI</div>
                <div className="text-xl font-extrabold text-pink-400">
                  {computedAttendance}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Optimization Parameters Control */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#0b1220] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Algorithm Control Parameters</h3>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Max Acceptable Walking Radius</span>
                <span className="font-bold text-cyan-400">{maxWalkThreshold} meters</span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="100"
                value={maxWalkThreshold}
                onChange={(e) => setMaxWalkThreshold(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>200m (Doorstep Cluster)</span>
                <span>1500m (Highway Bus Stop)</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">
                Unpaved & Mud Trail Avoidance
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {['none', 'smart', 'strict'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setUnpavedAvoidance(mode)}
                    className={`py-1.5 capitalize rounded-lg font-medium transition-colors ${
                      unpavedAvoidance === mode
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Monsoon Flood Heuristic</div>
                <div className="text-[10px] text-slate-400">
                  Auto-diverts away from low-elevation causeways
                </div>
              </div>
              <button
                onClick={() => setMonsoonWeatherMode(!monsoonWeatherMode)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                  monsoonWeatherMode ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    monsoonWeatherMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Feeder Corridor Roster Breakdown */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0b1220] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Optimized Feeder Corridors Summary</span>
            </h3>
            <span className="text-[11px] text-slate-400">{lastOptimizedTime}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
            {connectedVillages.map((village) => {
              const adjustedEta =
                monsoonWeatherMode && village.roadConditionType !== 'paved'
                  ? village.etaMinutes + 4
                  : village.etaMinutes;

              return (
                <div
                  key={village.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-bold text-white">{village.routeName}</div>
                      <div className="text-[11px] text-cyan-400 font-medium">
                        {village.name} → College Hub
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {village.assignedRouteId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mb-2">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Distance & ETA</span>
                      <span className="font-semibold text-white">
                        {village.distanceKm} km • {adjustedEta}m
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Students Onboard</span>
                      <span className="font-semibold text-emerald-400">
                        {village.studentCount} Students
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 truncate">{village.vehicleName}</span>
                    <span className="text-emerald-400 font-medium">
                      Avg {computedWalkKm} km walk to spur
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
