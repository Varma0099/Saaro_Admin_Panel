import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  UserX,
  Trash2,
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  subSpecialty?: string;
  city: string;
  hospital: string;
  status: 'active' | 'pending' | 'blocked' | 'suspended';
  rating: number;
  totalConsults: number;
  joinedDate: string;
  lastActive: string;
  licenseNumber: string;
  experience: number;
  consultationFee: number;
  isVerified: boolean;
  profileImage?: string;
}

const AllDoctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showActionModal, setShowActionModal] = useState<{show: boolean, doctor?: Doctor, action?: string}>({show: false});

  
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Cardiology',
      subSpecialty: 'Interventional Cardiology',
      city: 'New York',
      hospital: 'Manhattan Heart Center',
      status: 'active',
      rating: 4.8,
      totalConsults: 1247,
      joinedDate: '2023-01-15',
      lastActive: '2024-06-01T10:30:00',
      licenseNumber: 'NY-CARD-12345',
      experience: 12,
      consultationFee: 200,
      isVerified: true,
      profileImage: 'https://via.placeholder.com/40x40'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      specialty: 'Neurology',
      city: 'Los Angeles',
      hospital: 'UCLA Medical Center',
      status: 'active',
      rating: 4.6,
      totalConsults: 892,
      joinedDate: '2023-02-20',
      lastActive: '2024-05-31T15:45:00',
      licenseNumber: 'CA-NEURO-67890',
      experience: 8,
      consultationFee: 180,
      isVerified: true
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      specialty: 'Pediatrics',
      city: 'Chicago',
      hospital: 'Children\'s Hospital of Chicago',
      status: 'pending',
      rating: 4.9,
      totalConsults: 567,
      joinedDate: '2024-05-15',
      lastActive: '2024-06-01T09:20:00',
      licenseNumber: 'IL-PEDI-11111',
      experience: 6,
      consultationFee: 150,
      isVerified: false
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 456-7890',
      specialty: 'Orthopedics',
      city: 'Houston',
      hospital: 'Houston Orthopedic Clinic',
      status: 'blocked',
      rating: 3.2,
      totalConsults: 234,
      joinedDate: '2023-08-10',
      lastActive: '2024-05-20T14:15:00',
      licenseNumber: 'TX-ORTHO-22222',
      experience: 4,
      consultationFee: 160,
      isVerified: true
    },
    {
      id: '5',
      name: 'Dr. Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 567-8901',
      specialty: 'Dermatology',
      city: 'Miami',
      hospital: 'Miami Skin Institute',
      status: 'active',
      rating: 4.7,
      totalConsults: 1089,
      joinedDate: '2022-11-05',
      lastActive: '2024-06-01T11:00:00',
      licenseNumber: 'FL-DERM-33333',
      experience: 10,
      consultationFee: 175,
      isVerified: true
    },
    {
      id: '6',
      name: 'Dr. Robert Brown',
      email: 'robert.brown@email.com',
      phone: '+1 (555) 678-9012',
      specialty: 'Internal Medicine',
      city: 'Boston',
      hospital: 'Massachusetts General Hospital',
      status: 'suspended',
      rating: 4.1,
      totalConsults: 456,
      joinedDate: '2023-04-20',
      lastActive: '2024-05-15T08:30:00',
      licenseNumber: 'MA-INTMED-44444',
      experience: 7,
      consultationFee: 140,
      isVerified: true
    }
  ];

  const specialties = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Internal Medicine', 'Surgery'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Boston', 'Seattle'];
  const statuses = ['active', 'pending', 'blocked', 'suspended'];


  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
      const matchesCity = !selectedCity || doctor.city === selectedCity;
      const matchesStatus = !selectedStatus || doctor.status === selectedStatus;

      return matchesSearch && matchesSpecialty && matchesCity && matchesStatus;
    });

    
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Doctor];
      let bValue: any = b[sortBy as keyof Doctor];

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
  }, [searchTerm, selectedSpecialty, selectedCity, selectedStatus, sortBy, sortOrder]);

  
  const totalPages = Math.ceil(filteredAndSortedDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredAndSortedDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctors(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDoctors.length === paginatedDoctors.length) {
      setSelectedDoctors([]);
    } else {
      setSelectedDoctors(paginatedDoctors.map(doctor => doctor.id));
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAction = (doctor: Doctor, action: string) => {
    setShowActionModal({show: true, doctor, action});
  };

  const confirmAction = () => {
    const { doctor, action } = showActionModal;
    if (!doctor) return;

    
    console.log(`Performing ${action} on doctor ${doctor.id}`);
    
    
    setShowActionModal({show: false});
    
    
    alert(`${action} completed successfully for ${doctor.name}`);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on doctors:`, selectedDoctors);
    setSelectedDoctors([]);
    alert(`${action} completed for ${selectedDoctors.length} doctors`);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */ }
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name, email, hospital, or license..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items per page</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {paginatedDoctors.length} of {filteredAndSortedDoctors.length} doctors
        </div>
        {searchTerm && (
          <div>
            Search results for "{searchTerm}"
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedDoctors.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedDoctors.length} doctor{selectedDoctors.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleBulkAction('Send Message')}
                className="text-sm bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
              >
                Send Message
              </button>
              <button 
                onClick={() => handleBulkAction('Export')}
                className="text-sm bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
              >
                Export Selected
              </button>
              <button 
                onClick={() => handleBulkAction('Suspend')}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Suspend Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Doctors Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDoctors.length === paginatedDoctors.length && paginatedDoctors.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('specialty')}
                >
                  <div className="flex items-center">
                    Specialty
                    {sortBy === 'specialty' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('city')}
                >
                  <div className="flex items-center">
                    Location
                    {sortBy === 'city' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center">
                    Rating
                    {sortBy === 'rating' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('totalConsults')}
                >
                  <div className="flex items-center">
                    Consults
                    {sortBy === 'totalConsults' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDoctors.includes(doctor.id)}
                      onChange={() => handleSelectDoctor(doctor.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        {doctor.profileImage ? (
                          <img src={doctor.profileImage} alt="" className="h-10 w-10 rounded-full" />
                        ) : (
                          <span className="text-sm font-medium text-gray-700">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                          {doctor.isVerified && (
                            <Shield className="ml-2 h-4 w-4 text-green-500" aria-label="Verified" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{doctor.email}</p>
                        <p className="text-xs text-gray-400">{doctor.licenseNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doctor.specialty}</p>
                      {doctor.subSpecialty && (
                        <p className="text-xs text-gray-500">{doctor.subSpecialty}</p>
                      )}
                      <p className="text-xs text-gray-400">{doctor.experience} years exp.</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <div>
                        <p className="text-sm text-gray-900">{doctor.city}</p>
                        <p className="text-xs text-gray-500">{doctor.hospital}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doctor.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doctor.totalConsults}</p>
                      <p className="text-xs text-gray-500">${doctor.consultationFee}/consult</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{formatLastActive(doctor.lastActive)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(doctor, 'view')}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(doctor, 'edit')}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {doctor.status === 'active' && (
                        <button
                          onClick={() => handleAction(doctor, 'suspend')}
                          className="text-orange-600 hover:text-orange-800"
                          title="Suspend"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      )}
                      {doctor.status === 'suspended' && (
                        <button
                          onClick={() => handleAction(doctor, 'activate')}
                          className="text-green-600 hover:text-green-800"
                          title="Activate"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(doctor, 'delete')}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredAndSortedDoctors.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredAndSortedDoctors.length}</span>{' '}
                  results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                


                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border text-sm rounded ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal.show && showActionModal.doctor && showActionModal.action && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              {showActionModal.action === 'delete' ? (
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              ) : (
                <Shield className="h-6 w-6 text-blue-500 mr-3" />
              )}
              <h3 className="text-lg font-medium text-gray-900">
                Confirm {showActionModal.action.charAt(0).toUpperCase() + showActionModal.action.slice(1)}
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Are you sure you want to {showActionModal.action} <strong>{showActionModal.doctor.name}</strong>?
              </p>
              {showActionModal.action === 'delete' && (
                <p className="text-sm text-red-600 mt-2">
                  This action cannot be undone.
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowActionModal({show: false})}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded-lg text-white ${
                  showActionModal.action === 'delete'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm {showActionModal.action.charAt(0).toUpperCase() + showActionModal.action.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedDoctors.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedSpecialty || selectedCity || selectedStatus
              ? 'Try adjusting your search criteria or filters.'
              : 'Get started by adding your first doctor.'}
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;