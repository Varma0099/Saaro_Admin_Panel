import React, { useState } from 'react';
import { AlertTriangle, Clock, UserX, MessageSquare, CheckCircle, XCircle, Eye, Flag, Filter, Calendar, User, Phone, FileText, AlertCircle } from 'lucide-react';

interface IssueLog {
  id: string;
  appointmentId: string;
  issueType: 'delay' | 'cancel' | 'no_show' | 'complaint' | 'technical' | 'billing';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  reportedBy: 'auto' | 'patient' | 'doctor' | 'admin';
  reportedAt: string;
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
  status: 'Open' | 'In Process' | 'Resolved' | 'Closed';
  assignedTo?: string;
  actionTaken?: string;
  resolvedAt?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  tags?: string[];
}

const IssueLogs: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const [issues, setIssues] = useState<IssueLog[]>([
    {
      id: '1',
      appointmentId: 'APT-2025-004',
      issueType: 'delay',
      severity: 'Medium',
      title: 'Doctor Delayed Join',
      description: 'Doctor joined the consultation 15 minutes late, causing patient frustration.',
      reportedBy: 'auto',
      reportedAt: '2025-06-05 10:15:00',
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
      status: 'Open',
      assignedTo: 'Admin Team',
      priority: 'Medium',
      tags: ['auto-detected', 'delay']
    },
    {
      id: '2',
      appointmentId: 'APT-2025-005',
      issueType: 'complaint',
      severity: 'High',
      title: 'Patient Complaint - Poor Audio Quality',
      description: 'Patient reported severe audio issues during consultation, making communication difficult.',
      reportedBy: 'patient',
      reportedAt: '2025-06-05 14:30:00',
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
      status: 'In Process',
      assignedTo: 'Technical Support',
      actionTaken: 'Investigating audio codec issues',
      priority: 'High',
      tags: ['patient-reported', 'technical', 'audio']
    },
    {
      id: '3',
      appointmentId: 'APT-2025-006',
      issueType: 'no_show',
      severity: 'Low',
      title: 'Patient No Show',
      description: 'Patient did not join the scheduled consultation.',
      reportedBy: 'auto',
      reportedAt: '2025-06-04 16:15:00',
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
      status: 'Resolved',
      assignedTo: 'Patient Care',
      actionTaken: 'Appointment rescheduled successfully',
      resolvedAt: '2025-06-04 17:00:00',
      priority: 'Low',
      tags: ['auto-detected', 'no-show', 'rescheduled']
    },
    {
      id: '4',
      appointmentId: 'APT-2025-007',
      issueType: 'technical',
      severity: 'Critical',
      title: 'Video Call System Failure',
      description: 'Complete system failure during consultation, session could not be completed.',
      reportedBy: 'doctor',
      reportedAt: '2025-06-05 11:45:00',
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
      status: 'Open',
      assignedTo: 'IT Department',
      priority: 'Urgent',
      tags: ['doctor-reported', 'system-failure', 'critical']
    }
  ]);

  const getIssueTypeInfo = (type: string) => {
    switch (type) {
      case 'delay':
        return { label: 'Delay', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock };
      case 'cancel':
        return { label: 'Cancellation', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle };
      case 'no_show':
        return { label: 'No Show', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: UserX };
      case 'complaint':
        return { label: 'Complaint', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: MessageSquare };
      case 'technical':
        return { label: 'Technical', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: AlertCircle };
      case 'billing':
        return { label: 'Billing', color: 'bg-green-100 text-green-800 border-green-200', icon: FileText };
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertTriangle };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800 border-red-200';
      case 'In Process': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const typeMatch = filter === 'All' || issue.issueType === filter;
    const statusMatch = statusFilter === 'All' || issue.status === statusFilter;
    const priorityMatch = priorityFilter === 'All' || issue.priority === priorityFilter;
    return typeMatch && statusMatch && priorityMatch;
  });

  const handleSelectIssue = (id: string) => {
    setSelectedIssues(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on issues:`, selectedIssues);
    setSelectedIssues([]);
  };

  const handleStatusChange = (id: string, newStatus: 'Open' | 'In Process' | 'Resolved' | 'Closed') => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === id 
          ? { 
              ...issue, 
              status: newStatus,
              resolvedAt: newStatus === 'Resolved' ? new Date().toISOString() : issue.resolvedAt
            }
          : issue
      )
    );
  };

  const handlePriorityChange = (id: string, newPriority: 'Low' | 'Medium' | 'High' | 'Urgent') => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === id 
          ? { ...issue, priority: newPriority }
          : issue
      )
    );
  };

  const getIssueStats = () => {
    const total = issues.length;
    const open = issues.filter(i => i.status === 'Open').length;
    const inProcess = issues.filter(i => i.status === 'In Process').length;
    const resolved = issues.filter(i => i.status === 'Resolved').length;
    const urgent = issues.filter(i => i.priority === 'Urgent').length;
    
    return { total, open, inProcess, resolved, urgent };
  };

  const stats = getIssueStats();

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Issues</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-500 rounded-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Open</p>
              <p className="text-2xl font-bold text-red-700">{stats.open}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">In Process</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.inProcess}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Resolved</p>
              <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Flag className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Urgent</p>
              <p className="text-2xl font-bold text-purple-700">{stats.urgent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Types</option>
                <option value="delay">Delay</option>
                <option value="cancel">Cancellation</option>
                <option value="no_show">No Show</option>
                <option value="complaint">Complaint</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Process">In Process</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {selectedIssues.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('resolve')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark Resolved ({selectedIssues.length})
              </button>
              <button
                onClick={() => handleBulkAction('assign')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bulk Assign
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Issue List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIssues(filteredIssues.map(i => i.id));
                      } else {
                        setSelectedIssues([]);
                      }
                    }}
                    checked={selectedIssues.length === filteredIssues.length && filteredIssues.length > 0}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => {
                const typeInfo = getIssueTypeInfo(issue.issueType);
                const IconComponent = typeInfo.icon;
                
                return (
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIssues.includes(issue.id)}
                        onChange={() => handleSelectIssue(issue.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${typeInfo.color.replace('text-', 'bg-').replace('border-', '').split(' ')[0]}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{issue.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{issue.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">#{issue.appointmentId}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                              {issue.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={issue.priority}
                        onChange={(e) => handlePriorityChange(issue.id, e.target.value as any)}
                        className={`border rounded-lg px-3 py-1 text-sm font-medium ${getPriorityColor(issue.priority)}`}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue.id, e.target.value as any)}
                        className={`border rounded-lg px-3 py-1 text-sm font-medium ${getStatusColor(issue.status)}`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Process">In Process</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{issue.doctor.name}</div>
                          <div className="text-xs text-gray-500">{issue.doctor.specialty}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{issue.patient.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {issue.patient.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(issue.reportedAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        by {issue.reportedBy}
                      </div>
                      {issue.assignedTo && (
                        <div className="text-xs text-blue-600 mt-1">
                          Assigned: {issue.assignedTo}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Flag className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueLogs;