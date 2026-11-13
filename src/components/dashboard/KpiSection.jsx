import {
  Users,
  Bus,
  Armchair,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';
import { kpiMetrics } from '../../data/mockData';

export default function KpiSection({ onKpiClick, crisisActive = false, crisisData }) {
  const { registeredStudents, activeVehicles, availableSeats, pendingRequests } = kpiMetrics;

  const cards = crisisActive && crisisData
    ? [
        {
          id: 'crisis-students',
          title: 'Total Student Demand (Surged)',
          value: crisisData.macroStats.totalCrisisDemand.toLocaleString(),
          badgeText: `+${crisisData.macroStats.surgePercentage}% Surge`,
          badgeType: 'warning',
          subtitle: `Baseline 1,480 + ${crisisData.macroStats.surgeStudentCount} Extra Exam Surge Requests`,
          icon: Users,
          accentColor: 'amber',
          glowClass: 'from-amber-600/20 to-rose-600/5',
          borderColor: 'border-amber-500/50 hover:border-amber-500/80',
          iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
          stats: [
            { label: 'Surge Increment', value: `+${crisisData.macroStats.surgeStudentCount} (+40.0%)` },
            { label: 'Tracked Manifest', value: '70 Total Requests' },
          ],
          aiNote: 'Dynamic surge requests calculated across 32 feeder hamlets.',
        },
        {
          id: 'crisis-vehicles',
          title: 'Fleet Operational Status',
          value: `${crisisData.macroStats.totalActiveFleetUnits} Active Units`,
          badgeText: '2 Buses Broken Down',
          badgeType: 'alert',
          subtitle: 'WB-01 & WB-02 Unavailable; 5 Backup Dispatched',
          icon: Bus,
          accentColor: 'rose',
          glowClass: 'from-rose-600/20 to-red-600/5',
          borderColor: 'border-rose-500/50 hover:border-rose-500/80',
          iconBg: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
          stats: [
            { label: 'Broken Buses', value: '2 Units (0 Usable Seats)' },
            { label: 'Backup Mobilized', value: '5 Units (94 Seats)' },
          ],
          aiNote: 'Zero broken-bus passenger allocations permitted.',
        },
        {
          id: 'crisis-seats',
          title: 'Reallocated Capacity',
          value: '156 Usable Seats',
          badgeText: '100% Load Safe',
          badgeType: 'positive',
          subtitle: 'Zero Overcrowding Constraint Verified',
          icon: Armchair,
          accentColor: 'cyan',
          glowClass: 'from-cyan-600/20 to-blue-600/5',
          borderColor: 'border-cyan-500/50 hover:border-cyan-500/80',
          iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
          stats: [
            { label: 'Overcapacity Violations', value: '0 (Strict Limit)' },
            { label: 'Backup Depot Reserve', value: 'SB-01 + 2 Vans + 2 Cruisers' },
          ],
          aiNote: 'Capacity dynamically partitioned by route proximity.',
        },
        {
          id: 'crisis-exams',
          title: 'Exam Students Secured',
          value: `${crisisData.tierCounts.tier1.allocated + crisisData.tierCounts.tier2.allocated} Candidates`,
          badgeText: '100% On-Time Arrival',
          badgeType: 'positive',
          subtitle: 'Session 1 (09:00 AM) & Session 2 (10:00 AM)',
          icon: GraduationCap,
          accentColor: 'indigo',
          glowClass: 'from-indigo-600/20 to-purple-600/5',
          borderColor: 'border-indigo-500/50 hover:border-indigo-500/80',
          iconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
          stats: [
            { label: 'Tier 1 Imminent (<1h)', value: `${crisisData.tierCounts.tier1.allocated}/${crisisData.tierCounts.tier1.total} Boarded` },
            { label: 'Tier 2 (<2h Exams)', value: `${crisisData.tierCounts.tier2.allocated}/${crisisData.tierCounts.tier2.total} Boarded` },
          ],
          aiNote: '0 imminent exam scholars stranded on roadsides.',
        },
      ]
    : [
        {
          id: 'students',
          title: 'Registered Students',
          value: registeredStudents.total.toLocaleString(),
          badgeText: registeredStudents.change,
          badgeType: 'positive',
          subtitle: registeredStudents.subtitle,
          icon: Users,
          accentColor: 'blue',
          glowClass: 'from-blue-600/20 to-cyan-600/5',
          borderColor: 'border-blue-500/30 hover:border-blue-500/60',
          iconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
          stats: [
            { label: 'Female Scholars', value: `${registeredStudents.breakdown.femaleStudents} (60%)` },
            { label: '1st-Gen Learners', value: registeredStudents.breakdown.firstGenerationScholars },
          ],
          aiNote: 'Zero dropouts reported this semester due to guaranteed transit.',
        },
        {
          id: 'vehicles',
          title: 'Active Vehicles',
          value: `${activeVehicles.active} / ${activeVehicles.total}`,
          badgeText: activeVehicles.onTimeRate + ' On-Time',
          badgeType: 'positive',
          subtitle: activeVehicles.status,
          icon: Bus,
          accentColor: 'emerald',
          glowClass: 'from-emerald-600/20 to-teal-600/5',
          borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
          iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          stats: [
            { label: 'Telematics Synced', value: '100% (24/24)' },
            { label: 'Fleet Power', value: '14 EVs • 10 4WDs' },
          ],
          aiNote: 'Real-time GPS & incline sensors continuously monitored.',
        },
        {
          id: 'seats',
          title: 'Available Seats',
          value: availableSeats.available.toLocaleString(),
          badgeText: `${availableSeats.occupancyRate}% Load`,
          badgeType: 'neutral',
          subtitle: availableSeats.subtitle,
          icon: Armchair,
          accentColor: 'indigo',
          glowClass: 'from-indigo-600/20 to-purple-600/5',
          borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
          iconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
          stats: [
            { label: 'Total Fleet Capacity', value: availableSeats.totalCapacity },
            { label: 'AI Rebalanced', value: availableSeats.change },
          ],
          aiNote: 'Dynamic seat pooling actively prevents overcrowding.',
        },
        {
          id: 'requests',
          title: 'Pending Requests',
          value: pendingRequests.total.toLocaleString(),
          badgeText: `${pendingRequests.urgent} Urgent`,
          badgeType: 'warning',
          subtitle: pendingRequests.subtitle,
          icon: Clock,
          accentColor: 'amber',
          glowClass: 'from-amber-600/20 to-rose-600/5',
          borderColor: 'border-amber-500/30 hover:border-amber-500/60',
          iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
          stats: [
            { label: 'Avg Walk Saved', value: pendingRequests.avgWalkingDistSaved },
            { label: 'Route Cluster Status', value: pendingRequests.change },
          ],
          aiNote: '5 remote forest households waiting doorstep shuttle loop.',
        },
      ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>{crisisActive ? 'Crisis Real-Time Telematics & Surge Impact' : 'Key Operational Indicators'}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${crisisActive ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`}></span>
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{crisisActive ? 'Dynamic Optimization Active' : 'Updated 42 seconds ago'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onKpiClick && onKpiClick(card.id)}
              className={`group relative rounded-2xl bg-gradient-to-b ${card.glowClass} bg-[#0e1626] border ${card.borderColor} p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl ${card.iconBg} transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      card.badgeType === 'positive'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : card.badgeType === 'warning'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : card.badgeType === 'alert'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                    }`}
                  >
                    {card.badgeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                    {card.badgeType === 'warning' && <AlertCircle className="w-3 h-3" />}
                    {card.badgeType === 'alert' && <AlertCircle className="w-3 h-3 text-rose-400" />}
                    {card.badgeText}
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-400">{card.title}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5 flex items-baseline gap-2">
                  <span>{card.value}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span>{card.subtitle}</span>
                </div>
              </div>

              {/* Sub-stats breakdown */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {card.stats.map((stat, i) => (
                    <div key={i} className="bg-slate-900/60 rounded-lg p-2 border border-slate-800/60">
                      <div className="text-slate-400 truncate">{stat.label}</div>
                      <div className="font-semibold text-slate-200 mt-0.5 truncate">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors pt-1">
                  <span className="truncate pr-1 italic">{card.aiNote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
