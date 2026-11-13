import { useState } from 'react';
import {
  MapPin,
  Route,
  Navigation,
  School,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Footprints,
  Compass,
  ArrowRight,
  Bus,
  Waves,
} from 'lucide-react';
import { connectedVillages, destinationCollege } from '../../data/mockData';

export default function RouteOverviewSection({
  onSelectVillage,
  onSimulateRoute,
  crisisActive = false,
  onOpenCrisisView,
}) {
  const [selectedVillageId, setSelectedVillageId] = useState('VIL-01');
  const [filterType, setFilterType] = useState('all');

  const selectedVillage =
    connectedVillages.find((v) => v.id === selectedVillageId) || connectedVillages[0];

  const filteredVillages = connectedVillages.filter((v) => {
    if (filterType === 'transit') return v.status === 'In Transit';
    if (filterType === 'rough') return v.roadConditionType !== 'paved';
    return true;
  });

  return (
    <section className="rounded-2xl bg-[#0b1220] border border-slate-800/90 overflow-hidden shadow-xl shadow-black/30">
      {/* Section Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-400 border border-blue-500/30">
              <Route className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Rural Feeder Network & Destination College Hub
            </h2>
            {crisisActive ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                Flood Detour Active
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Live Topology
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Real-time multi-modal connectivity connecting remote agricultural and tribal hamlets to{' '}
            <span className="text-slate-200 font-medium">{destinationCollege.name}</span>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs self-start md:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Hamlets ({connectedVillages.length})
          </button>
          <button
            onClick={() => setFilterType('transit')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterType === 'transit'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            In Transit
          </button>
          <button
            onClick={() => setFilterType('rough')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterType === 'rough'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rough / Ghat Roads
          </button>
        </div>
      </div>

      {/* Flooded Road Alert Bar when Crisis Active */}
      {crisisActive && (
        <div className="bg-rose-950/40 border-b border-rose-900/60 px-5 py-2.5 flex items-center justify-between text-xs text-rose-200">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>Flooded Road Blocked:</strong> Canal Causeway between Bellamkonda (VIL-02) and
              Channapatna (VIL-04) is submerged. AI routing has diverted fleet via Northern Ridge
              Highway Bypass (NH-844).
            </span>
          </div>
          {onOpenCrisisView && (
            <button
              onClick={onOpenCrisisView}
              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold shrink-0 ml-3"
            >
              View Detour
            </button>
          )}
        </div>
      )}

      {/* Main Grid: Interactive Map Schematic + Active Hamlet Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
        {/* Left: Interactive Topological Network Schematic */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-[#080d17] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Compass className="w-4 h-4 text-cyan-400" />
              Dynamic Feeder Corridors (Rayakottai Hub)
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Paved
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Unpaved/Ghat
              </span>
              {crisisActive && (
                <span className="flex items-center gap-1 font-bold text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span> Flooded Road
                </span>
              )}
            </div>
          </div>

          {/* SVG Map / Topological Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-[#0a1120] to-[#060a12] border border-slate-800/80 overflow-hidden p-3 shadow-inner">
            {/* Grid background texture */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Hub Destination College (Center-Right Node) */}
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-auto">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-xl shadow-blue-500/30 flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-[#0b1322] rounded-2xl flex flex-col items-center justify-center p-1">
                    <School className="w-6 h-6 text-cyan-300" />
                    <span className="text-[9px] font-black tracking-widest text-white uppercase mt-0.5">
                      COLLEGE
                    </span>
                  </div>
                </div>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] text-white font-bold items-center justify-center">
                    ★
                  </span>
                </span>
              </div>
              <div className="mt-1 text-center bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-700/80 shadow-md">
                <span className="text-[11px] font-bold text-white block leading-tight">
                  Govt. Model College
                </span>
                <span className="text-[9px] text-cyan-400 leading-tight">Destination Hub</span>
              </div>
            </div>

            {/* SVG Corridors connecting villages to College */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              <defs>
                <linearGradient id="corridorGradPaved" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="corridorGradRough" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="corridorGradCritical" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Flooded Road Highlight Segment between VIL-02 (78, 28) and VIL-04 (62, 72) */}
              {crisisActive && (
                <g>
                  {/* Red Blocked Road Line */}
                  <line
                    x1="78%"
                    y1="28%"
                    x2="62%"
                    y2="72%"
                    stroke="#f43f5e"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    opacity="0.9"
                  />
                  {/* Warning Symbol on Bridge */}
                  <circle cx="70%" cy="50%" r="9" fill="#991b1b" stroke="#f43f5e" strokeWidth="2" />
                  <text
                    x="70%"
                    y="53.5%"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    ✕
                  </text>

                  {/* Alternative Cyan Bypass Arc */}
                  <path
                    d="M 78 28 Q 92 10 50 48"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    strokeDasharray="5 3"
                    className="animate-pulse"
                  />
                </g>
              )}

              {/* Standard corridors to College Center (50%, 48%) */}
              {connectedVillages.map((v) => {
                const isSelected = v.id === selectedVillageId;
                const grad =
                  v.roadConditionType === 'paved'
                    ? 'url(#corridorGradPaved)'
                    : v.roadConditionType === 'critical'
                    ? 'url(#corridorGradCritical)'
                    : 'url(#corridorGradRough)';

                return (
                  <g key={v.id}>
                    <line
                      x1={`${v.coordinates.x}%`}
                      y1={`${v.coordinates.y}%`}
                      x2="50%"
                      y2="48%"
                      stroke={grad}
                      strokeWidth={isSelected ? '3.5' : '2'}
                      strokeDasharray={v.roadConditionType !== 'paved' ? '4 3' : 'none'}
                      opacity={isSelected ? 1 : 0.65}
                    />
                    <circle
                      cx={`${v.coordinates.x * 0.45 + 50 * 0.55}%`}
                      cy={`${v.coordinates.y * 0.45 + 48 * 0.55}%`}
                      r={isSelected ? '5' : '3.5'}
                      fill={v.roadConditionType === 'critical' ? '#f43f5e' : '#38bdf8'}
                      className="animate-pulse"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Feeder Villages Nodes */}
            {connectedVillages.map((village) => {
              const isSelected = village.id === selectedVillageId;
              const isAffectedByFlood =
                crisisActive && (village.id === 'VIL-02' || village.id === 'VIL-04');

              const getBorderColor = () => {
                if (isAffectedByFlood) return 'border-rose-500 bg-rose-950/90 text-rose-200';
                if (village.roadConditionType === 'critical') return 'border-rose-500 bg-rose-950/80';
                if (village.roadConditionType === 'rough') return 'border-amber-500 bg-amber-950/80';
                return 'border-emerald-500 bg-emerald-950/80';
              };

              return (
                <button
                  key={village.id}
                  onClick={() => {
                    setSelectedVillageId(village.id);
                    if (onSelectVillage) onSelectVillage(village);
                  }}
                  style={{
                    left: `${village.coordinates.x}%`,
                    top: `${village.coordinates.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-200 focus:outline-none ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border shadow-lg backdrop-blur-md transition-all ${getBorderColor()} ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#080d17]'
                        : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-white whitespace-nowrap leading-tight flex items-center gap-1">
                        <span>{village.name}</span>
                        {isAffectedByFlood && (
                          <span className="text-[9px] bg-rose-600 px-1 rounded font-black">
                            DETOUR
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] text-slate-300 whitespace-nowrap flex items-center gap-1">
                        <span>{village.distanceKm} km</span>
                        <span>•</span>
                        <span>{village.studentCount} stds</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Route Summary Footer */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {crisisActive
                ? 'Canal flood avoided; Northern Bypass detour active'
                : 'All 6 rural routes active with verified safe corridors'}
            </span>
            <span className="text-[11px] text-slate-400">
              Avg student walking reduction: <strong className="text-white">4.9 km</strong>
            </span>
          </div>
        </div>

        {/* Right: Selected Village Deep Inspector */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-[#0a101d] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Hamlet Feeder Telematics
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                  selectedVillage.status === 'In Transit'
                    ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {selectedVillage.status}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{selectedVillage.name}</span>
                <span className="text-xs font-normal text-slate-400">({selectedVillage.id})</span>
              </h3>
              <p className="text-xs text-cyan-400 font-medium mt-0.5">
                {selectedVillage.routeName} ({selectedVillage.assignedRouteId})
              </p>
            </div>

            {/* Quick Metrics Grid for Hamlet */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-blue-400" /> Distance to College
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {selectedVillage.distanceKm} km
                </div>
                <div className="text-[10px] text-slate-400">ETA: {selectedVillage.etaMinutes} mins</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Footprints className="w-3 h-3 text-emerald-400" /> Walk Eliminated
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-1">
                  {selectedVillage.avgWalkingDistanceReduction.split(' ')[0]} km
                </div>
                <div className="text-[10px] text-slate-400">Doorstep cluster pickup</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Bus className="w-3 h-3 text-cyan-400" /> Vehicle Assigned
                </div>
                <div className="text-xs font-bold text-white mt-1 truncate">
                  {selectedVillage.vehicleName}
                </div>
                <div className="text-[10px] text-cyan-400">{selectedVillage.boardingStatus}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" /> Road Surface
                </div>
                <div className="text-xs font-bold text-slate-200 mt-1 truncate">
                  {selectedVillage.roadCondition}
                </div>
                <div className="text-[10px] text-amber-400">
                  {selectedVillage.dangerPotholes} monitored hazard spots
                </div>
              </div>
            </div>

            {/* AI Real-time Road & Terrain Note */}
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs mb-4">
              <div className="flex items-center gap-1.5 font-semibold text-cyan-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Terrain & Last-Mile Advisory</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {crisisActive && (selectedVillage.id === 'VIL-02' || selectedVillage.id === 'VIL-04')
                  ? 'CRISIS REROUTING: Direct canal culvert is flooded with 2.1 ft water. RouteLess AI dynamically routed this village along NH-844 Ridge Bypass (+4.6 km, simulated +14 mins). All exam candidates protected.'
                  : `${selectedVillage.lastMileIssues}. RouteLess AI has adjusted suspension torque and speed governor to 35 km/h for student transit safety.`}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={() => onSimulateRoute && onSimulateRoute(selectedVillage)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
            >
              <span>{crisisActive ? 'Inspect Crisis Detour' : 'Simulate Route Reroute'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hamlet Quick Strip Horizontal Selector */}
      <div className="p-4 bg-slate-900/40 border-t border-slate-800/80 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Switch Hamlet:
          </span>
          {filteredVillages.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVillageId(v.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                v.id === selectedVillageId
                  ? 'bg-blue-600/30 text-white border-blue-500 shadow-sm shadow-blue-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  v.roadConditionType === 'critical'
                    ? 'bg-rose-400'
                    : v.roadConditionType === 'rough'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span>{v.name}</span>
              <span className="text-[10px] text-slate-400">({v.distanceKm} km)</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
