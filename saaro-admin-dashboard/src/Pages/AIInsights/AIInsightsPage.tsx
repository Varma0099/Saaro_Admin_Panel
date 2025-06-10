import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Pill, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Filter,
  Search,
  Calendar,
  User,
  Stethoscope,
  FileText,
  Star,
  Activity
} from 'lucide-react';

const AIInsightsPage = ({ currentPath }: { currentPath?: string }) => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7days');

  // Update active tab based on current path
  useEffect(() => {
    if (currentPath?.includes('/feedback')) {
      setActiveTab('feedback');
    } else if (currentPath?.includes('/risky-cases')) {
      setActiveTab('risky-cases');
    } else {
      setActiveTab('prescriptions');
    }
  }, [currentPath]);

  // Mock data for AI prescriptions
  const aiPrescriptions = [
    {
      id: 'AI001',
      patientName: 'John Doe',
      patientId: 'P12345',
      doctorName: 'Dr. Sarah Wilson',
      medication: 'Amoxicillin 500mg',
      aiConfidence: 94,
      status: 'approved' as const,
      timestamp: '2025-06-08T10:30:00Z',
      symptoms: ['Fever', 'Sore throat', 'Headache'],
      riskLevel: 'low' as const,
      feedbackGiven: true
    },
    {
      id: 'AI002',
      patientName: 'Emily Johnson',
      patientId: 'P67890',
      doctorName: 'Dr. Michael Chen',
      medication: 'Metformin 850mg',
      aiConfidence: 87,
      status: 'modified' as const,
      timestamp: '2025-06-08T09:15:00Z',
      symptoms: ['High blood sugar', 'Fatigue', 'Increased thirst'],
      riskLevel: 'medium' as const,
      feedbackGiven: false
    },
    {
      id: 'AI003',
      patientName: 'Robert Smith',
      patientId: 'P11223',
      doctorName: 'Dr. Lisa Rodriguez',
      medication: 'Warfarin 5mg',
      aiConfidence: 76,
      status: 'rejected' as const,
      timestamp: '2025-06-08T08:45:00Z',
      symptoms: ['Chest pain', 'Shortness of breath'],
      riskLevel: 'high' as const,
      feedbackGiven: true
    }
  ];

  // Mock data for doctor feedback
  const doctorFeedback = [
    {
      id: 'FB001',
      doctorName: 'Dr. Sarah Wilson',
      prescriptionId: 'AI001',
      rating: 5,
      feedback: 'AI suggestion was spot-on. The recommended dosage and medication were perfect for the patient\'s condition.',
      timestamp: '2025-06-08T11:00:00Z',
      category: 'accuracy',
      helpful: true
    },
    {
      id: 'FB002',
      doctorName: 'Dr. Michael Chen',
      prescriptionId: 'AI002',
      rating: 3,
      feedback: 'Good suggestion but needed adjustment for patient\'s kidney function. Consider adding more patient history context.',
      timestamp: '2025-06-08T10:45:00Z',
      category: 'improvement',
      helpful: true
    },
    {
      id: 'FB003',
      doctorName: 'Dr. Lisa Rodriguez',
      prescriptionId: 'AI003',
      rating: 2,
      feedback: 'AI missed critical drug interactions. Patient was on multiple medications that could cause complications.',
      timestamp: '2025-06-08T09:30:00Z',
      category: 'safety',
      helpful: false
    }
  ];

  // Mock data for risky cases
  const riskyCases = [
    {
      id: 'RISK001',
      patientName: 'Margaret Wilson',
      patientId: 'P55667',
      riskScore: 89,
      riskFactors: ['Multiple drug allergies', 'Kidney disease', 'Age 78'],
      flaggedBy: 'AI System',
      timestamp: '2025-06-08T12:15:00Z',
      status: 'under_review' as const,
      assignedDoctor: 'Dr. Jennifer Davis',
      priority: 'high' as const
    },
    {
      id: 'RISK002',
      patientName: 'David Brown',
      patientId: 'P44556',
      riskScore: 72,
      riskFactors: ['Diabetes', 'Heart condition', 'Recent surgery'],
      flaggedBy: 'AI System',
      timestamp: '2025-06-08T11:30:00Z',
      status: 'resolved' as const,
      assignedDoctor: 'Dr. Robert Kim',
      priority: 'medium' as const
    },
    {
      id: 'RISK003',
      patientName: 'Susan Taylor',
      patientId: 'P33445',
      riskScore: 95,
      riskFactors: ['Pregnancy', 'Multiple medications', 'History of complications'],
      flaggedBy: 'AI System',
      timestamp: '2025-06-08T10:00:00Z',
      status: 'urgent' as const,
      assignedDoctor: 'Dr. Amanda Foster',
      priority: 'critical' as const
    }
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'modified': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (level: string): string => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderPrescriptionsTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search prescriptions..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select 
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="modified">Modified</option>
            <option value="rejected">Rejected</option>
          </select>
          <select 
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097]"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="grid gap-6">
        {aiPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-[#49A097]" />
                    <span className="font-semibold text-lg">{prescription.medication}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                    {prescription.status.replace('_', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prescription.riskLevel)}`}>
                    {prescription.riskLevel} risk
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Patient Information</h4>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><User className="inline h-4 w-4 mr-1" />{prescription.patientName}</p>
                      <p>ID: {prescription.patientId}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Prescribing Doctor</h4>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><Stethoscope className="inline h-4 w-4 mr-1" />{prescription.doctorName}</p>
                      <p>{new Date(prescription.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-slate-800 mb-2">Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {prescription.symptoms.map((symptom, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-[#49A097]" />
                      <span className="text-sm text-slate-600">AI Confidence: {prescription.aiConfidence}%</span>
                    </div>
                    {prescription.feedbackGiven && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Feedback Given</span>
                      </div>
                    )}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-[#49A097] hover:bg-[#49A097]/10 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedbackTab = () => (
    <div className="space-y-6">
      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">4.2</p>
              <p className="text-sm text-slate-600">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">156</p>
              <p className="text-sm text-slate-600">Total Reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">89%</p>
              <p className="text-sm text-slate-600">Helpful</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">23</p>
              <p className="text-sm text-slate-600">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {doctorFeedback.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#49A097] rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{feedback.doctorName}</p>
                  <p className="text-sm text-slate-600">Prescription: {feedback.prescriptionId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {new Date(feedback.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p className="text-slate-700 mb-3">{feedback.feedback}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  feedback.category === 'accuracy' ? 'bg-green-100 text-green-700' :
                  feedback.category === 'improvement' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {feedback.category}
                </span>
                {feedback.helpful && (
                  <span className="text-green-600 text-sm flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Helpful
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRiskyCasesTab = () => (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Critical Cases</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Under Review</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Resolved Today</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* Risky Cases List */}
      <div className="space-y-4">
        {riskyCases.map((riskCase) => (
          <div key={riskCase.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  riskCase.priority === 'critical' ? 'bg-red-100' :
                  riskCase.priority === 'high' ? 'bg-orange-100' :
                  'bg-yellow-100'
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    riskCase.priority === 'critical' ? 'text-red-600' :
                    riskCase.priority === 'high' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{riskCase.patientName}</p>
                  <p className="text-sm text-slate-600">Patient ID: {riskCase.patientId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskCase.priority)}`}>
                  {riskCase.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(riskCase.status)}`}>
                  {riskCase.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Risk Score</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        riskCase.riskScore >= 80 ? 'bg-red-500' :
                        riskCase.riskScore >= 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${riskCase.riskScore}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-slate-800">{riskCase.riskScore}</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Assigned Doctor</h4>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Stethoscope className="h-4 w-4" />
                  {riskCase.assignedDoctor}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">Risk Factors</h4>
              <div className="flex flex-wrap gap-2">
                {riskCase.riskFactors.map((factor, index) => (
                  <span key={index} className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Flagged by {riskCase.flaggedBy} • {new Date(riskCase.timestamp).toLocaleString()}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-[#49A097] hover:bg-[#49A097]/10 rounded-lg transition-colors">
                  View Details
                </button>
                {riskCase.status === 'urgent' && (
                  <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors">
                    Take Action
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'prescriptions':
        return renderPrescriptionsTab();
      case 'feedback':
        return renderFeedbackTab();
      case 'risky-cases':
        return renderRiskyCasesTab();
      default:
        return renderPrescriptionsTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          AI Insights Monitor
        </h1>
        <p className="text-slate-600 text-lg">
          Track AI-generated prescriptions, doctor feedback, and monitor risky patient cases
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'prescriptions'
                ? 'text-[#49A097] border-b-2 border-[#49A097] bg-[#49A097]/5'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Pill className="h-5 w-5" />
              AI Prescriptions
            </div>
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'feedback'
                ? 'text-[#49A097] border-b-2 border-[#49A097] bg-[#49A097]/5'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Doctor Feedback
            </div>
          </button>
          <button
            onClick={() => setActiveTab('risky-cases')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'risky-cases'
                ? 'text-[#49A097] border-b-2 border-[#49A097] bg-[#49A097]/5'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risky Cases
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default AIInsightsPage;