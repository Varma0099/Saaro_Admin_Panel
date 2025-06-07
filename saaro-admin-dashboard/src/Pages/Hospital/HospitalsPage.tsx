
import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Shield,
  Download,
  Upload,
  User,
  Settings,
  Clock,
  Award
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: 'hospital' | 'clinic';
  status: 'pending' | 'verified' | 'rejected' | 'suspended';
  registrationDate: string;
  lastActive: string;
  adminUser?: {
    name: string;
    email: string;
    phone: string;
  };
  verificationDocs: {
    nabh?: {
      status: 'pending' | 'verified' | 'rejected';
      uploadDate: string;
      fileName: string;
    };
    pan?: {
      status: 'pending' | 'verified' | 'rejected';
      uploadDate: string;
      fileName: string;
    };
    license?: {
      status: 'pending' | 'verified' | 'rejected';
      uploadDate: string;
      fileName: string;
    };
  };
  statistics: {
    totalDoctors: number;
    totalAppointments: number;
    monthlyRevenue: number;
    patientCount: number;
  };
}

interface HospitalsPageProps {
  currentPath: string;
}

const HospitalsPage: React.FC<HospitalsPageProps> = ({ currentPath }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockHospitals: Hospital[] = [
      {
        id: '1',
        name: 'Apollo Hospitals',
        email: 'admin@apollohospitals.com',
        phone: '+91 9876543210',
        address: '123 Healthcare Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        type: 'hospital',
        status: 'verified',
        registrationDate: '2024-01-15',
        lastActive: '2024-03-10',
        adminUser: {
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh@apollohospitals.com',
          phone: '+91 9876543211'
        },
        verificationDocs: {
          nabh: {
            status: 'verified',
            uploadDate: '2024-01-16',
            fileName: 'apollo_nabh_certificate.pdf'
          },
          pan: {
            status: 'verified',
            uploadDate: '2024-01-16',
            fileName: 'apollo_pan_card.pdf'
          },
          license: {
            status: 'verified',
            uploadDate: '2024-01-16',
            fileName: 'apollo_license.pdf'
          }
        },
        statistics: {
          totalDoctors: 125,
          totalAppointments: 2340,
          monthlyRevenue: 450000,
          patientCount: 1890
        }
      },
      {
        id: '2',
        name: 'Max Healthcare',
        email: 'contact@maxhealthcare.com',
        phone: '+91 9876543220',
        address: '456 Medical Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        type: 'hospital',
        status: 'pending',
        registrationDate: '2024-03-01',
        lastActive: '2024-03-09',
        adminUser: {
          name: 'Dr. Priya Sharma',
          email: 'priya@maxhealthcare.com',
          phone: '+91 9876543221'
        },
        verificationDocs: {
          nabh: {
            status: 'pending',
            uploadDate: '2024-03-02',
            fileName: 'max_nabh_certificate.pdf'
          },
          pan: {
            status: 'verified',
            uploadDate: '2024-03-02',
            fileName: 'max_pan_card.pdf'
          },
          license: {
            status: 'pending',
            uploadDate: '2024-03-02',
            fileName: 'max_license.pdf'
          }
        },
        statistics: {
          totalDoctors: 89,
          totalAppointments: 1560,
          monthlyRevenue: 320000,
          patientCount: 1234
        }
      },
      {
        id: '3',
        name: 'City Clinic',
        email: 'info@cityclinic.com',
        phone: '+91 9876543230',
        address: '789 Health Plaza',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        type: 'clinic',
        status: 'verified',
        registrationDate: '2024-02-10',
        lastActive: '2024-03-08',
        adminUser: {
          name: 'Dr. Amit Patel',
          email: 'amit@cityclinic.com',
          phone: '+91 9876543231'
        },
        verificationDocs: {
          pan: {
            status: 'verified',
            uploadDate: '2024-02-11',
            fileName: 'city_clinic_pan.pdf'
          },
          license: {
            status: 'verified',
            uploadDate: '2024-02-11',
            fileName: 'city_clinic_license.pdf'
          }
        },
        statistics: {
          totalDoctors: 12,
          totalAppointments: 890,
          monthlyRevenue: 85000,
          patientCount: 567
        }
      }
    ];
    setHospitals(mockHospitals);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || hospital.status === statusFilter;
    const matchesType = typeFilter === 'all' || hospital.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowDetailsModal(true);
  };

  const handleVerification = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowVerificationModal(true);
  };

  const handleStatusChange = async (hospitalId: string, newStatus: string) => {
    setLoading(true);
    try {
      // API call would go here
      // await updateHospitalStatus(hospitalId, newStatus);
      
      setHospitals(prev => prev.map(h => 
        h.id === hospitalId ? { ...h, status: newStatus as any } : h
      ));
      
      alert(`Hospital status updated to ${newStatus}`);
    } catch (error) {
      alert('Failed to update hospital status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      verified: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      suspended: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertTriangle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        type === 'hospital' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }`}>
        <Building2 className="w-3 h-3 mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const renderSubPage = () => {
    switch (currentPath) {
      case '/hospitals/pending':
        return filteredHospitals.filter(h => h.status === 'pending');
      case '/hospitals/verified':
        return filteredHospitals.filter(h => h.status === 'verified');
      case '/hospitals/rejected':
        return filteredHospitals.filter(h => h.status === 'rejected');
      case '/hospitals/suspended':
        return filteredHospitals.filter(h => h.status === 'suspended');
      default:
        return filteredHospitals;
    }
  };

  const getPageTitle = () => {
    switch (currentPath) {
      case '/hospitals/pending':
        return 'Pending Approvals';
      case '/hospitals/verified':
        return 'Verified Hospitals & Clinics';
      case '/hospitals/rejected':
        return 'Rejected Applications';
      case '/hospitals/suspended':
        return 'Suspended Accounts';
      default:
        return 'All Hospitals & Clinics';
    }
  };

  const displayHospitals = renderSubPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{getPageTitle()}</h1>
          <p className="mt-2 text-slate-600">Manage hospitals and clinics on your platform</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#49A097] hover:bg-[#3d8b82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49A097] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add New Hospital
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hospitals, clinics..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <select
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="hospital">Hospitals</option>
            <option value="clinic">Clinics</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Hospitals</p>
              <p className="text-3xl font-bold">{hospitals.filter(h => h.type === 'hospital').length}</p>
            </div>
            <Building2 className="w-12 h-12 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Clinics</p>
              <p className="text-3xl font-bold">{hospitals.filter(h => h.type === 'clinic').length}</p>
            </div>
            <Building2 className="w-12 h-12 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending Approval</p>
              <p className="text-3xl font-bold">{hospitals.filter(h => h.status === 'pending').length}</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Verified</p>
              <p className="text-3xl font-bold">{hospitals.filter(h => h.status === 'verified').length}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Hospitals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Hospital/Clinic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {displayHospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#49A097] to-[#3d8b82] flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{hospital.name}</div>
                        <div className="text-sm text-slate-500">{hospital.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(hospital.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(hospital.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{hospital.city}</div>
                    <div className="text-sm text-slate-500">{hospital.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(hospital.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(hospital)}
                        className="text-[#49A097] hover:text-[#3d8b82] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleVerification(hospital)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Verification"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      {hospital.status === 'verified' ? (
                        <button
                          onClick={() => handleStatusChange(hospital.id, 'suspended')}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Suspend"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      ) : hospital.status === 'suspended' ? (
                        <button
                          onClick={() => handleStatusChange(hospital.id, 'verified')}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Activate"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(hospital.id, 'verified')}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Hospital Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 text-slate-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{selectedHospital.name}</p>
                        <p className="text-sm text-slate-500">{getTypeBadge(selectedHospital.type)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-slate-400 mr-3" />
                      <p className="text-sm text-slate-900">{selectedHospital.email}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-slate-400 mr-3" />
                      <p className="text-sm text-slate-900">{selectedHospital.phone}</p>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-900">{selectedHospital.address}</p>
                        <p className="text-sm text-slate-500">{selectedHospital.city}, {selectedHospital.state} - {selectedHospital.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedHospital.statistics.totalDoctors}</p>
                      <p className="text-sm text-blue-600">Total Doctors</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedHospital.statistics.totalAppointments}</p>
                      <p className="text-sm text-green-600">Appointments</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">₹{selectedHospital.statistics.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-sm text-purple-600">Monthly Revenue</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{selectedHospital.statistics.patientCount}</p>
                      <p className="text-sm text-orange-600">Patients</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin User */}
              {selectedHospital.adminUser && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Admin User</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#49A097] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{selectedHospital.adminUser.name}</p>
                        <p className="text-sm text-slate-500">{selectedHospital.adminUser.email}</p>
                        <p className="text-sm text-slate-500">{selectedHospital.adminUser.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Documents */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Verification Documents</h4>
                <div className="space-y-3">
                  {Object.entries(selectedHospital.verificationDocs).map(([docType, doc]) => (
                    <div key={docType} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-slate-400 mr-3" />
                        <div>
                          <p className="font-medium text-slate-900">{docType.toUpperCase()} Certificate</p>
                          <p className="text-sm text-slate-500">{doc.fileName}</p>
                          <p className="text-xs text-slate-400">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(doc.status)}
                        <button className="text-[#49A097] hover:text-[#3d8b82]">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Verification & Actions</h3>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-medium text-slate-900">{selectedHospital.name}</h4>
                <p className="text-slate-500">{selectedHospital.email}</p>
                <div className="mt-2">{getStatusBadge(selectedHospital.status)}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleStatusChange(selectedHospital.id, 'verified')}
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={loading}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve Hospital
                </button>
                
                <button
                  onClick={() => handleStatusChange(selectedHospital.id, 'rejected')}
                  className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  disabled={loading}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject Application
                </button>
                
                <button
                  onClick={() => handleStatusChange(selectedHospital.id, 'suspended')}
                  className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  disabled={loading}
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Suspend Hospital
                </button>
                
                <button
                  onClick={() => handleStatusChange(selectedHospital.id, 'pending')}
                  className="flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  disabled={loading}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Mark as Pending
                </button>
              </div>

              {/* Document Actions */}
              <div className="border-t pt-6">
                <h5 className="font-medium text-slate-900 mb-4">Document Actions</h5>
                <div className="space-y-3">
                  {Object.entries(selectedHospital.verificationDocs).map(([docType, doc]) => (
                    <div key={docType} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm font-medium text-slate-900">{docType.toUpperCase()}</span>
                        <span className="ml-2">{getStatusBadge(doc.status)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Reject
                        </button>
                        <button className="text-[#49A097] hover:text-[#3d8b82]">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="border-t pt-6">
                <h5 className="font-medium text-slate-900 mb-4">Add Note</h5>
                <textarea
                  placeholder="Add a note about this verification..."
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                  rows={3}
                />
                <button className="mt-3 px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#3d8b82] transition-colors">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {displayHospitals.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No hospitals found</h3>
          <p className="text-slate-500 mb-6">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
              ? 'Try adjusting your search criteria'
              : 'Get started by adding your first hospital or clinic'}
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#3d8b82] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add New Hospital
          </button>
        </div>
      )}

      {/* Bulk Actions Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-slate-200 p-4 flex items-center space-x-4">
        <span className="text-sm text-slate-600">Bulk Actions:</span>
        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
          Approve Selected
        </button>
        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
          Reject Selected
        </button>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default HospitalsPage;