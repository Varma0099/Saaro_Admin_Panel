
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Upload,
  FileText,
  Download,
  Eye,
  Calendar,
  DollarSign,
  User,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  Paperclip,
  X
} from 'lucide-react';

interface InsuranceClaim {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  appointmentId: string;
  appointmentDate: string;
  claimAmount: number;
  approvedAmount?: number;
  insuranceProvider: string;
  policyNumber: string;
  status: 'submitted' | 'approved' | 'rejected' | 'pending_review';
  submittedDate: string;
  processedDate?: string;
  documents: string[];
  notes?: string;
  rejectionReason?: string;
}

const InsuranceClaims: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // Mock data for insurance claims
  const [insuranceClaims] = useState<InsuranceClaim[]>([
    {
      id: 'IC001',
      patientName: 'Sarah Johnson',
      patientId: 'PT001',
      doctorName: 'Dr. Smith',
      appointmentId: 'AP001',
      appointmentDate: '2024-06-01',
      claimAmount: 500,
      approvedAmount: 450,
      insuranceProvider: 'BlueCross BlueShield',
      policyNumber: 'BC123456789',
      status: 'approved',
      submittedDate: '2024-06-02',
      processedDate: '2024-06-05',
      documents: ['medical_report.pdf', 'prescription.pdf'],
      notes: 'Routine consultation and medication prescription'
    },
    {
      id: 'IC002',
      patientName: 'Michael Chen',
      patientId: 'PT002',
      doctorName: 'Dr. Williams',
      appointmentId: 'AP002',
      appointmentDate: '2024-06-03',
      claimAmount: 800,
      insuranceProvider: 'Aetna',
      policyNumber: 'AET987654321',
      status: 'pending_review',
      submittedDate: '2024-06-04',
      documents: ['lab_results.pdf', 'treatment_plan.pdf'],
      notes: 'Specialist consultation with lab work'
    },
    {
      id: 'IC003',
      patientName: 'Emily Davis',
      patientId: 'PT003',
      doctorName: 'Dr. Brown',
      appointmentId: 'AP003',
      appointmentDate: '2024-05-28',
      claimAmount: 300,
      insuranceProvider: 'United Healthcare',
      policyNumber: 'UHC456789123',
      status: 'rejected',
      submittedDate: '2024-05-30',
      processedDate: '2024-06-01',
      documents: ['consultation_notes.pdf'],
      rejectionReason: 'Pre-authorization required for this type of consultation',
      notes: 'Follow-up consultation'
    },
    {
      id: 'IC004',
      patientName: 'Robert Wilson',
      patientId: 'PT004',
      doctorName: 'Dr. Taylor',
      appointmentId: 'AP004',
      appointmentDate: '2024-06-05',
      claimAmount: 1200,
      insuranceProvider: 'Cigna',
      policyNumber: 'CIG789123456',
      status: 'submitted',
      submittedDate: '2024-06-06',
      documents: ['procedure_report.pdf', 'post_op_notes.pdf'],
      notes: 'Minor surgical procedure'
    }
  ]);

  const filteredClaims = insuranceClaims.filter(claim => {
    const matchesSearch = 
      claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesProvider = providerFilter === 'all' || claim.insuranceProvider === providerFilter;
    
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeUploadFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadDocuments = () => {
    if (selectedClaim && uploadFiles.length > 0) {
      // In a real app, this would upload the files
      console.log(`Uploading ${uploadFiles.length} documents for claim ${selectedClaim.id}`);
      setUploadFiles([]);
      setShowUploadModal(false);
      setSelectedClaim(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      submitted: 'bg-blue-100 text-blue-800 border-blue-200',
      pending_review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const labels = {
      submitted: 'Submitted',
      pending_review: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending_review':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  const uniqueProviders = Array.from(new Set(insuranceClaims.map(claim => claim.insuranceProvider)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Insurance Claims</h2>
          <p className="text-slate-600">Manage insurance claims and documentation</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-600">
            {filteredClaims.length} of {insuranceClaims.length} claims
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
              placeholder="Search by patient, doctor, claim ID, or insurance provider..."
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
                <option value="submitted">Submitted</option>
                <option value="pending_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Insurance Provider</label>
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
              >
                <option value="all">All Providers</option>
                {uniqueProviders.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Insurance Claims List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredClaims.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No insurance claims found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredClaims.map((claim) => (
              <div key={claim.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(claim.status)}
                        <h3 className="font-semibold text-slate-900">#{claim.id}</h3>
                        {getStatusBadge(claim.status)}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Claim Amount</p>
                        <p className="text-lg font-bold text-slate-900">${claim.claimAmount.toLocaleString()}</p>
                        {claim.approvedAmount && (
                          <p className="text-sm text-green-600">Approved: ${claim.approvedAmount.toLocaleString()}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">Patient</p>
                          <p className="font-medium text-slate-900">{claim.patientName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">Doctor</p>
                          <p className="font-medium text-slate-900">{claim.doctorName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">Insurance Provider</p>
                          <p className="font-medium text-slate-900">{claim.insuranceProvider}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">Appointment Date</p>
                          <p className="font-medium text-slate-900">{new Date(claim.appointmentDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">Submitted</p>
                          <p className="font-medium text-slate-900">{new Date(claim.submittedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      {claim.processedDate && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Processed</p>
                            <p className="font-medium text-slate-900">{new Date(claim.processedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {claim.notes && (
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-slate-700 mb-1">Notes:</p>
                        <p className="text-sm text-slate-600">{claim.notes}</p>
                      </div>
                    )}

                    {claim.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-red-700 mb-1">Rejection Reason:</p>
                        <p className="text-sm text-red-600">{claim.rejectionReason}</p>
                      </div>
                    )}

                    {claim.documents.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {claim.documents.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-lg">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-blue-700">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 lg:w-48">
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#3d8579] transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSelectedClaim(claim);
                        setShowUploadModal(true);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Docs</span>
                    </button>
                    
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Upload Documents - {selectedClaim.id}
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedClaim(null);
                  setUploadFiles([]);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-2">
                  Drop files here or click to upload
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-[#49A097] text-white text-sm rounded-lg hover:bg-[#3d8579] transition-colors cursor-pointer"
                >
                  Select Files
                </label>
              </div>

              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Selected Files:</p>
                  {uploadFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeUploadFile(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUploadDocuments}
                  disabled={uploadFiles.length === 0}
                  className="flex-1 px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#3d8579] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Upload Documents
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedClaim(null);
                    setUploadFiles([]);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceClaims;