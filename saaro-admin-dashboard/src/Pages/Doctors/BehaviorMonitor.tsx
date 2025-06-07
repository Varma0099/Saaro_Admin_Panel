import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  AlertTriangle,
  Clock,
  UserX,
  Star,
  TrendingDown,
  Eye,
  MessageSquare,
  Calendar,
  Phone,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Activity,
  BarChart3,
  Users
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DoctorBehavior {
  id: string;
  name: string;
  specialty: string;
  city: string;
  hospital: string;
  profileImage?: string;
  delayedAppointments: number;
  noShows: number;
  complaints: number;
  averageRating: number;
  totalAppointments: number;
  joinDelayMinutes: number;
  consultDurationMinutes: number;
  responseTime: number;
  lastActiveDate: string;
  warningsIssued: number;
  status: 'active' | 'warned' | 'flagged';
  riskScore: number;
}

interface AppointmentHistory {
  id: string;
  date: string;
  patientName: string;
  scheduledTime: string;
  joinedTime?: string;
  duration: number;
  status: 'completed' | 'no_show' | 'delayed' | 'cancelled';
  patientRating?: number;
  patientFeedback?: string;
  issues?: string[];
}

interface BehaviorTrend {
  month: string;
  delays: number;
  noShows: number;
  rating: number;
  complaints: number;
}

const BehaviorMonitor: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorBehavior | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sample data
  const doctorBehaviors: DoctorBehavior[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology',
      city: 'Mumbai',
      hospital: 'Apollo Hospital',
      delayedAppointments: 15,
      noShows: 3,
      complaints: 8,
      averageRating: 3.2,
      totalAppointments: 120,
      joinDelayMinutes: 12,
      consultDurationMinutes: 18,
      responseTime: 45,
      lastActiveDate: '2024-05-25T14:30:00',
      warningsIssued: 2,
      status: 'flagged',
      riskScore: 85
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      city: 'Delhi',
      hospital: 'Max Hospital',
      delayedAppointments: 8,
      noShows: 1,
      complaints: 3,
      averageRating: 4.1,
      totalAppointments: 95,
      joinDelayMinutes: 5,
      consultDurationMinutes: 22,
      responseTime: 15,
      lastActiveDate: '2024-05-25T16:20:00',
      warningsIssued: 1,
      status: 'warned',
      riskScore: 45
    },
    {
      id: '3',
      name: 'Dr. Amit Patel',
      specialty: 'Neurology',
      city: 'Bangalore',
      hospital: 'Fortis Hospital',
      delayedAppointments: 5,
      noShows: 0,
      complaints: 1,
      averageRating: 4.6,
      totalAppointments: 80,
      joinDelayMinutes: 3,
      consultDurationMinutes: 25,
      responseTime: 8,
      lastActiveDate: '2024-05-25T18:45:00',
      warningsIssued: 0,
      status: 'active',
      riskScore: 20
    }
  ];

  const behaviorTrends: BehaviorTrend[] = [
    { month: 'Jan', delays: 8, noShows: 2, rating: 4.2, complaints: 3 },
    { month: 'Feb', delays: 12, noShows: 3, rating: 3.9, complaints: 5 },
    { month: 'Mar', delays: 15, noShows: 4, rating: 3.5, complaints: 7 },
    { month: 'Apr', delays: 18, noShows: 5, rating: 3.2, complaints: 8 },
    { month: 'May', delays: 15, noShows: 3, rating: 3.2, complaints: 8 }
  ];

  const appointmentHistory: AppointmentHistory[] = [
    {
      id: '1',
      date: '2024-05-25',
      patientName: 'John Doe',
      scheduledTime: '10:00 AM',
      joinedTime: '10:15 AM',
      duration: 18,
      status: 'completed',
      patientRating: 3,
      patientFeedback: 'Doctor was late but consultation was good',
      issues: ['Late arrival']
    },
    {
      id: '2',
      date: '2024-05-24',
      patientName: 'Jane Smith',
      scheduledTime: '2:00 PM',
      duration: 0,
      status: 'no_show',
      issues: ['Doctor did not join']
    },
    {
      id: '3',
      date: '2024-05-23',
      patientName: 'Mike Wilson',
      scheduledTime: '11:30 AM',
      joinedTime: '11:45 AM',
      duration: 15,
      status: 'completed',
      patientRating: 2,
      patientFeedback: 'Very rushed consultation, felt unheard',
      issues: ['Late arrival', 'Rushed consultation']
    }
  ];

  const specialties = ['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics', 'Dermatology'];
  const statuses = ['active', 'warned', 'flagged'];

  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctorBehaviors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !selectedStatus || doctor.status === selectedStatus;
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;

      return matchesSearch && matchesStatus && matchesSpecialty;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof DoctorBehavior];
      let bValue: any = b[sortBy as keyof DoctorBehavior];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedStatus, selectedSpecialty, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: string, riskScore: number) => {
    if (status === 'flagged' || riskScore >= 70) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">High Risk</span>;
    } else if (status === 'warned' || riskScore >= 40) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">Medium Risk</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Low Risk</span>;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'delayed':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'no_show':
        return <UserX className="h-4 w-4 text-red-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-gray-500" />;
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name, specialty, or hospital..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Risk Levels</option>
                  <option value="active">Low Risk</option>
                  <option value="warned">Medium Risk</option>
                  <option value="flagged">High Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Behavior Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Doctor
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('delayedAppointments')}
                >
                  <div className="flex items-center">
                    Delayed Appointments
                    {sortBy === 'delayedAppointments' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('noShows')}
                >
                  <div className="flex items-center">
                    No-Shows
                    {sortBy === 'noShows' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('complaints')}
                >
                  <div className="flex items-center">
                    Complaints
                    {sortBy === 'complaints' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('averageRating')}
                >
                  <div className="flex items-center">
                    Rating
                    {sortBy === 'averageRating' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('riskScore')}
                >
                  <div className="flex items-center">
                    Risk Score
                    {sortBy === 'riskScore' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-700">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                        <p className="text-xs text-gray-400">{doctor.hospital}, {doctor.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{doctor.delayedAppointments}</span>
                      <span className="text-xs text-gray-500 ml-1">
                        / {doctor.totalAppointments}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <UserX className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{doctor.noShows}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{doctor.complaints}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {getRatingStars(doctor.averageRating)}
                      </div>
                      <span className="text-sm text-gray-600">({doctor.averageRating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            doctor.riskScore >= 70 ? 'bg-red-500' :
                            doctor.riskScore >= 40 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${doctor.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{doctor.riskScore}</span>
                      {getStatusBadge(doctor.status, doctor.riskScore)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowDetailModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Behavior Analysis - {selectedDoctor.name}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Behavior Trends Chart */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Behavior Trends</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={behaviorTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="delays" stroke="#f59e0b" name="Delays" />
                    <Line type="monotone" dataKey="noShows" stroke="#ef4444" name="No Shows" />
                    <Line type="monotone" dataKey="complaints" stroke="#f97316" name="Complaints" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Rating Trend */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Rating Trend</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={behaviorTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rating" stroke="#3b82f6" name="Average Rating" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Appointments</h4>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointmentHistory.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{appointment.patientName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{appointment.scheduledTime}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {appointment.joinedTime || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{appointment.duration}min</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {getStatusIcon(appointment.status)}
                            <span className="ml-2 text-sm capitalize">
                              {appointment.status.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {appointment.patientRating ? (
                            <div className="flex items-center">
                              {getRatingStars(appointment.patientRating).slice(0, appointment.patientRating)}
                              <span className="ml-1 text-sm">({appointment.patientRating})</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {appointment.issues && appointment.issues.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {appointment.issues.map((issue, index) => (
                                <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                  {issue}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50">
                Send Warning
              </button>
              <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50">
                Schedule Review
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Suspend Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehaviorMonitor;