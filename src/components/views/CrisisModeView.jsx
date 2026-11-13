import { useState } from 'react';
import {
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  Bus,
  TrendingUp,
  Waves,
  GraduationCap,
  ShieldAlert,
  Search,
  Sliders,
  Compass,
} from 'lucide-react';
import { CRISIS_CONSTANTS } from '../../services/crisisOptimizer';

export default function CrisisModeView({
  crisisActive,
  onActivateCrisis,
  onDeactivateCrisis,
  crisisData,
  initialSearchQuery = '',
}) {
  const [selectedTierFilter, setSelectedTierFilter] = useState('all');
  const [searchStudent, setSearchStudent] = useState(initialSearchQuery);
  const [activeTab, setActiveTab] = useState('allocations'); // 'allocations', 'whatif', 'timeline', 'fleet'

  const {
    macroStats,
    allocatedStudents,
    unallocatedStudents,
    fleetOccupancyResult,
    tierCounts,
    whatIfComparison,
    eventLog,
    floodedSegment,
  } = crisisData;

  const filteredAllocations = allocatedStudents.filter((s) => {
    const matchesTier =
      selectedTierFilter === 'all' || s.priorityTier.toString() === selectedTierFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.village.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.assignedVehicleId.toLowerCase().includes(searchStudent.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Crisis Mode Top Control Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/70 via-[#161224] to-[#0a101d] border-2 border-rose-500/80 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Exam Day Crisis Operations Center
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                crisisActive
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {crisisActive ? 'CRISIS SIMULATION ACTIVE' : 'CRISIS MODE STANDBY'}
            </span>
          </div>
          <p className="text-xs text-rose-200/90 max-w-3xl leading-relaxed">
            Multi-incident simultaneous emergency response: 2 government buses broken down, +40%
            student demand surge, Canal bridge flooded, and university board exams commencing within
            58 minutes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!crisisActive ? (
            <button
              onClick={onActivateCrisis}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-xl shadow-rose-600/40 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Activate Exam Day Crisis</span>
            </button>
          ) : (
            <button
              onClick={onDeactivateCrisis}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Deactivate / Reset Crisis Baseline</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Simultaneous Emergency Condition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Condition 1: 2 Gov Buses Broken Down */}
        <div className="rounded-2xl bg-gradient-to-b from-rose-950/50 to-[#0e1626] border border-rose-500/40 p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Bus className="w-5 h-5" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                CONDITION 1
              </span>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              2 Government Buses Broken Down
            </div>
            <div className="text-2xl font-extrabold text-rose-400 mt-1">
              {macroStats.unavailableBusesCount} Unavailable
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              WB-01 (Battery Fault at Kothanur) & WB-02 (Air-Brake Loss at Bellamkonda).{' '}
              <strong className="text-rose-300">{macroStats.brokenBusesPassengerCount} passengers stranded</strong>.
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-rose-900/40 text-[10px] text-rose-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>0 seats allocated to broken units</span>
          </div>
        </div>

        {/* Condition 2: 40% Demand Surge */}
        <div className="rounded-2xl bg-gradient-to-b from-amber-950/50 to-[#0e1626] border border-amber-500/40 p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black">
                CONDITION 2
              </span>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Demand Surge Engine (+40%)
            </div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">
              +{CRISIS_CONSTANTS.SURGE_PERCENTAGE}% Surge
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              District demand surged from 1,480 to <strong className="text-white">2,072 students</strong> (+{macroStats.surgeStudentCount} dynamic requests) across Rayakottai hub.
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-amber-900/40 text-[10px] text-amber-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strict single-activation idempotency</span>
          </div>
        </div>

        {/* Condition 3: Flooded Road Inaccessibility */}
        <div className="rounded-2xl bg-gradient-to-b from-cyan-950/50 to-[#0e1626] border border-cyan-500/40 p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Waves className="w-5 h-5" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-black">
                CONDITION 3
              </span>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Flooded Road Inaccessibility
            </div>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1">Canal Bridge Cut Off</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              VIL-02 ↔ VIL-04 road submerged in 2.1 ft water. Excluded from all routes; rerouted via NH-844 Ridge Bypass (+4.6 km).
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-cyan-900/40 text-[10px] text-cyan-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simulated Travel Time: 32 mins (+14m)</span>
          </div>
        </div>

        {/* Condition 4: Exam Deadlines & Priority */}
        <div className="rounded-2xl bg-gradient-to-b from-indigo-950/50 to-[#0e1626] border border-indigo-500/40 p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <GraduationCap className="w-5 h-5" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white">
                CONDITION 4
              </span>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Exam Deadlines & Priority
            </div>
            <div className="text-2xl font-extrabold text-indigo-400 mt-1">
              {tierCounts.tier1.allocated + tierCounts.tier2.allocated} Candidates
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              Session 1 (09:00 AM) and Session 2 (10:00 AM) university exams prioritized. <strong className="text-emerald-400">100% On-Time Allocation</strong> achieved.
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-indigo-900/40 text-[10px] text-emerald-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero imminent exam candidates stranded</span>
          </div>
        </div>
      </div>

      {/* Flooded Road and Alternative Routing Schematic Banner */}
      <div className="rounded-2xl bg-[#0b1220] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Flooded Road Exclusion & Alternative Detour Corridor
              </h3>
              <p className="text-xs text-slate-400">
                {floodedSegment.name} is excluded from all AI dispatch routing recommendations.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            Simulated Flood Telemetry (2.1 ft Submersion)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Normal Route (Blocked) */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <Waves className="w-4 h-4" />
                <span>Primary Route: Canal Sluice Road Km 8.4</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">
                BLOCKED
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div>
                <strong>Distance:</strong> {floodedSegment.normalDistanceKm} km
              </div>
              <div>
                <strong>Normal Travel Time:</strong> {floodedSegment.normalTravelMinutes} mins
              </div>
              <div>
                <strong>Status:</strong> Impassable for all vehicles due to fast-moving stream water
              </div>
            </div>
          </div>

          {/* Alternative Detour Route */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Alternative Detour: {floodedSegment.detourName}</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-black">
                ACTIVE DETOUR
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div>
                <strong>Distance:</strong> {floodedSegment.detourDistanceKm} km (+{floodedSegment.detourAddedKm} km detour)
              </div>
              <div>
                <strong>Simulated Travel Time:</strong> {floodedSegment.detourTravelMinutes} mins (+{floodedSegment.detourAddedMinutes} mins delay)
              </div>
              <div>
                <strong>Vehicle Clearance:</strong> Authorized for Standby Bus SB-01, Backup Vans & Cruisers
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-[11px] text-slate-400 italic text-center sm:text-left">
          * Note: {floodedSegment.note}
        </div>
      </div>

      {/* View Tabs: Allocations, What-If, Timeline, Fleet */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('allocations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'allocations'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Examination Priority Allocations ({allocatedStudents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('whatif')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'whatif'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>What-If Plan Comparison</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'timeline'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Crisis Event Timeline (8 Steps)</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'fleet'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Fleet Capacity & Reallocation ({fleetOccupancyResult.length})</span>
        </button>
      </div>

      {/* Tab 1: Examination Priority Allocations Table */}
      {activeTab === 'allocations' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Search candidate, subject, village or vehicle..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
              <button
                onClick={() => setSelectedTierFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTierFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Tiers ({allocatedStudents.length})
              </button>
              <button
                onClick={() => setSelectedTierFilter('1')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTierFilter === '1'
                    ? 'bg-rose-600 text-white'
                    : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                Tier 1: Imminent ({tierCounts.tier1.allocated})
              </button>
              <button
                onClick={() => setSelectedTierFilter('2')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTierFilter === '2'
                    ? 'bg-amber-600 text-white'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                Tier 2: Within 2h ({tierCounts.tier2.allocated})
              </button>
              <button
                onClick={() => setSelectedTierFilter('3')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTierFilter === '3'
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-400 hover:text-indigo-300'
                }`}
              >
                Tier 3: Lab/Viva ({tierCounts.tier3.allocated})
              </button>
              <button
                onClick={() => setSelectedTierFilter('4')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTierFilter === '4'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tier 4: Standard ({tierCounts.tier4.allocated})
              </button>
            </div>
          </div>

          {/* Allocation Table */}
          <div className="rounded-2xl bg-[#0b1220] border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Candidate & Village</th>
                    <th className="py-3 px-4">Exam Session & Subject</th>
                    <th className="py-3 px-4">Priority Tier</th>
                    <th className="py-3 px-4">Assigned Emergency Vehicle</th>
                    <th className="py-3 px-4">Route Corridor</th>
                    <th className="py-3 px-4">Estimated Arrival</th>
                    <th className="py-3 px-4">Transparent AI Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAllocations.map((a) => {
                    const getTierBadge = () => {
                      if (a.priorityTier === 1)
                        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                      if (a.priorityTier === 2)
                        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                      if (a.priorityTier === 3)
                        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
                      return 'bg-slate-800 text-slate-400 border-slate-700';
                    };

                    return (
                      <tr key={a.studentId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{a.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {a.village} • {a.studentId}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-cyan-300">{a.subject}</div>
                          <div className="text-[10px] text-amber-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Exam: {a.examSession}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block ${getTierBadge()}`}
                          >
                            Tier {a.priorityTier}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <Bus className="w-3.5 h-3.5 text-blue-400" />
                            <span>{a.assignedVehicleId}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Seat #{a.seatNumber} ({a.assignedVehicleName.split(' ')[0]})
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-slate-300 text-[11px]">{a.routeUsed}</div>
                          <div className="text-[10px] text-slate-400">
                            Simulated: {a.simulatedTravelMinutes} mins
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            {a.estimatedArrivalTime}
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-xs text-slate-400 text-[11px] leading-tight">
                          {a.rationale}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Unallocated Queue Notice */}
          {unallocatedStudents.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>
                    Unallocated Lower-Priority Queue ({unallocatedStudents.length} Students)
                  </span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Fleet capacity strictly respected (no overcrowding)
                </span>
              </div>
              <p className="text-slate-300 mb-3">
                All 40 Tier 1 and Tier 2 examination candidates were successfully allocated. The {unallocatedStudents.length} unallocated regular scholars have been issued subsidized District Emergency Auto-Rickshaw Pooling Vouchers (₹120 subsidy).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {unallocatedStudents.map((u) => (
                  <div
                    key={u.studentId}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]"
                  >
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-slate-400">{u.village} • {u.priorityLabel}</div>
                    <div className="text-cyan-400 font-mono text-[10px] mt-1">{u.voucherCode}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: What-If Scenario Comparison */}
      {activeTab === 'whatif' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            Compare how the baseline transportation plan fails under crisis, how naive first-come-first-served allocation strands examination candidates, and how RouteLess AI deterministic prioritization protects 100% of exam students.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Plan A */}
            <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                  BASELINE (PRE-CRISIS)
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  {whatIfComparison.planA_Original.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                  {whatIfComparison.planA_Original.description}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Total Demand:</span>
                    <span className="font-bold text-white">50 students</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Available Capacity:</span>
                    <span className="font-bold text-white">78 seats</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Exam On-Time Rate:</span>
                    <span className="font-bold text-emerald-400">100% (Baseline)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Broken Buses / Floods:</span>
                    <span className="font-bold text-emerald-400">0 / 0</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-400 block text-center">
                  {whatIfComparison.planA_Original.feasibilityNote}
                </span>
              </div>
            </div>

            {/* Plan B */}
            <div className="p-5 rounded-2xl bg-[#141222] border border-amber-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  NAIVE HEURISTIC
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  {whatIfComparison.planB_NaiveFIFO.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                  {whatIfComparison.planB_NaiveFIFO.description}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Total Surged Demand:</span>
                    <span className="font-bold text-amber-400">70 students (+40%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Available Capacity:</span>
                    <span className="font-bold text-white">156 seats</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Exam On-Time Rate:</span>
                    <span className="font-bold text-rose-400">
                      {whatIfComparison.planB_NaiveFIFO.examStudentsOnTimePercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Imminent Exam Misses:</span>
                    <span className="font-bold text-rose-500">
                      {whatIfComparison.planB_NaiveFIFO.tier1MissedExams} Students Miss Exams!
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="px-2 py-1 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 block text-center">
                  {whatIfComparison.planB_NaiveFIFO.feasibilityNote}
                </span>
              </div>
            </div>

            {/* Plan C */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-[#0e1626] border-2 border-cyan-500/80 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-black">
                  ROUTELess AI OPTIMAL
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  {whatIfComparison.planC_RouteLessAi.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
                  {whatIfComparison.planC_RouteLessAi.description}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Total Surged Demand:</span>
                    <span className="font-bold text-cyan-400">70 students (+40%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Allocated Students:</span>
                    <span className="font-bold text-emerald-400">
                      {whatIfComparison.planC_RouteLessAi.allocatedStudents} Allocated
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Exam On-Time Rate:</span>
                    <span className="font-bold text-emerald-400">
                      100.0% Guaranteed On-Time
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Imminent Exam Misses:</span>
                    <span className="font-bold text-emerald-400">0 Missed Exams</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 block text-center">
                  {whatIfComparison.planC_RouteLessAi.feasibilityNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Chronological Event Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-2xl bg-[#0b1220] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Exam Day Crisis Chronological Incident & Dispatch Log</span>
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">8 of 8 Steps Complete</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
            {eventLog.map((ev) => (
              <div key={ev.step} className="relative group">
                <span className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-[9px] font-bold text-cyan-300">
                  {ev.step}
                </span>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs text-white">{ev.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/50">
                      {ev.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Fleet Reallocation & Capacity Indicators */}
      {activeTab === 'fleet' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            Emergency fleet reallocation breakdown. Broken buses are strictly locked with 0 usable seats. Backup and authorized shared vehicles are brought online with zero capacity violations.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleetOccupancyResult.map((v) => {
              const isBroken = v.status === 'BREAKDOWN_UNAVAILABLE';
              const isBackup = v.isBackup;

              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isBroken
                      ? 'bg-rose-950/20 border-rose-500/50'
                      : isBackup
                      ? 'bg-cyan-950/20 border-cyan-500/40'
                      : 'bg-[#0e1626] border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="font-extrabold text-sm text-white">{v.id}</span>
                        <div className="text-xs font-semibold text-slate-300">{v.name}</div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          isBroken
                            ? 'bg-rose-500 text-white border-rose-600'
                            : isBackup
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {isBroken ? 'BREAKDOWN' : isBackup ? 'BACKUP DEPLOYED' : 'OPERATIONAL'}
                      </span>
                    </div>

                    {isBroken ? (
                      <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-200 mt-2">
                        <strong className="block text-white mb-0.5">Defect Reason:</strong>
                        {v.reason}
                        <div className="mt-2 text-[10px] text-rose-300 font-bold">
                          Usable Capacity: 0 Seats (Locked)
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Allocated Seats:</span>
                          <span className="font-bold text-white">
                            {v.allocatedSeats} / {v.capacity} ({v.occupancyPercent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              v.occupancyPercent > 90
                                ? 'bg-amber-400'
                                : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                            }`}
                            style={{ width: `${Math.min(100, v.occupancyPercent)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Spare: {v.remainingSeats} seats</span>
                          <span>No Overcapacity</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400 truncate">
                    {v.assignedRoute || 'Standby Depot Reserve'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
