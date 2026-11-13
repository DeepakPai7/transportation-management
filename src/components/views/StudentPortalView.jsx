import { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  Sparkles,
  Footprints,
  Phone,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';
import { sampleStudents, studentRequests as initialRequests } from '../../data/mockData';

export default function StudentPortalView({ initialSearchQuery = '' }) {
  const [students, setStudents] = useState(sampleStudents);
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState(initialSearchQuery);
  const [genderFilter, setGenderFilter] = useState('all');
  const [villageFilter, setVillageFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApproveRequest = (reqId) => {
    const target = requests.find((r) => r.id === reqId);
    if (!target) return;

    // Add student to roster
    const newStudent = {
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: target.studentName,
      village: target.village,
      gender: target.gender,
      course: target.course,
      year: '1st Year',
      routeId: 'R-04',
      pickupStop: 'Doorstep Feeder Spur (Approved)',
      pickupTime: '07:18 AM',
      walkingSaved: target.distanceToNearestStop.split(' ')[0] + ' km',
      attendanceRate: '100.0%',
      status: 'Boarded',
      rfidTag: `RFID-${Math.floor(100000 + Math.random() * 900000)}`,
      parentContact: 'Logged via District SMS Portal',
    };

    setStudents([newStudent, ...students]);
    setRequests(requests.filter((r) => r.id !== reqId));
    showToast(`Approved last-mile feeder stop for ${target.studentName}! Route recalculated.`);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.village.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());

    const matchesGender = genderFilter === 'all' || s.gender.toLowerCase() === genderFilter;
    const matchesVillage = villageFilter === 'all' || s.village === villageFilter;

    return matchesSearch && matchesGender && matchesVillage;
  });

  const villages = Array.from(new Set(students.map((s) => s.village)));

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-8 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0d1627] to-[#090e1a] border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-400 border border-blue-500/30">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Rural Student Roster & Doorstep Transit Portal
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              1,480 Registered Scholars
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Live attendance tracking, RFID vehicle boarding verification, and automated parental SMS notification logs across 32 feeder hamlets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Student attendance manifest exported to District Education Department CSV.')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Roster CSV</span>
          </button>
        </div>
      </div>

      {/* Pending Doorstep Requests Drawer / Card Box */}
      {requests.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1424] border border-amber-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                <AlertCircle className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-white">
                Pending Last-Mile Doorstep Feeder Requests ({requests.length})
              </h3>
            </div>
            <span className="text-xs text-amber-300 font-medium">
              Requires Transit Officer Approval
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <div className="text-sm font-bold text-white">{req.studentName}</div>
                      <div className="text-xs text-slate-400">
                        {req.village} • <span className="text-cyan-400">{req.course}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      {req.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-2">{req.reason}</p>

                  <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-900/50 text-[11px] text-cyan-300 flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{req.aiRecommendation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setRequests(requests.filter((r) => r.id !== req.id));
                      showToast(`Deferred request for ${req.studentName}`);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200"
                  >
                    Defer
                  </button>
                  <button
                    onClick={() => handleApproveRequest(req.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve AI Route Extension</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name, ID, or hamlet..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:auto">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Genders</option>
            <option value="female">Female Scholars</option>
            <option value="male">Male Scholars</option>
          </select>

          <select
            value={villageFilter}
            onChange={(e) => setVillageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Feeder Hamlets</option>
            {villages.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-2xl bg-[#0b1220] border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Student Info</th>
                <th className="py-3.5 px-4">Feeder Hamlet</th>
                <th className="py-3.5 px-4">Course & Year</th>
                <th className="py-3.5 px-4">Assigned Stop & Route</th>
                <th className="py-3.5 px-4">Walk Saved</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">RFID Status</th>
                <th className="py-3.5 px-4">Parent Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/50 border border-blue-700/40 flex items-center justify-center font-bold text-xs text-cyan-300">
                        {s.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <div>
                        <div className="font-bold text-white">{s.name}</div>
                        <div className="text-[10px] text-slate-400">{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-200">{s.village}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <div>{s.course}</div>
                    <div className="text-[10px] text-slate-400">{s.year}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-cyan-300">{s.routeId}</div>
                    <div className="text-[10px] text-slate-400">{s.pickupStop}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <Footprints className="w-3 h-3" />
                      {s.walkingSaved}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-200">{s.attendanceRate}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-300">
                      <Phone className="w-3 h-3 text-cyan-400" />
                      <span>{s.parentContact.split(' ')[0]}</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">SMS Delivered OK</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
