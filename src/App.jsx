import { useState, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopNavbar from './components/layout/TopNavbar';
import DashboardView from './components/views/DashboardView';
import StudentPortalView from './components/views/StudentPortalView';
import RoutePlannerView from './components/views/RoutePlannerView';
import EmergencySimulatorView from './components/views/EmergencySimulatorView';
import AiAssistantView from './components/views/AiAssistantView';
import CrisisModeView from './components/views/CrisisModeView';
import CrisisAlertBanner from './components/crisis/CrisisAlertBanner';
import { runCrisisOptimization } from './services/crisisOptimizer';
import { Sparkles, CheckCircle2, X } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [rebalanceStage, setRebalanceStage] = useState('idle');

  // Crisis Mode State
  const [crisisActive, setCrisisActive] = useState(false);

  // Deterministic crisis state computed via pure heuristic engine
  const crisisData = useMemo(() => {
    return runCrisisOptimization();
  }, []);

  const handleActivateCrisis = () => {
    setCrisisActive(true);
    setActiveTab('crisis-mode');
  };

  const handleDeactivateCrisis = () => {
    setCrisisActive(false);
    if (activeTab === 'crisis-mode') {
      setActiveTab('dashboard');
    }
  };

  const handleTriggerRebalance = () => {
    setShowRebalanceModal(true);
    setRebalanceStage('processing');
    setTimeout(() => {
      setRebalanceStage('done');
    }, 1400);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'crisis-mode':
        return (
          <CrisisModeView
            crisisActive={crisisActive}
            onActivateCrisis={handleActivateCrisis}
            onDeactivateCrisis={handleDeactivateCrisis}
            crisisData={crisisData}
            initialSearchQuery={searchQuery}
          />
        );
      case 'student-portal':
        return <StudentPortalView initialSearchQuery={searchQuery} />;
      case 'route-planner':
        return <RoutePlannerView />;
      case 'emergency-simulator':
        return <EmergencySimulatorView />;
      case 'ai-assistant':
        return <AiAssistantView />;
      case 'dashboard':
      default:
        return (
          <DashboardView
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectVillage={() => {}}
            onSelectVehicle={() => {}}
            onEmergencyClick={() => setActiveTab('emergency-simulator')}
            onRebalanceTrigger={handleTriggerRebalance}
            crisisActive={crisisActive}
            crisisData={crisisData}
            onOpenCrisisView={() => setActiveTab('crisis-mode')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Responsive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        pendingRequestCount={19}
        emergencyAlertCount={crisisActive ? 4 : 1}
        crisisActive={crisisActive}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Top Navigation Bar */}
        <TopNavbar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onEmergencyClick={() => setActiveTab('emergency-simulator')}
          crisisActive={crisisActive}
          onActivateCrisis={handleActivateCrisis}
          onOpenCrisisView={() => setActiveTab('crisis-mode')}
        />

        {/* Exam Day Crisis Global Alert Banner */}
        <CrisisAlertBanner
          crisisActive={crisisActive}
          onActivateCrisis={handleActivateCrisis}
          onDeactivateCrisis={handleDeactivateCrisis}
          onOpenCrisisView={() => setActiveTab('crisis-mode')}
          crisisData={crisisData}
        />

        {/* Page Body View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderActiveView()}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-[#090e1a]/80 py-4 px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-400">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-slate-300">RouteLess AI – The Last Mile</span>
            <span>•</span>
            <span>District Rural Student Mobility & Safety Engine</span>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span>District Model College Hub</span>
            <span className={crisisActive ? 'text-amber-400 font-bold' : ''}>
              {crisisActive ? 'CRISIS REALLOCATION ACTIVE' : 'Zero-Stranded Safety Guarantee'}
            </span>
            <span>Telemetry Latency: &lt;200ms</span>
          </div>
        </footer>
      </div>

      {/* AI Rebalance Fleet Modal */}
      {showRebalanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-[#0c1424] border border-slate-700/80 shadow-2xl p-6 text-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">AI Fleet Load Rebalancer</h3>
                  <p className="text-[11px] text-slate-400">Autonomous Capacity Optimization</p>
                </div>
              </div>
              <button
                onClick={() => setShowRebalanceModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 text-xs space-y-3">
              {rebalanceStage === 'processing' ? (
                <div className="py-6 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  <div className="text-sm font-semibold text-white">Analyzing Passenger Load...</div>
                  <p className="text-slate-400 text-xs max-w-xs">
                    Cross-referencing 32 hamlets, road elevations, and battery states of charge.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-in zoom-in-95 duration-150">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-xs">
                        Optimization Successfully Applied
                      </div>
                      <div className="text-[11px] mt-0.5 text-emerald-300 leading-relaxed">
                        Reallocated 18 seats from Eastern Arterial (WB-02) to high-demand Yelagiri
                        Foothills (ES-03).
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Peak Load Reduction:</span>
                      <span className="font-bold text-cyan-400">96.4% → 89.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Overcrowding Risk:</span>
                      <span className="font-bold text-emerald-400">Zero (0 buses in alert)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Standby Intercept:</span>
                      <span className="font-bold text-white">Depot Bay 2 armed</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowRebalanceModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
