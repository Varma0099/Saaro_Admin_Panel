import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserX, 
  Calendar, 
  AlertTriangle, 
  RotateCcw,
  Eye,
  MessageSquare,
  Clock,
  User
} from 'lucide-react';

interface BlockedDoctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  email: string;
  phone: string;
  blockedDate: string;
  blockedBy: string;
  reason: string;
  reasonCategory: 'behavior' | 'compliance' | 'violation' | 'complaint' | 'other';
  details: string;
  previousWarnings: number;
  canReactivate: boolean;
  profileImage?: string;
}

const BlockedDoctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<BlockedDoctor | null>(null);
  const [reactivateReason, setReactivateReason] = useState('');

  // Mock data - replace with API call
  const blockedDoctors: BlockedDoctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      city: 'Mumbai',
      email: 'sarah.johnson@email.com',
      phone: '+91 98765 43210',
      blockedDate: '2024-05-15',
      blockedBy: 'Admin John Doe',
      reason: 'Multiple no-shows without prior notice',
      reasonCategory: 'behavior',
      details: 'Doctor failed to show up for 8 scheduled appointments in the past month without informing patients or administration.',
      previousWarnings: 3,
      canReactivate: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      city: 'Delhi',
      email: 'michael.chen@email.com',
      phone: '+91 87654 32109',
      blockedDate: '2024-05-10',
      blockedBy: 'Admin Jane Smith',
      reason: 'License verification failed',
      reasonCategory: 'compliance',
      details: 'Medical license could not be verified with state medical board. Documents provided were found to be invalid.',
      previousWarnings: 0,
      canReactivate: false
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      city: 'Bangalore',
      email: 'priya.sharma@email.com',
      phone: '+91 76543 21098',
      blockedDate: '2024-05-08',
      blockedBy: 'Admin Mike Wilson',
      reason: 'Patient safety concerns',
      reasonCategory: 'violation',
      details: 'Multiple reports of inappropriate conduct during consultations. Investigation found violations of professional ethics.',
      previousWarnings: 2,
      canReactivate: false
    },
    {
      id: '4',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Orthopedics',
      city: 'Chennai',
      email: 'rajesh.kumar@email.com',
      phone: '+91 65432 10987',
      blockedDate: '2024-05-12',
      blockedBy: 'Admin Sarah Lee',
      reason: 'Excessive patient complaints',
      reasonCategory: 'complaint',
      details: 'Received 15+ complaints in the past 2 months regarding poor consultation quality and unprofessional behavior.',
      previousWarnings: 4,
      canReactivate: true
    }
  ];

  const filteredDoctors = blockedDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCategory === 'all' || doctor.reasonCategory === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const handleReactivate = (doctor: BlockedDoctor) => {
    setSelectedDoctor(doctor);
    setShowReactivateModal(true);
  };

  const confirmReactivation = () => {
    if (selectedDoctor && reactivateReason.trim()) {
      
      console.log('Reactivating doctor:', selectedDoctor.id, 'Reason:', reactivateReason);
      setShowReactivateModal(false);
      setSelectedDoctor(null);
      setReactivateReason('');
      
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'behavior': return 'bg-orange-100 text-orange-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      case 'violation': return 'bg-purple-100 text-purple-800';
      case 'complaint': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'behavior': return <Clock className="h-4 w-4" />;
      case 'compliance': return <AlertTriangle className="h-4 w-4" />;
      case 'violation': return <UserX className="h-4 w-4" />;
      case 'complaint': return <MessageSquare className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Blocked Doctors</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage suspended and blocked doctor accounts
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="behavior">Behavior Issues</option>
              <option value="compliance">Compliance</option>
              <option value="violation">Violations</option>
              <option value="complaint">Complaints</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <UserX className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600">Total Blocked</p>
              <p className="text-2xl font-bold text-red-700">{blockedDoctors.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">Behavior Issues</p>
              <p className="text-2xl font-bold text-orange-700">
                {blockedDoctors.filter(d => d.reasonCategory === 'behavior').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Violations</p>
              <p className="text-2xl font-bold text-purple-700">
                {blockedDoctors.filter(d => d.reasonCategory === 'violation').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <RotateCcw className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Can Reactivate</p>
              <p className="text-2xl font-bold text-green-700">
                {blockedDoctors.filter(d => d.canReactivate).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blocked Doctors Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Block Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                        <div className="text-sm text-gray-500">{doctor.city}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        {new Date(doctor.blockedDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">by {doctor.blockedBy}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(doctor.reasonCategory)}`}>
                        {getCategoryIcon(doctor.reasonCategory)}
                        <span className="ml-1 capitalize">{doctor.reasonCategory}</span>
                      </div>
                      <div className="text-sm text-gray-900 font-medium">{doctor.reason}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">{doctor.details}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doctor.previousWarnings > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {doctor.previousWarnings} warnings
                        </span>
                      ) : (
                        <span className="text-gray-500">No warnings</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    
                    {doctor.canReactivate && (
                      <button 
                        onClick={() => handleReactivate(doctor)}
                        className="text-green-600 hover:text-green-900 inline-flex items-center"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <UserX className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blocked doctors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No doctors are currently blocked.'}
            </p>
          </div>
        )}
      </div>

      {/* Reactivation Modal */}
      {showReactivateModal && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <RotateCcw className="h-6 w-6 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                Reactivate Doctor Account
              </h3>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{selectedDoctor.name}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty} • {selectedDoctor.city}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Blocked: {selectedDoctor.reason}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Reactivation *
                </label>
                <textarea
                  value={reactivateReason}
                  onChange={(e) => setReactivateReason(e.target.value)}
                  placeholder="Please provide a detailed reason for reactivating this doctor's account..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowReactivateModal(false);
                    setSelectedDoctor(null);
                    setReactivateReason('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReactivation}
                  disabled={!reactivateReason.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedDoctors;