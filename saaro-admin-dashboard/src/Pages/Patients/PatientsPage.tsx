
import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit3,
  AlertTriangle,
  Shield,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  MessageSquare,
  Ban,
  Archive,
  CheckCircle,
  XCircle,
  RefreshCw,
  UserX,
  History,
  Lock,
  Key,
  Database,
  Activity,
  X
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  registrationDate: string;
  lastActivity: string;
  appointmentsCount: number;
  status: 'active' | 'suspended' | 'pending';
  avatar?: string;
}

interface Complaint {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  issue: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  assignedTo?: string;
  category: 'service' | 'billing' | 'technical' | 'medical' | 'other';
}

interface AccessLog {
  id: string;
  patientId: string;
  patientName: string;
  accessedBy: string;
  accessorRole: string;
  dataType: string;
  purpose: string;
  timestamp: string;
  ipAddress: string;
  consentStatus: 'granted' | 'pending' | 'revoked';
  complianceFlag: boolean;
}

interface PatientsPageProps {
  currentPath: string;
}

const PatientsPage: React.FC<PatientsPageProps> = ({ currentPath }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    registrationDate: '',
    city: '',
    status: ''
  });
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Sample data
  const [patients] = useState<Patient[]>([
    {
      id: 'P001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      city: 'New York',
      registrationDate: '2024-01-15',
      lastActivity: '2024-06-01',
      appointmentsCount: 12,
      status: 'active'
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      city: 'San Francisco',
      registrationDate: '2024-02-20',
      lastActivity: '2024-05-28',
      appointmentsCount: 8,
      status: 'active'
    },
    {
      id: 'P003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      city: 'Los Angeles',
      registrationDate: '2024-03-10',
      lastActivity: '2024-06-03',
      appointmentsCount: 15,
      status: 'suspended'
    }
  ]);

  const [complaints] = useState<Complaint[]>([
    {
      id: 'C001',
      patientId: 'P001',
      patientName: 'Sarah Johnson',
      appointmentId: 'A001',
      issue: 'Doctor was late for appointment',
      description: 'The doctor arrived 30 minutes late for my scheduled appointment without any prior notification.',
      priority: 'medium',
      status: 'open',
      createdAt: '2024-06-04T10:30:00Z',
      category: 'service'
    },
    {
      id: 'C002',
      patientId: 'P002',
      patientName: 'Michael Chen',
      issue: 'Billing discrepancy',
      description: 'I was charged twice for the same consultation. Need immediate refund.',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-06-03T14:15:00Z',
      assignedTo: 'Admin Team',
      category: 'billing'
    }
  ]);

  const [accessLogs] = useState<AccessLog[]>([
    {
      id: 'L001',
      patientId: 'P001',
      patientName: 'Sarah Johnson',
      accessedBy: 'Dr. Smith',
      accessorRole: 'Doctor',
      dataType: 'Medical Records',
      purpose: 'Treatment Planning',
      timestamp: '2024-06-04T09:15:00Z',
      ipAddress: '192.168.1.100',
      consentStatus: 'granted',
      complianceFlag: true
    },
    {
      id: 'L002',
      patientId: 'P001',
      patientName: 'Sarah Johnson',
      accessedBy: 'Nurse Jane',
      accessorRole: 'Nurse',
      dataType: 'Prescription History',
      purpose: 'Medication Review',
      timestamp: '2024-06-03T16:30:00Z',
      ipAddress: '192.168.1.105',
      consentStatus: 'granted',
      complianceFlag: true
    }
  ]);

  const handlePatientAction = (action: string, patient: Patient) => {
    switch (action) {
      case 'view':
        setSelectedPatient(patient);
        setShowPatientModal(true);
        break;
      case 'edit':
        alert(`Edit patient: ${patient.name}`);
        break;
      case 'suspend':
        alert(`Suspend patient: ${patient.name}`);
        break;
      case 'anonymize':
        if (window.confirm(`Are you sure you want to anonymize patient ${patient.name}? This action cannot be undone.`)) {
          alert(`Patient ${patient.name} anonymized successfully`);
        }
        break;
      default:
        break;
    }
  };

  const handleComplaintAction = (action: string, complaint: Complaint) => {
    switch (action) {
      case 'reply':
        alert(`Reply to complaint: ${complaint.id}`);
        break;
      case 'escalate':
        alert(`Escalate complaint: ${complaint.id}`);
        break;
      case 'refund':
        alert(`Process refund for complaint: ${complaint.id}`);
        break;
      case 'close':
        alert(`Close complaint: ${complaint.id}`);
        break;
      default:
        break;
    }
  };

  const renderAllPatients = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            All Patients
          </h2>
          <p className="text-slate-600 mt-2">Manage and monitor patient accounts</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-[#49A097] to-[#49A097]/80 hover:from-[#49A097]/90 hover:to-[#49A097]/70 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full py-3 px-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-300"
              value={selectedFilters.city}
              onChange={(e) => setSelectedFilters({...selectedFilters, city: e.target.value})}
            >
              <option value="">All Cities</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
            </select>
          </div>
          <div>
            <select
              className="w-full py-3 px-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-300"
              value={selectedFilters.status}
              onChange={(e) => setSelectedFilters({...selectedFilters, status: e.target.value})}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Patient Info</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Registration</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Activity</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#49A097] to-[#49A097]/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{patient.name}</p>
                        <p className="text-sm text-slate-500">ID: {patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{patient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{patient.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-700">{patient.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-700">{new Date(patient.registrationDate).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-500">{patient.appointmentsCount} appointments</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{new Date(patient.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                      patient.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePatientAction('view', patient)}
                        className="p-2 text-slate-500 hover:text-[#49A097] hover:bg-[#49A097]/10 rounded-lg transition-all duration-200"
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handlePatientAction('edit', patient)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit Info"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handlePatientAction('suspend', patient)}
                        className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                        title="Suspend Account"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handlePatientAction('anonymize', patient)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Anonymize/Delete"
                      >
                        <UserX className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Patient Complaints
          </h2>
          <p className="text-slate-600 mt-2">Handle patient-reported issues and feedback</p>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  complaint.priority === 'critical' ? 'bg-red-500' :
                  complaint.priority === 'high' ? 'bg-orange-500' :
                  complaint.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <span className="text-sm font-semibold text-slate-600 uppercase">
                  {complaint.priority} Priority
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                complaint.status === 'open' ? 'bg-red-100 text-red-800' :
                complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {complaint.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-slate-800 mb-2">{complaint.issue}</h3>
              <p className="text-sm text-slate-600 mb-3">{complaint.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{complaint.patientName}</span>
                </div>
                {complaint.appointmentId && (
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Appointment: {complaint.appointmentId}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-slate-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleComplaintAction('reply', complaint)}
                  className="px-3 py-2 text-xs bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 transition-colors duration-200"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleComplaintAction('escalate', complaint)}
                  className="px-3 py-2 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Escalate
                </button>
              </div>
              <div className="flex space-x-2">
                {complaint.category === 'billing' && (
                  <button
                    onClick={() => handleComplaintAction('refund', complaint)}
                    className="px-3 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Refund
                  </button>
                )}
                <button
                  onClick={() => handleComplaintAction('close', complaint)}
                  className="px-3 py-2 text-xs bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConsentLogs = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Consent & Privacy Logs
          </h2>
          <p className="text-slate-600 mt-2">HIPAA compliance tracking and audit logs</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-[#49A097] to-[#49A097]/80 hover:from-[#49A097]/90 hover:to-[#49A097]/70 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Download Audit Log</span>
          </button>
        </div>
      </div>

      {/* Compliance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">98.5%</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Compliance Rate</h3>
          <p className="text-sm text-slate-600">All access properly logged and consented</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">1,247</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Access Events</h3>
          <p className="text-sm text-slate-600">Total logged access events this month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">3</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Flagged Access</h3>
          <p className="text-sm text-slate-600">Requires review for compliance</p>
        </div>
      </div>

      {/* Access Logs Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Recent Access Logs</h3>
            <div className="flex items-center space-x-2">
              <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Accessed By</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Data Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Purpose</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Consent</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {accessLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#49A097] to-[#49A097]/80 flex items-center justify-center text-white font-bold text-sm">
                        {log.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{log.patientName}</p>
                        <p className="text-xs text-slate-500">ID: {log.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{log.accessedBy}</p>
                      <p className="text-sm text-slate-500">{log.accessorRole}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-700">{log.dataType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700">{log.purpose}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-700">{new Date(log.timestamp).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      log.consentStatus === 'granted' ? 'bg-green-100 text-green-800' :
                      log.consentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.consentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {log.complianceFlag ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        log.complianceFlag ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {log.complianceFlag ? 'Compliant' : 'Flagged'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Patient Modal Component
  const PatientModal = () => {
    if (!selectedPatient || !showPatientModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#49A097] to-[#49A097]/80 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h2>
                  <p className="text-slate-600">Patient ID: {selectedPatient.id}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPatientModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium text-slate-800">{selectedPatient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-slate-800">{selectedPatient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium text-slate-800">{selectedPatient.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Account Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Registration Date</p>
                      <p className="font-medium text-slate-800">{new Date(selectedPatient.registrationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Last Activity</p>
                      <p className="font-medium text-slate-800">{new Date(selectedPatient.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Total Appointments</p>
                      <p className="font-medium text-slate-800">{selectedPatient.appointmentsCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Account Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        selectedPatient.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        selectedPatient.status === 'suspended' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedPatient.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handlePatientAction('edit', selectedPatient)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Patient</span>
                </button>
                <button
                  onClick={() => handlePatientAction('suspend', selectedPatient)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Ban className="h-4 w-4" />
                  <span>Suspend Account</span>
                </button>
                <button
                  onClick={() => setShowPatientModal(false)}
                  className="px-6 py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render based on current path
  const renderContent = () => {
    if (currentPath.includes('complaints')) {
      return renderComplaints();
    } else if (currentPath.includes('consent') || currentPath.includes('privacy')) {
      return renderConsentLogs();
    } else {
      return renderAllPatients();
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {renderContent()}
      <PatientModal />
    </div>
  );
};

export default PatientsPage;