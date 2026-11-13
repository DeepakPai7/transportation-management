import { useState } from 'react';
import {
  Bus,
  BatteryCharging,
  Fuel,
  Gauge,
  ShieldCheck,
  Sparkles,
  Phone,
  User,
  AlertTriangle,
} from 'lucide-react';
import { fleetVehicles } from '../../data/mockData';

export default function VehicleOccupancySection({
  onVehicleSelect,
  onRebalanceTrigger,
  crisisActive = false,
  crisisData,
}) {
  const [filter, setFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Generate fleet list depending on whether crisis is active
  const baseFleet = fleetVehicles.map((v) => {
    if (crisisActive && (v.id === 'WB-01' || v.id === 'WB-02')) {
      return {
        ...v,
        status: 'CRITICAL BREAKDOWN',
        occupiedSeats: 0,
        usableCapacity: 0,
        isBroken: true,
        breakdownReason:
          v.id === 'WB-01'
            ? 'High-voltage BMS relay fault at Kothanur Bridge'
            : 'Pneumatic air-brake pressure loss near Bellamkonda Ring',
      };
    }
    return { ...v, isBroken: false };
  });

  // If crisis is active, bring backup vehicles into the view list
  const backupFleet = crisisActive && crisisData
    ? [
        {
          id: 'SB-01',
          model: 'Tata Starbus 32 Standby Depot Bus',
          regNo: 'TN-70-EMG-01',
          type: 'Rapid Reserve Bus',
          driverName: 'G. Anand (Depot Reserve)',
          driverContact: '+91 94444-12345',
          assignedRoute: 'Crisis Corridor Alpha: Bellamkonda Bypass',
          currentLocation: 'Bellamkonda Highway Spur',
          capacity: 32,
          occupiedSeats: 32,
          status: 'Emergency Dispatched',
          batteryOrFuel: 100,
          powerType: 'Clean Diesel BS-VI',
          speedKmh: 46,
          maxSafeSpeed: 50,
          safetyGovernor: 'Compliant',
          nextStop: 'Destination College Main Gate',
          etaNextStop: '12 mins',
          comfortIndex: '94%',
          isBackup: true,
        },
        {
          id: 'BV-01',
          model: 'District Rapid Van 1 (Force Traveller 18)',
          regNo: 'TN-70-EMG-02',
          type: 'Authorized Rapid Transit Van',
          driverName: 'K. Loganathan',
          driverContact: '+91 97890-44123',
          assignedRoute: 'Crisis Corridor Beta: Kothanur North Spur',
          currentLocation: 'Kothanur Main Panchayat',
          capacity: 18,
          occupiedSeats: 18,
          status: 'Emergency Dispatched',
          batteryOrFuel: 92,
          powerType: 'Diesel Rapid',
          speedKmh: 40,
          maxSafeSpeed: 45,
          safetyGovernor: 'Compliant',
          nextStop: 'Rayakottai Ring Road',
          etaNextStop: '9 mins',
          comfortIndex: '92%',
          isBackup: true,
        },
        {
          id: 'BV-02',
          model: 'District Backup Van 2 (Tata Winger 20)',
          regNo: 'TN-70-EMG-03',
          type: 'Authorized Rapid Transit Van',
          driverName: 'M. Senthil',
          driverContact: '+91 94433-88771',
          assignedRoute: 'Crisis Corridor Gamma: Channapatna High Road',
          currentLocation: 'Channapatna Bypass Milestone 3',
          capacity: 20,
          occupiedSeats: 20,
          status: 'Emergency Dispatched',
          batteryOrFuel: 88,
          powerType: 'CNG Dual-Fuel',
          speedKmh: 42,
          maxSafeSpeed: 45,
          safetyGovernor: 'Compliant',
          nextStop: 'Canal Bypass Junction',
          etaNextStop: '8 mins',
          comfortIndex: '90%',
          isBackup: true,
        },
        {
          id: 'ST-01',
          model: 'Shared Rural Transit Cruiser 1 (Force Trax 12)',
          regNo: 'TN-70-SH-101',
          type: 'Authorized Shared Rural Vehicle',
          driverName: 'C. Ramanathan',
          driverContact: '+91 98840-22119',
          assignedRoute: 'Crisis Feeder Spur: Bellamkonda East',
          currentLocation: 'Bellamkonda East Hamlets',
          capacity: 12,
          occupiedSeats: 12,
          status: 'Emergency Dispatched',
          batteryOrFuel: 85,
          powerType: 'Diesel 4WD',
          speedKmh: 34,
          maxSafeSpeed: 40,
          safetyGovernor: 'Compliant',
          nextStop: 'Highway Feeder Link',
          etaNextStop: '6 mins',
          comfortIndex: '88%',
          isBackup: true,
        },
      ]
    : [];

  const displayFleet = [...backupFleet, ...baseFleet];

  const filteredFleet = displayFleet.filter((v) => {
    if (filter === 'broken') return v.isBroken;
    if (filter === 'backup') return v.isBackup;
    if (filter === 'high') return v.occupiedSeats / v.capacity >= 0.85;
    if (filter === 'ev') return v.powerType.includes('EV');
    if (filter === 'cruiser') return v.type.includes('4WD') || v.type.includes('Cruiser');
    return true;
  });

  const getCapacityColor = (vehicle) => {
    if (vehicle.isBroken) {
      return {
        bar: 'bg-rose-600',
        badge: 'bg-rose-500 text-white border-rose-600 font-bold',
        text: 'text-rose-400',
        label: 'Unavailable / Breakdown',
      };
    }
    const ratio = vehicle.capacity > 0 ? vehicle.occupiedSeats / vehicle.capacity : 0;
    if (ratio >= 0.95) {
      return {
        bar: 'bg-gradient-to-r from-amber-500 to-rose-500',
        badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        text: 'text-rose-400',
        label: 'Capacity Full (100%)',
      };
    }
    if (ratio >= 0.8) {
      return {
        bar: 'bg-gradient-to-r from-blue-500 to-amber-500',
        badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        text: 'text-amber-400',
        label: 'High Load',
      };
    }
    if (ratio >= 0.5) {
      return {
        bar: 'bg-gradient-to-r from-emerald-500 to-blue-500',
        badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        text: 'text-blue-400',
        label: 'Optimal',
      };
    }
    return {
      bar: 'bg-gradient-to-r from-slate-500 to-emerald-500',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      text: 'text-emerald-400',
      label: 'Standby / Low',
    };
  };

  return (
    <section className="rounded-2xl bg-[#0b1220] border border-slate-800/90 overflow-hidden shadow-xl shadow-black/30">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Bus className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Vehicle Occupancy & Rural Fleet Capacity
            </h2>
            {crisisActive ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                Emergency Reallocation Active
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                Live Telemetry
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {crisisActive
              ? 'Strict zero-overcapacity constraint enforced. Broken buses locked with 0 usable seats; backup fleet mobilized.'
              : 'Real-time passenger load factor, seat availability, battery telemetry, and safety governor compliance.'}
          </p>
        </div>

        {/* Filter Controls & AI Rebalance Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Fleet ({displayFleet.length})
            </button>
            {crisisActive && (
              <>
                <button
                  onClick={() => setFilter('broken')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    filter === 'broken'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-rose-400 hover:text-rose-300'
                  }`}
                >
                  Broken (2)
                </button>
                <button
                  onClick={() => setFilter('backup')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    filter === 'backup'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  Backup Dispatched (4)
                </button>
              </>
            )}
            <button
              onClick={() => setFilter('high')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                filter === 'high'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Load &gt; 85%
            </button>
            <button
              onClick={() => setFilter('ev')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                filter === 'ev'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Electric (EV)
            </button>
          </div>

          <button
            onClick={() => onRebalanceTrigger && onRebalanceTrigger()}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>AI Rebalance Fleet</span>
          </button>
        </div>
      </div>

      {/* Fleet Capacity Summary Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-800/80 bg-slate-900/40 divide-x divide-slate-800/60 text-xs">
        <div className="p-3 sm:p-4">
          <div className="text-slate-400">Total Fleet Units</div>
          <div className="text-lg font-bold text-white mt-0.5">
            {crisisActive ? '9 Emergency Active' : '28 Fleet Units'}
          </div>
          <div className="text-[10px] text-slate-400">
            {crisisActive ? '4 Baseline + 5 Backup/Shared' : 'Allocated in Rayakottai'}
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="text-slate-400">Broken Down Buses</div>
          <div
            className={`text-lg font-bold mt-0.5 ${crisisActive ? 'text-rose-400' : 'text-emerald-400'}`}
          >
            {crisisActive ? '2 Buses (0 Usable Seats)' : '0 (100% Operational)'}
          </div>
          <div className="text-[10px] text-slate-400">
            {crisisActive ? 'WB-01 & WB-02 Locked' : 'No Mechanical Faults'}
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="text-slate-400">Emergency Backup Capacity</div>
          <div className="text-lg font-bold text-cyan-400 mt-0.5">
            {crisisActive ? '94 Backup Seats' : '32 Seats Ready'}
          </div>
          <div className="text-[10px] text-slate-400">
            {crisisActive ? 'Dispatched across 3 spurs' : 'Depot Bay 2 Standby'}
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="text-slate-400">Overcrowding Violation</div>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">0 Violations</div>
          <div className="text-[10px] text-emerald-400">Strict Capacity Compliance</div>
        </div>
      </div>

      {/* Vehicle Grid Cards */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredFleet.map((vehicle) => {
          const isBroken = vehicle.isBroken;
          const isBackup = vehicle.isBackup;
          const occupancyRatio =
            !isBroken && vehicle.capacity > 0 ? vehicle.occupiedSeats / vehicle.capacity : 0;
          const occupancyPercent = Math.round(occupancyRatio * 100);
          const capStyle = getCapacityColor(vehicle);
          const isEv = vehicle.powerType ? vehicle.powerType.includes('EV') : false;

          return (
            <div
              key={vehicle.id}
              onClick={() => {
                setSelectedVehicle(vehicle);
                if (onVehicleSelect) onVehicleSelect(vehicle);
              }}
              className={`rounded-2xl border p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer ${
                isBroken
                  ? 'bg-rose-950/20 border-rose-500/50 hover:border-rose-500/80'
                  : isBackup
                  ? 'bg-cyan-950/20 border-cyan-500/40 hover:border-cyan-500/70'
                  : 'bg-[#0e1626] border-slate-800 hover:border-slate-700/80'
              }`}
            >
              {/* Card Top: Reg, Model, Status Badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-white">{vehicle.id}</span>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {vehicle.regNo}
                      </span>
                      {isBackup && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500 text-black">
                          BACKUP
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-0.5 line-clamp-1">
                      {vehicle.model}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${capStyle.badge}`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="text-[11px] text-cyan-400 font-medium mb-3 truncate">
                  {vehicle.assignedRoute}
                </div>

                {isBroken ? (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-xs text-rose-200 mb-3 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Zero Usable Seats (Unavailable)</span>
                    </div>
                    <p className="text-[11px] text-rose-300">{vehicle.breakdownReason}</p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Passengers safely redistributed to backup fleet.
                    </div>
                  </div>
                ) : (
                  /* Capacity Meter Indicator */
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <span>Occupancy:</span>
                        <strong className="text-white">
                          {vehicle.occupiedSeats} / {vehicle.capacity} seats
                        </strong>
                      </span>
                      <span className={`font-bold ${capStyle.text}`}>
                        {occupancyPercent}% ({capStyle.label})
                      </span>
                    </div>

                    {/* Progress Bar with Visual Fill */}
                    <div className="w-full bg-slate-800/90 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${capStyle.bar}`}
                        style={{ width: `${Math.min(100, Math.max(4, occupancyPercent))}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>
                        {vehicle.capacity - vehicle.occupiedSeats > 0
                          ? `${vehicle.capacity - vehicle.occupiedSeats} seats available`
                          : 'No spare seats (Max capacity)'}
                      </span>
                      <span>Comfort: {vehicle.comfortIndex || '92%'}</span>
                    </div>
                  </div>
                )}

                {/* Telemetry row */}
                {!isBroken && (
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        {isEv ? (
                          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Fuel className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{isEv ? 'Battery' : 'Fuel'}</span>
                      </span>
                      <span className="font-bold text-slate-200">{vehicle.batteryOrFuel}%</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Gauge className="w-3.5 h-3.5 text-blue-400" />
                        <span>Live Speed</span>
                      </span>
                      <span className="font-bold text-slate-200">
                        {vehicle.speedKmh}{' '}
                        <span className="text-[9px] text-slate-400 font-normal">km/h</span>
                      </span>
                    </div>
                  </div>
                )}

                {!isBroken && (
                  <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 truncate">Next Stop:</span>
                      <span className="font-medium text-slate-200 truncate ml-1">
                        {vehicle.nextStop}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">ETA to Stop:</span>
                      <span className="text-cyan-400 font-semibold">{vehicle.etaNextStop}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Driver & Telematics */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-300 font-medium truncate">{vehicle.driverName}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-400 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Governor OK</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Vehicle Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0d1524] border border-slate-700/80 shadow-2xl p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">{selectedVehicle.id}</span>
                  <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-cyan-400">
                    {selectedVehicle.regNo}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{selectedVehicle.model}</div>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Feeder Corridor:</span>
                  <span className="font-semibold text-white">{selectedVehicle.assignedRoute}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current GPS Milestone:</span>
                  <span className="font-medium text-slate-300">{selectedVehicle.currentLocation}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Driver In-Charge</div>
                  <div className="font-bold text-white text-sm mt-1">
                    {selectedVehicle.driverName}
                  </div>
                  <div className="text-cyan-400 text-[11px] mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {selectedVehicle.driverContact}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Safety Telematics</div>
                  <div className="font-bold text-emerald-400 text-sm mt-1">
                    {selectedVehicle.safetyGovernor || 'Compliant'}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Max Safe Speed: {selectedVehicle.maxSafeSpeed} km/h
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
