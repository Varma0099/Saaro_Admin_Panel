import React, { useState, useEffect } from 'react';
import {
  FileText,
  Brain,
  Shield,
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Stethoscope,
  Activity,
  Lock,
  Unlock,
  RefreshCw,
  TrendingUp,
  Database,
  Zap
} from 'lucide-react';

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: 'active' | 'completed' | 'discontinued';
  prescribedAt: string;
  aiSuggested: boolean;
  cdssTriggered: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

interface AINote {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  noteType: 'diagnosis' | 'treatment' | 'followup' | 'medication';
  originalNote: string;
  aiSuggestion: string;
  confidence: number;
  status: 'pending' | 'accepted' | 'rejected' | 'modified';
  createdAt: string;
  updatedAt: string;
}

interface CDSSAudit {
  id: string;
  triggerId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  triggerType: 'drug-interaction' | 'allergy-alert' | 'dosage-warning' | 'clinical-guideline';
  suggestion: string;
  severity: 'info' | 'warning' | 'critical';
  action: 'accepted' | 'overridden' | 'ignored';
  timestamp: string;
  responseTime: number;
}

interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: 'view' | 'edit' | 'delete' | 'export';
  resource: string;
  patientId: string;
  timestamp: string;
  ipAddress: string;
  encrypted: boolean;
}

const EMRPage: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7');
  
  
  const [prescriptions] = useState<Prescription[]>([
    {
      id: 'rx001',
      patientId: 'p001',
      patientName: 'John Smith',
      doctorId: 'd001',
      doctorName: 'Dr. Sarah Johnson',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '30 days',
      status: 'active',
      prescribedAt: '2024-06-01T10:30:00Z',
      aiSuggested: true,
      cdssTriggered: true,
      riskLevel: 'medium'
    },
    {
      id: 'rx002',
      patientId: 'p002',
      patientName: 'Emily Davis',
      doctorId: 'd002',
      doctorName: 'Dr. Michael Chen',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '90 days',
      status: 'active',
      prescribedAt: '2024-06-02T14:15:00Z',
      aiSuggested: false,
      cdssTriggered: true,
      riskLevel: 'low'
    },
    {
      id: 'rx003',
      patientId: 'p003',
      patientName: 'Robert Wilson',
      doctorId: 'd001',
      doctorName: 'Dr. Sarah Johnson',
      medication: 'Warfarin',
      dosage: '5mg',
      frequency: 'Once daily',
      duration: '60 days',
      status: 'active',
      prescribedAt: '2024-06-03T09:45:00Z',
      aiSuggested: true,
      cdssTriggered: true,
      riskLevel: 'high'
    }
  ]);

  const [aiNotes] = useState<AINote[]>([
    {
      id: 'ai001',
      patientId: 'p001',
      patientName: 'John Smith',
      doctorId: 'd001',
      doctorName: 'Dr. Sarah Johnson',
      noteType: 'diagnosis',
      originalNote: 'Patient presents with elevated blood glucose levels',
      aiSuggestion: 'Consider Type 2 Diabetes Mellitus diagnosis. Recommend HbA1c test and lifestyle counseling.',
      confidence: 0.92,
      status: 'accepted',
      createdAt: '2024-06-01T10:25:00Z',
      updatedAt: '2024-06-01T10:30:00Z'
    },
    {
      id: 'ai002',
      patientId: 'p002',
      patientName: 'Emily Davis',
      doctorId: 'd002',
      doctorName: 'Dr. Michael Chen',
      noteType: 'treatment',
      originalNote: 'Patient has hypertension, currently uncontrolled',
      aiSuggestion: 'Suggest ACE inhibitor therapy. Monitor blood pressure weekly for first month.',
      confidence: 0.88,
      status: 'pending',
      createdAt: '2024-06-02T14:10:00Z',
      updatedAt: '2024-06-02T14:10:00Z'
    }
  ]);

  const [cdssAudits] = useState<CDSSAudit[]>([
    {
      id: 'cdss001',
      triggerId: 'trig001',
      patientId: 'p001',
      patientName: 'John Smith',
      doctorId: 'd001',
      doctorName: 'Dr. Sarah Johnson',
      triggerType: 'drug-interaction',
      suggestion: 'Metformin may interact with kidney function. Monitor creatinine levels.',
      severity: 'warning',
      action: 'accepted',
      timestamp: '2024-06-01T10:30:00Z',
      responseTime: 45
    },
    {
      id: 'cdss002',
      triggerId: 'trig002',
      patientId: 'p003',
      patientName: 'Robert Wilson',
      doctorId: 'd001',
      doctorName: 'Dr. Sarah Johnson',
      triggerType: 'dosage-warning',
      suggestion: 'Warfarin dosage requires INR monitoring. Schedule weekly lab work.',
      severity: 'critical',
      action: 'accepted',
      timestamp: '2024-06-03T09:45:00Z',
      responseTime: 12
    }
  ]);

  const [accessLogs] = useState<AccessLog[]>([
    {
      id: 'log001',
      userId: 'u001',
      userName: 'Dr. Sarah Johnson',
      action: 'view',
      resource: 'Patient Record - John Smith',
      patientId: 'p001',
      timestamp: '2024-06-01T10:25:00Z',
      ipAddress: '192.168.1.100',
      encrypted: true
    },
    {
      id: 'log002',
      userId: 'u002',
      userName: 'Dr. Michael Chen',
      action: 'edit',
      resource: 'Prescription - Emily Davis',
      patientId: 'p002',
      timestamp: '2024-06-02T14:15:00Z',
      ipAddress: '192.168.1.101',
      encrypted: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'discontinued': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'accepted': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'modified': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPrescriptions = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Prescriptions</p>
              <p className="text-2xl font-bold text-slate-800">{prescriptions.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">AI Suggested</p>
              <p className="text-2xl font-bold text-slate-800">
                {prescriptions.filter(p => p.aiSuggested).length}
              </p>
            </div>
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">CDSS Triggered</p>
              <p className="text-2xl font-bold text-slate-800">
                {prescriptions.filter(p => p.cdssTriggered).length}
              </p>
            </div>
            <Zap className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">High Risk</p>
              <p className="text-2xl font-bold text-slate-800">
                {prescriptions.filter(p => p.riskLevel === 'high').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Prescription Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Medication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dosage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">AI/CDSS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {prescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm font-medium text-slate-900">{prescription.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Stethoscope className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-900">{prescription.doctorName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900">{prescription.medication}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900">{prescription.dosage}</span>
                    <div className="text-xs text-slate-500">{prescription.frequency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(prescription.riskLevel)}`}>
                      {prescription.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {prescription.aiSuggested && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                          <Brain className="h-3 w-3 mr-1" />
                          AI
                        </span>
                      )}
                      {prescription.cdssTriggered && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Zap className="h-3 w-3 mr-1" />
                          CDSS
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(prescription.prescribedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#49A097] hover:text-[#49A097]/80 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAINotes = () => (
    <div className="space-y-6">
      {/* AI Notes Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total AI Suggestions</p>
              <p className="text-2xl font-bold text-slate-800">{aiNotes.length}</p>
            </div>
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Accepted</p>
              <p className="text-2xl font-bold text-slate-800">
                {aiNotes.filter(n => n.status === 'accepted').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-slate-800">
                {aiNotes.filter(n => n.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Avg Confidence</p>
              <p className="text-2xl font-bold text-slate-800">
                {Math.round(aiNotes.reduce((acc, n) => acc + n.confidence, 0) / aiNotes.length * 100)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* AI Notes List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">AI-Suggested Clinical Notes</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {aiNotes.map((note) => (
            <div key={note.id} className="p-6 hover:bg-slate-50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{note.patientName}</h4>
                    <p className="text-sm text-slate-500">{note.doctorName} • {note.noteType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                    {note.status}
                  </span>
                  <span className="text-sm text-slate-500">
                    {Math.round(note.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 mb-3">
                <p className="text-sm text-slate-600 font-medium mb-2">Original Note:</p>
                <p className="text-sm text-slate-800">{note.originalNote}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <p className="text-sm text-purple-600 font-medium mb-2">AI Suggestion:</p>
                <p className="text-sm text-slate-800">{note.aiSuggestion}</p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Created: {formatDate(note.createdAt)}</span>
                <span>Updated: {formatDate(note.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCDSSAudit = () => (
    <div className="space-y-6">
      {/* CDSS Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Triggers</p>
              <p className="text-2xl font-bold text-slate-800">{cdssAudits.length}</p>
            </div>
            <Zap className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Critical Alerts</p>
              <p className="text-2xl font-bold text-slate-800">
                {cdssAudits.filter(a => a.severity === 'critical').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Accepted Rate</p>
              <p className="text-2xl font-bold text-slate-800">
                {Math.round(cdssAudits.filter(a => a.action === 'accepted').length / cdssAudits.length * 100)}%
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Avg Response Time</p>
              <p className="text-2xl font-bold text-slate-800">
                {Math.round(cdssAudits.reduce((acc, a) => acc + a.responseTime, 0) / cdssAudits.length)}s
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* CDSS Audit Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">CDSS Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trigger Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Suggestion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {cdssAudits.map((audit) => (
                <tr key={audit.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm font-medium text-slate-900">{audit.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Stethoscope className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-900">{audit.doctorName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900 capitalize">{audit.triggerType.replace('-', ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-900">{audit.suggestion}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(audit.severity)}`}>
                      {audit.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(audit.action)}`}>
                      {audit.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {audit.responseTime}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(audit.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAccessLogs = () => (
    <div className="space-y-6">
      {/* Access Logs Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Access Events</p>
              <p className="text-2xl font-bold text-slate-800">{accessLogs.length}</p>
            </div>
            <Database className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Encrypted Access</p>
              <p className="text-2xl font-bold text-slate-800">
                {accessLogs.filter(l => l.encrypted).length}
              </p>
            </div>
            <Lock className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Edit Actions</p>
              <p className="text-2xl font-bold text-slate-800">
                {accessLogs.filter(l => l.action === 'edit').length}
              </p>
            </div>
            <Activity className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">View Actions</p>
              <p className="text-2xl font-bold text-slate-800">
                {accessLogs.filter(l => l.action === 'view').length}
              </p>
            </div>
            <Eye className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Access Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Access Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Security</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {accessLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm font-medium text-slate-900">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.action === 'view' ? 'bg-blue-100 text-blue-800' :
                      log.action === 'edit' ? 'bg-orange-100 text-orange-800' :
                      log.action === 'delete' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {log.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-900">{log.resource}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900 font-mono">{log.patientId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900 font-mono">{log.ipAddress}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {log.encrypted ? (
                        <Lock className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <Unlock className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${log.encrypted ? 'text-green-600' : 'text-red-600'}`}>
                        {log.encrypted ? 'Encrypted' : 'Unencrypted'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#49A097] hover:text-[#49A097]/80 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">EMR Analytics & Audit</h1>
              <p className="text-slate-600">Monitor AI-assisted healthcare decisions and system access</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button className="bg-[#49A097] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#49A097]/90 flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prescriptions'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Prescriptions</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('ai-notes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ai-notes'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Notes</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('cdss-audit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cdss-audit'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>CDSS Audit</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('access-logs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'access-logs'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Access Logs</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'prescriptions' && renderPrescriptions()}
        {activeTab === 'ai-notes' && renderAINotes()}
        {activeTab === 'cdss-audit' && renderCDSSAudit()}
        {activeTab === 'access-logs' && renderAccessLogs()}
      </div>
    </div>
  );
};

export default EMRPage;