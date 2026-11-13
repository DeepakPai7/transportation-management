import KpiSection from '../dashboard/KpiSection';
import RouteOverviewSection from '../dashboard/RouteOverviewSection';
import VehicleOccupancySection from '../dashboard/VehicleOccupancySection';
import LiveFeedSection from '../dashboard/LiveFeedSection';

export default function DashboardView({
  onNavigateTab,
  onSelectVillage,
  onSelectVehicle,
  onRebalanceTrigger,
  crisisActive = false,
  crisisData,
  onOpenCrisisView,
}) {
  const handleKpiClick = (kpiId) => {
    if (kpiId.startsWith('crisis-')) {
      onNavigateTab('crisis-mode');
    } else if (kpiId === 'students' || kpiId === 'requests') {
      onNavigateTab('student-portal');
    } else if (kpiId === 'vehicles') {
      const elem = document.getElementById('vehicle-occupancy-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (kpiId === 'seats') {
      onRebalanceTrigger();
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <KpiSection
        onKpiClick={handleKpiClick}
        crisisActive={crisisActive}
        crisisData={crisisData}
      />

      {/* Route Overview Section with Villages Connected to Destination College */}
      <RouteOverviewSection
        onSelectVillage={onSelectVillage}
        onSimulateRoute={() => {
          if (crisisActive) {
            onNavigateTab('crisis-mode');
          } else {
            onNavigateTab('emergency-simulator');
          }
        }}
        crisisActive={crisisActive}
        onOpenCrisisView={onOpenCrisisView}
      />

      {/* Vehicle Occupancy Section with Capacity Indicators */}
      <div id="vehicle-occupancy-section">
        <VehicleOccupancySection
          onVehicleSelect={onSelectVehicle}
          onRebalanceTrigger={onRebalanceTrigger}
          crisisActive={crisisActive}
          crisisData={crisisData}
        />
      </div>

      {/* Live Feed & Rural Impact Index */}
      <LiveFeedSection
        onNavigateToStudentPortal={() => onNavigateTab('student-portal')}
        onNavigateToAi={() => onNavigateTab('ai-assistant')}
      />
    </div>
  );
}
