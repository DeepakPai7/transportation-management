import {
  LayoutDashboard,
  Users,
  Route,
  AlertTriangle,
  Bot,
  Compass,
  Bus,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Radio,
  X,
  ShieldAlert,
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  pendingRequestCount = 19,
  emergencyAlertCount = 1,
  crisisActive = false,
}) {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Fleet & Rural Network',
    },
    {
      id: 'crisis-mode',
      label: 'Exam Day Crisis',
      icon: ShieldAlert,
      badge: crisisActive ? 'ACTIVE (4 ALERTS)' : 'Challenge',
      badgeColor: crisisActive
        ? 'bg-rose-500 text-white border-rose-600 animate-pulse font-extrabold'
        : 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      description: '4 Simultaneous Incidents',
    },
    {
      id: 'student-portal',
      label: 'Student Portal',
      icon: Users,
      badge: `${pendingRequestCount} New`,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Roster & Doorstep Requests',
    },
    {
      id: 'route-planner',
      label: 'Route Planner',
      icon: Route,
      badge: 'AI Opt',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      description: 'Terrain & Dynamic Corridors',
    },
    {
      id: 'emergency-simulator',
      label: 'Emergency Simulator',
      icon: AlertTriangle,
      badge: emergencyAlertCount > 0 ? 'Live Sim' : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse',
      description: 'Monsoon & Roadblock Testing',
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      badge: 'GPT-Rural',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      description: 'Last-Mile Copilot',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#090e1a] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#090e1a]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                  RouteLess <span className="text-cyan-400">AI</span>
                </span>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                The Last Mile Platform
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Operational Context Sub-banner */}
        <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${crisisActive ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></div>
            <div>
              <div className="text-[11px] font-semibold text-slate-200">
                {crisisActive ? 'CRISIS REALLOCATION' : 'Rayakottai Cluster'}
              </div>
              <div className="text-[10px] text-slate-400">
                {crisisActive ? '4 Simultaneous Incidents' : '32 Feeder Hamlets • 1 College'}
              </div>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              crisisActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}
          >
            {crisisActive ? 'Crisis Active' : 'Live Dispatch'}
          </span>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations Console
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full group relative flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? item.id === 'crisis-mode' && crisisActive
                      ? 'bg-gradient-to-r from-rose-600/30 via-red-700/20 to-transparent text-white border-l-4 border-rose-500 shadow-sm shadow-rose-500/20'
                      : 'bg-gradient-to-r from-blue-600/25 via-blue-700/15 to-transparent text-white border-l-4 border-blue-500 shadow-sm shadow-blue-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? item.id === 'crisis-mode'
                          ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
                          : 'bg-blue-500/20 text-cyan-400 ring-1 ring-blue-500/30'
                        : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight">{item.label}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live System Status Widget at Bottom */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 m-3 rounded-2xl border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">
                {crisisActive ? 'Crisis Optimizer v3.1' : 'AI Routing Core v2.4'}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold ${
                crisisActive ? 'text-amber-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {crisisActive ? 'Surge +40%' : '99.8% Sync'}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                crisisActive
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 w-[100%] animate-pulse'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 w-[94%]'
              }`}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Bus className="w-3 h-3 text-slate-400" />{' '}
              {crisisActive ? '2 Down • 5 Backup' : '24 Active Fleet'}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />{' '}
              {crisisActive ? 'Exams Safe' : 'SOS Safe'}
            </span>
          </div>
        </div>

        {/* Bottom Profile Footer */}
        <div className="px-5 py-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Radio
              className={`w-3 h-3 ${crisisActive ? 'text-rose-400' : 'text-cyan-400'} animate-pulse`}
            />{' '}
            Telemetry: {crisisActive ? 'Crisis Channel' : 'Online'}
          </span>
          <span className="text-[10px] text-slate-400">District Grid #7</span>
        </div>
      </aside>
    </>
  );
}
