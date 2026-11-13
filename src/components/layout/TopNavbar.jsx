import { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  Shield,
  Clock,
  RefreshCw,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { destinationCollege, liveNotifications as initialNotifications } from '../../data/mockData';

export default function TopNavbar({
  mobileOpen,
  setMobileOpen,
  searchQuery,
  setSearchQuery,
  onEmergencyClick,
  crisisActive = false,
  onActivateCrisis,
  onOpenCrisisView,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-[#090e1a]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Project Branding */}
      <div className="flex items-center gap-3 lg:gap-5 min-w-0">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/70 border border-slate-700/60 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
              RouteLess <span className="text-cyan-400">AI</span>
              <span className="hidden sm:inline text-slate-400 font-normal">|</span>
              <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                The Last Mile
              </span>
            </h1>

            {crisisActive ? (
              <button
                onClick={onOpenCrisisView}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-[11px] text-rose-300 font-bold animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                <span>EXAM DAY CRISIS ACTIVE (4 ALERTS)</span>
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>AI Autonomous Dispatch Active</span>
              </div>
            )}
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate max-w-md">
              Hub Destination:{' '}
              <span className="text-slate-200 font-medium">{destinationCollege.name}</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{destinationCollege.hub}</span>
          </div>
        </div>
      </div>

      {/* Middle: Quick Search Filter */}
      <div className="hidden md:flex flex-1 max-w-md mx-2">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feeder villages, bus IDs, drivers, or students..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-700/70 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Prominent Crisis Toggle / Trigger */}
        {!crisisActive ? (
          <button
            onClick={onActivateCrisis}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-extrabold shadow-md shadow-rose-600/30 transition-all hover:scale-105"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Activate Exam Crisis</span>
            <span className="sm:hidden">Crisis</span>
          </button>
        ) : (
          <button
            onClick={onOpenCrisisView}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/40 animate-pulse transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Crisis Center</span>
          </button>
        )}

        {/* Refresh Telemetry Button */}
        <button
          onClick={handleRefreshTelemetry}
          title="Refresh AI & IoT Telematics"
          className="p-2 text-slate-400 hover:text-cyan-400 rounded-xl hover:bg-slate-800/60 border border-slate-800 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
        </button>

        {/* Emergency Simulator Quick Trigger */}
        <button
          onClick={onEmergencyClick}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition-all"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulators</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="relative p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/80 border border-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {(unreadCount > 0 || crisisActive) && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-lg shadow-rose-500/40 animate-pulse">
                {crisisActive ? '!' : unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0c1322] border border-slate-700/80 shadow-2xl shadow-black/80 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white">Live Route Alerts</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-cyan-300">
                    {unreadCount} alerts
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {crisisActive && (
                  <div className="p-3.5 bg-rose-950/40 border-b border-rose-900/60">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">
                          CRITICAL: Exam Day Crisis Active
                        </div>
                        <p className="text-[11px] text-rose-200 mt-0.5">
                          WB-01 & WB-02 down. Canal bridge flooded. 40% surge applied.
                        </p>
                        <button
                          onClick={() => {
                            onOpenCrisisView();
                            setNotificationsOpen(false);
                          }}
                          className="mt-2 text-[10px] font-bold px-2 py-1 rounded bg-rose-600 text-white flex items-center gap-1"
                        >
                          <span>Open Crisis Allocation Plan</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {notifications.map((item) => {
                  const getIcon = () => {
                    switch (item.type) {
                      case 'warning':
                        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
                      case 'emergency':
                        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
                      case 'success':
                        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
                      default:
                        return <Info className="w-4 h-4 text-blue-400" />;
                    }
                  };

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 hover:bg-slate-800/40 transition-colors ${
                        !item.read ? 'bg-blue-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                          {getIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-semibold text-xs text-slate-200">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {item.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-2">
                            {item.message}
                          </p>
                          {item.action && (
                            <button
                              onClick={() => {
                                onEmergencyClick();
                                setNotificationsOpen(false);
                              }}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1"
                            >
                              <span>{item.action}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 pt-2 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-400">
                  Connected to District Emergency Radio Channel #4
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-blue-600/30">
              AR
            </div>
            <div className="hidden xl:block text-left pr-1">
              <div className="text-xs font-semibold text-white leading-tight">Dr. Aruna Rao</div>
              <div className="text-[10px] text-cyan-400 leading-tight">Lead Transit Coordinator</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#0c1322] border border-slate-700/80 shadow-2xl shadow-black/80 p-4 z-50">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-sm text-white">
                  AR
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">Dr. Aruna Rao</div>
                  <div className="text-xs text-cyan-400">Rural Education Logistics Lead</div>
                  <div className="text-[10px] text-slate-400">District Student Welfare Office</div>
                </div>
              </div>

              <div className="py-2.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" /> Security Clearance
                  </span>
                  <span className="font-semibold text-emerald-400">District Admin</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> Shift Status
                  </span>
                  <span className="font-medium text-slate-200">
                    {crisisActive ? 'CRISIS OVERRIDE ACTIVE' : 'Active (Morning Window)'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                  <span className="font-semibold text-cyan-300 block mb-0.5">AI Policy Directive:</span>
                  Zero examination students stranded; backup fleet mobilized.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
