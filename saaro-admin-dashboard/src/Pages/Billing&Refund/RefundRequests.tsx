
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Check,
  X,
  MessageSquare,
  Calendar,
  DollarSign,
  User,
  Clock,
  AlertTriangle,
  ChevronDown,
  Send
} from 'lucide-react';

interface RefundRequest {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  appointmentId: string;
  appointmentDate: string;
  amount: number;
  issue: string;
  reason: 'complaint' | 'missed_appointment' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  description: string;
}

const RefundRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reasonFilter, setReasonFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RefundRequest | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data for refund requests
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([
    {
      id: 'RF001',
      patientName: 'Sarah Johnson',
      patientId: 'PT001',
      doctorName: 'Dr. Smith',
      appointmentId: 'AP001',
      appointmentDate: '2024-06-01',
      amount: 150,
      issue: 'Doctor arrived 2 hours late',
      reason: 'complaint',
      status: 'pending',
      submittedDate: '2024-06-02',
      description: 'Patient waited for 2 hours and doctor was significantly late without prior notice.'
    },
    {
      id: 'RF002',
      patientName: 'Michael Chen',
      patientId: 'PT002',
      doctorName: 'Dr. Williams',
      appointmentId: 'AP002',
      appointmentDate: '2024-06-03',
      amount: 200,
      issue: 'Patient missed appointment due to emergency',
      reason: 'missed_appointment',
      status: 'pending',
      submittedDate: '2024-06-04',
      description: 'Patient had a family emergency and could not attend the scheduled appointment.'
    },
    {
      id: 'RF003',
      patientName: 'Emily Davis',
      patientId: 'PT003',
      doctorName: 'Dr. Brown',
      appointmentId: 'AP003',
      appointmentDate: '2024-05-28',
      amount: 175,
      issue: 'Billing error - charged twice',
      reason: 'other',
      status: 'approved',
      submittedDate: '2024-05-30',
      description: 'Patient was charged twice for the same consultation due to system error.'
    },
    {
      id: 'RF004',
      patientName: 'Robert Wilson',
      patientId: 'PT004',
      doctorName: 'Dr. Taylor',
      appointmentId: 'AP004',
      appointmentDate: '2024-05-25',
      amount: 120,
      issue: 'Poor service quality',
      reason: 'complaint',
      status: 'rejected',
      submittedDate: '2024-05-26',
      description: 'Patient complained about rushed consultation and inadequate care.'
    }
  ]);

  const filteredRequests = refundRequests.filter(request => {
    const matchesSearch = 
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesReason = reasonFilter === 'all' || request.reason === reasonFilter;
    
    return matchesSearch && matchesStatus && matchesReason;
  });

  const handleApprove = (requestId: string) => {
    setRefundRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' as const }
          : req
      )
    );
  };

  const handleReject = (requestId: string) => {
    setRefundRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
  };

  const handleSendMessage = () => {
    if (selectedRequest && message.trim()) {
      // In a real app, this would send the message
      console.log(`Message sent to ${selectedRequest.patientName}: ${message}`);
      setMessage('');
      setShowMessageModal(false);
      setSelectedRequest(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return `px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`;
  };

  const getReasonBadge = (reason: string) => {
    const styles = {
      complaint: 'bg-red-50 text-red-700 border-red-200',
      missed_appointment: 'bg-blue-50 text-blue-700 border-blue-200',
      other: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    const labels = {
      complaint: 'Complaint',
      missed_appointment: 'Missed Appointment',
      other: 'Other'
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles[reason as keyof typeof styles]}`}>
        {labels[reason as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Refund Requests</h2>
          <p className="text-slate-600">Manage and process refund requests from patients</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-600">
            {filteredRequests.length} of {refundRequests.length} requests
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by patient, doctor, or request ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Reason</label>
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
              >
                <option value="all">All Reasons</option>
                <option value="complaint">Complaints</option>
                <option value="missed_appointment">Missed Appointments</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Refund Requests List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No refund requests found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-slate-900">#{request.id}</h3>
                          <span className={getStatusBadge(request.status)}>{request.status}</span>
                          {getReasonBadge(request.reason)}
                        </div>
                        <p className="text-slate-600 font-medium">{request.issue}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Patient:</span>
                        <span className="font-medium text-slate-900">{request.patientName}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Doctor:</span>
                        <span className="font-medium text-slate-900">{request.doctorName}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Appointment:</span>
                        <span className="font-medium text-slate-900">{request.appointmentDate}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Amount:</span>
                        <span className="font-bold text-slate-900">${request.amount}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>Submitted on {request.submittedDate}</span>
                    </div>
                    
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {request.description}
                    </p>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-32">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowMessageModal(true);
                        }}
                        className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Send Message to {selectedRequest.patientName}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent resize-none"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#3a8175] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
              
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setSelectedRequest(null);
                  setMessage('');
                }}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundRequests;