    import React, { useState } from 'react';
import { Clock, UserX, AlertTriangle, Phone, MessageCircle, Eye, Flag, Calendar, User, CheckCircle, XCircle } from 'lucide-react';

interface MissedAppointment {
  id: string;
  appointmentId: string;
  date: string;
  time: string;
  doctor: {
    name: string;
    specialty: string;
    id: string;
  };
  patient: {
    name: string;
    phone: string;
    id: string;
  };
  issueType: 'delayed_join' | 'no_show' | 'patient_no_show';
  delayTime?: number; // in minutes
  detectedAt: string;
  status: 'Open' | 'Contacted' | 'Resolved';
  notes?: string;
}

const MissedDelayed: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);

  const [appointments, setAppointments] = useState<MissedAppointment[]>([
    {
      id: '1',
      appointmentId: 'APT-2025-004',
      date: '2025-06-05',
      time: '10:00 AM',
      doctor: {
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiologist',
        id: 'DOC-001'
      },
      patient: {
        name: 'John Smith',
        phone: '+91-9876543210',
        id: 'PAT-001'
      },
      issueType: 'delayed_join',
      delayTime: 15,
      detectedAt: '10:15 AM',
      status: 'Open',
      notes: 'Doctor joined 15 minutes late due to previous appointment overrun'
    },
    {
      id: '2',
      appointmentId: 'APT-2025-005',
      date: '2025-06-05',
      time: '2:00 PM',
      doctor: {
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        id: 'DOC-002'
      },
      patient: {
        name: 'Emma Johnson',
        phone: '+91-9876543211',
        id: 'PAT-002'
      },
      issueType: 'no_show',
      detectedAt: '2:30 PM',
      status: 'Contacted',
      notes: 'Doctor never joined the video call. Patient waited for 30 minutes.'
    },
    {
      id: '3',
      appointmentId: 'APT-2025-006',
      date: '2025-06-04',
      time: '4:00 PM',
      doctor: {
        name: 'Dr. Priya Sharma',
        specialty: 'Pediatrician',
        id: 'DOC-003'
      },
      patient: {
        name: 'Baby Kumar',
        phone: '+91-9876543212',
        id: 'PAT-003'
      },
      issueType: 'patient_no_show',
      detectedAt: '4:15 PM',
      status: 'Resolved',
      notes: 'Patient did not join. Appointment rescheduled.'
    },
    {
      id: '4',
      appointmentId: 'APT-2025-007',
      date: '2025-06-05',
      time: '11:30 AM',
      doctor: {
        name: 'Dr. Rajesh Kumar',
        specialty: 'Orthopedic',
        id: 'DOC-004'
      },
      patient: {
        name: 'Anita Patel',
        phone: '+91-9876543213',
        id: 'PAT-004'
      },
      issueType: 'delayed_join',
      delayTime: 25,
      detectedAt: '11:55 AM',
      status: 'Open',
      notes: 'Patient joined late due to connectivity issues'
    },
    {
      id: '5',
      appointmentId: 'APT-2025-008',
      date: '2025-06-05',
      time: '3:15 PM',
      doctor: {
        name: 'Dr. Lisa Thompson',
        specialty: 'Psychiatrist',
        id: 'DOC-005'
      },
      patient: {
        name: 'David Wilson',
        phone: '+91-9876543214',
        id: 'PAT-005'
      },
      issueType: 'no_show',
      detectedAt: '3:45 PM',
      status: 'Open',
      notes: 'Doctor did not join the session. Patient contacted support.'
    }
  ]);

  const getIssueTypeInfo = (type: string) => {
    switch (type) {
      case 'delayed_join':
        return { label: 'Delayed Join', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock };
      case 'no_show':
        return { label: 'Doctor No Show', color: 'bg-red-100 text-red-800 border-red-200', icon: UserX };
      case 'patient_no_show':
        return { label: 'Patient No Show', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: UserX };
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertTriangle };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800 border-red-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'All') return true;
    return appointment.issueType === filter;
  });

  const handleSelectAppointment = (id: string) => {
    setSelectedAppointments(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on appointments:`, selectedAppointments);
    // Implementation for bulk actions
    setSelectedAppointments([]);
  };

  const handleStatusChange = (id: string, newStatus: 'Open' | 'Contacted' | 'Resolved') => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const handleContactPatient = (appointmentId: string, patientPhone: string) => {
    console.log(`Contacting patient for appointment ${appointmentId} at ${patientPhone}`);
    // Implementation for contacting patient
  };

  const handleContactDoctor = (appointmentId: string, doctorId: string) => {
    console.log(`Contacting doctor ${doctorId} for appointment ${appointmentId}`);
    // Implementation for contacting doctor
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-500 rounded-lg">
              <UserX className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Doctor No Shows</p>
              <p className="text-2xl font-bold text-red-700">
                {appointments.filter(a => a.issueType === 'no_show').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center">
            <div className="p-3 bg-amber-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-600">Delayed Joins</p>
              <p className="text-2xl font-bold text-amber-700">
                {appointments.filter(a => a.issueType === 'delayed_join').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center">
            <div className="p-3 bg-slate-500 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Patient No Shows</p>
              <p className="text-2xl font-bold text-slate-700">
                {appointments.filter(a => a.issueType === 'patient_no_show').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Issues</option>
              <option value="delayed_join">Delayed Joins</option>
              <option value="no_show">Doctor No Shows</option>
              <option value="patient_no_show">Patient No Shows</option>
            </select>
          </div>
          
          {selectedAppointments.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {selectedAppointments.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('contact')}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Contact All
              </button>
              <button
                onClick={() => handleBulkAction('flag')}
                className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Flag Issues
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Missed & Delayed Appointments ({filteredAppointments.length})
          </h3>
        </div>

        <div className="divide-y divide-slate-200">
          {filteredAppointments.map((appointment) => {
            const issueInfo = getIssueTypeInfo(appointment.issueType);
            const IconComponent = issueInfo.icon;
            
            return (
              <div key={appointment.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-[#49A097] focus:ring-[#49A097] border-gray-300 rounded"
                    checked={selectedAppointments.includes(appointment.id)}
                    onChange={() => handleSelectAppointment(appointment.id)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-slate-900">
                          {appointment.appointmentId}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${issueInfo.color}`}>
                          <IconComponent className="w-3 h-3 mr-1" />
                          {issueInfo.label}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select
                          value={appointment.status}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value as 'Open' | 'Contacted' | 'Resolved')}
                          className="text-xs px-2 py-1 border border-slate-300 rounded focus:ring-1 focus:ring-[#49A097] focus:border-[#49A097]"
                        >
                          <option value="Open">Open</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                        
                        <button
                          onClick={() => handleContactPatient(appointment.appointmentId, appointment.patient.phone)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Contact Patient"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleContactDoctor(appointment.appointmentId, appointment.doctor.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Contact Doctor"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="font-medium">{appointment.date}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-slate-600">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">{appointment.doctor.name}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.doctor.specialty}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-slate-600">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">{appointment.patient.name}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.patient.phone}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {appointment.delayTime && (
                          <div className="flex items-center text-sm text-amber-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Delayed by {appointment.delayTime} minutes</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-slate-600">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span>Detected at {appointment.detectedAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Issues Found</h3>
            <p className="text-slate-600">
              {filter === 'All' 
                ? 'No missed or delayed appointments found.'
                : `No ${filter.replace('_', ' ')} issues found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissedDelayed;