import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Check,
  X,
  Clock,
  MapPin,
  Star,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  Building,
  Award
} from 'lucide-react';

interface DoctorRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  subSpecialty?: string;
  city: string;
  hospital: string;
  licenseNumber: string;
  experience: number;
  requestDate: string;
  status: 'pending' | 'under_review' | 'documents_requested';
  documents: {
    medicalLicense: { uploaded: boolean; verified: boolean };
    degreesCertificates: { uploaded: boolean; verified: boolean };
    experienceCertificate: { uploaded: boolean; verified: boolean };
    hospitalAffiliation: { uploaded: boolean; verified: boolean };
  };
  profileImage?: string;
  graduationYear: number;
  medicalCollege: string;
  consultationFee: number;
  languages: string[];
  bio: string;
}

const DoctorRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('requestDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DoctorRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionModal, setActionModal] = useState<{show: boolean, request?: DoctorRequest, action?: 'approve' | 'reject' | 'request_docs'}>({show: false});
  const [rejectionReason, setRejectionReason] = useState('');

  // Sample data
  const doctorRequests: DoctorRequest[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      specialty: 'Cardiology',
      subSpecialty: 'Interventional Cardiology',
      city: 'Mumbai',
      hospital: 'Kokilaben Dhirubhai Ambani Hospital',
      licenseNumber: 'MH-CARD-12345',
      experience: 8,
      requestDate: '2024-05-25T10:30:00',
      status: 'pending',
      documents: {
        medicalLicense: { uploaded: true, verified: false },
        degreesCertificates: { uploaded: true, verified: false },
        experienceCertificate: { uploaded: true, verified: false },
        hospitalAffiliation: { uploaded: false, verified: false }
      },
      graduationYear: 2016,
      medicalCollege: 'All Institute of Medical Sciences, Delhi',
      consultationFee: 800,
      languages: ['English', 'Hindi', 'Marathi'],
      bio: 'Experienced cardiologist with expertise in interventional procedures and cardiac catheterization.'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 87654 32109',
      specialty: 'Neurology',
      city: 'Bangalore',
      hospital: 'Manipal Hospital',
      licenseNumber: 'KA-NEURO-67890',
      experience: 12,
      requestDate: '2024-05-24T14:20:00',
      status: 'under_review',
      documents: {
        medicalLicense: { uploaded: true, verified: true },
        degreesCertificates: { uploaded: true, verified: true },
        experienceCertificate: { uploaded: true, verified: false },
        hospitalAffiliation: { uploaded: true, verified: true }
      },
      graduationYear: 2012,
      medicalCollege: 'Bangalore Medical College',
      consultationFee: 1000,
      languages: ['English', 'Hindi', 'Kannada'],
      bio: 'Neurologist specializing in stroke management and epilepsy treatment.'
    },
    {
      id: '3',
      name: 'Dr. Anjali Mehta',
      email: 'anjali.mehta@email.com',
      phone: '+91 76543 21098',
      specialty: 'Pediatrics',
      city: 'Chennai',
      hospital: 'Apollo Children\'s Hospital',
      licenseNumber: 'TN-PEDI-11111',
      experience: 6,
      requestDate: '2024-05-23T09:15:00',
      status: 'documents_requested',
      documents: {
        medicalLicense: { uploaded: true, verified: true },
        degreesCertificates: { uploaded: false, verified: false },
        experienceCertificate: { uploaded: true, verified: true },
        hospitalAffiliation: { uploaded: true, verified: true }
      },
      graduationYear: 2018,
      medicalCollege: 'Madras Medical College',
      consultationFee: 600,
      languages: ['English', 'Tamil', 'Hindi'],
      bio: 'Pediatrician with special interest in neonatal care and child development.'
    }
  ];

  const specialties = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Internal Medicine'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
  const statuses = ['pending', 'under_review', 'documents_requested'];

  const filteredAndSortedRequests = useMemo(() => {
    let filtered = doctorRequests.filter(request => {
      const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !selectedStatus || request.status === selectedStatus;
      const matchesSpecialty = !selectedSpecialty || request.specialty === selectedSpecialty;
      const matchesCity = !selectedCity || request.city === selectedCity;

      return matchesSearch && matchesStatus && matchesSpecialty && matchesCity;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof DoctorRequest];
      let bValue: any = b[sortBy as keyof DoctorRequest];

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
  }, [searchTerm, selectedStatus, selectedSpecialty, selectedCity, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAction = (request: DoctorRequest, action: 'approve' | 'reject' | 'request_docs') => {
    setActionModal({show: true, request, action});
  };

  const confirmAction = () => {
    const { request, action } = actionModal;
    if (!request) return;

    console.log(`Performing ${action} on request ${request.id}`, rejectionReason ? {reason: rejectionReason} : {});
    
    setActionModal({show: false});
    setRejectionReason('');
    alert(`${action} completed successfully for ${request.name}`);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      documents_requested: 'bg-orange-100 text-orange-800'
    };
    
    const statusText = {
      pending: 'Pending',
      under_review: 'Under Review',
      documents_requested: 'Documents Requested'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  const getDocumentStatus = (documents: DoctorRequest['documents']) => {
    const total = Object.keys(documents).length;
    const uploaded = Object.values(documents).filter(doc => doc.uploaded).length;
    const verified = Object.values(documents).filter(doc => doc.verified).length;
    
    return { total, uploaded, verified };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
                placeholder="Search by name, email, hospital, or license..."
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
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                    </option>
                  ))}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Requests Table */}
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
                  onClick={() => handleSort('specialty')}
                >
                  <div className="flex items-center">
                    Specialty & Location
                    {sortBy === 'specialty' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('requestDate')}
                >
                  <div className="flex items-center">
                    Request Date
                    {sortBy === 'requestDate' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedRequests.map((request) => {
                const docStatus = getDocumentStatus(request.documents);
                return (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-blue-700">
                            {request.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.name}</p>
                          <p className="text-sm text-gray-500">{request.email}</p>
                          <p className="text-xs text-gray-400">{request.licenseNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{request.specialty}</p>
                        {request.subSpecialty && (
                          <p className="text-xs text-gray-500">{request.subSpecialty}</p>
                        )}
                        <div className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">{request.city}</p>
                        </div>
                        <p className="text-xs text-gray-400">{request.experience} years exp.</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{formatDate(request.requestDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-gray-900">{docStatus.uploaded}/{docStatus.total} uploaded</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-xs text-gray-500">{docStatus.verified} verified</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction(request, 'approve')}
                          className="text-green-600 hover:text-green-800"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction(request, 'reject')}
                          className="text-red-600 hover:text-red-800"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction(request, 'request_docs')}
                          className="text-orange-600 hover:text-orange-800"
                          title="Request Documents"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Doctor Registration Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-900">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Languages</label>
                    <p className="text-gray-900">{selectedRequest.languages.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Specialty</label>
                    <p className="text-gray-900">{selectedRequest.specialty}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Experience</label>
                    <p className="text-gray-900">{selectedRequest.experience} years</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">License Number</label>
                    <p className="text-gray-900">{selectedRequest.licenseNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Consultation Fee</label>
                    <p className="text-gray-900">₹{selectedRequest.consultationFee}</p>
                  </div>
                </div>
              </div>

              {/* Education & Hospital */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Education & Affiliation</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Medical College</label>
                    <p className="text-gray-900">{selectedRequest.medicalCollege}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Graduation Year</label>
                    <p className="text-gray-900">{selectedRequest.graduationYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Hospital/Clinic</label>
                    <p className="text-gray-900">{selectedRequest.hospital}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">City</label>
                    <p className="text-gray-900">{selectedRequest.city}</p>
                  </div>
                </div>
              </div>

              {/* Documents Status */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Documents Status</h4>
                <div className="space-y-3">
                  {Object.entries(selectedRequest.documents).map(([key, doc]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${doc.uploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {doc.uploaded ? 'Uploaded' : 'Missing'}
                        </span>
                        {doc.uploaded && (
                          <span className={`text-xs px-2 py-1 rounded ${doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {doc.verified ? 'Verified' : 'Pending'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Bio</h4>
              <p className="text-gray-700">{selectedRequest.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
              <button
                onClick={() => handleAction(selectedRequest, 'request_docs')}
                className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50"
              >
                Request Documents
              </button>
              <button
                onClick={() => handleAction(selectedRequest, 'reject')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(selectedRequest, 'approve')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {actionModal.show && actionModal.request && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm {actionModal.action?.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to {actionModal.action?.replace('_', ' ')} the request from <strong>{actionModal.request.name}</strong>?
            </p>

            {actionModal.action === 'reject' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Please provide a reason for rejection..."
                  required
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setActionModal({show: false})}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={actionModal.action === 'reject' && !rejectionReason.trim()}
                className={`px-4 py-2 rounded-lg text-white disabled:opacity-50 ${
                  actionModal.action === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                  actionModal.action === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-orange-600 hover:bg-orange-700'
                }`}
                >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredAndSortedRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredAndSortedRequests.filter(r => r.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Docs Requested</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredAndSortedRequests.filter(r => r.status === 'documents_requested').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredAndSortedRequests.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredAndSortedRequests.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <Search className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
                setSelectedSpecialty('');
                setSelectedCity('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Bulk Actions Bar (if needed) */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h4 className="text-sm font-medium text-gray-900">Bulk Actions</h4>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option value="">Select Action</option>
              <option value="approve_all">Approve Selected</option>
              <option value="reject_all">Reject Selected</option>
              <option value="request_docs_all">Request Documents</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Showing {filteredAndSortedRequests.length} of {doctorRequests.length} requests
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRequests;