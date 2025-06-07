import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, User, MapPin, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface Appointment {
  id: string;
  appointmentId: string;
  date: string;
  time: string;
  doctor: {
    name: string;
    specialty: string;
    avatar?: string;
  };
  patient: {
    name: string;
    age: number;
    phone: string;
  };
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Missed';
  type: 'Video Call' | 'In-Person';
  location?: string;
}

const AllAppointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');

  // Sample data
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      appointmentId: 'APT-2025-001',
      date: '2025-06-05',
      time: '10:00 AM',
      doctor: {
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiologist'
      },
      patient: {
        name: 'John Smith',
        age: 45,
        phone: '+91-9876543210'
      },
      status: 'Scheduled',
      type: 'Video Call'
    },
    {
      id: '2',
      appointmentId: 'APT-2025-002',
      date: '2025-06-05',
      time: '11:30 AM',
      doctor: {
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist'
      },
      patient: {
        name: 'Emma Johnson',
        age: 32,
        phone: '+91-9876543211'
      },
      status: 'Completed',
      type: 'In-Person',
      location: 'Apollo Hospital, Chennai'
    },
    {
      id: '3',
      appointmentId: 'APT-2025-003',
      date: '2025-06-04',
      time: '3:00 PM',
      doctor: {
        name: 'Dr. Priya Sharma',
        specialty: 'Pediatrician'
      },
      patient: {
        name: 'Baby Kumar',
        age: 2,
        phone: '+91-9876543212'
      },
      status: 'Missed',
      type: 'Video Call'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Missed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter;
    const matchesDoctor = !doctorFilter || appointment.doctor.name.toLowerCase().includes(doctorFilter.toLowerCase());
    const matchesDate = !dateFilter || appointment.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] text-sm"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Missed">Missed</option>
          </select>

          {/* Date Filter */}
          <input
            type="date"
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] text-sm"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          {/* Doctor Filter */}
          <input
            type="text"
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] text-sm"
            placeholder="Filter by doctor..."
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              All Appointments ({filteredAppointments.length})
            </h3>
            <button className="bg-[#49A097] text-white px-4 py-2 rounded-lg hover:bg-[#49A097]/90 transition-colors text-sm font-medium">
              Export Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Appointment Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {appointment.appointmentId}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {appointment.doctor.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {appointment.doctor.specialty}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {appointment.patient.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        Age: {appointment.patient.age} • {appointment.patient.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">
                      {appointment.type}
                      {appointment.location && (
                        <div className="text-xs text-slate-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {appointment.location}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-amber-600 hover:text-amber-900 p-1 hover:bg-amber-50 rounded transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-slate-600 hover:text-slate-900 p-1 hover:bg-slate-50 rounded transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-500">No appointments found matching your criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;