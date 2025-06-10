import React, { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  FileText,
  Eye,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  UserPlus,
  LogIn,
  Settings,
  RefreshCw
} from 'lucide-react';

// Define types
interface AuditLog {
  id: string;
  action_type: string;
  user_id: string;
  user_email: string;
  role: string;
  timestamp: string;
  ip_address: string;
  module: string;
  record_id: string;
  changes: {
    old_value: string;
    new_value: string;
    field: string;
  } | null;
  description: string;
  status: string;
}

interface Filters {
  dateRange: string;
  user: string;
  module: string;
  action: string;
}

interface AuditTrailPageProps {
  currentPath: string;
}

interface LogDetailModalProps {
  log: AuditLog | null;
  onClose: () => void;
}

// Mock data for audit logs
const generateMockLogs = (): AuditLog[] => {
  const actions = ['login', 'update', 'approve', 'delete', 'create', 'view', 'export'];
  const modules = ['doctors', 'patients', 'appointments', 'hospitals', 'billing', 'settings', 'users'];
  const users = ['admin@saarohealth.com', 'moderator@saarohealth.com', 'support@saarohealth.com'];
  const roles = ['Super Admin', 'Admin', 'Moderator'];
  
  const logs: AuditLog[] = [];
  for (let i = 0; i < 50; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const module = modules[Math.floor(Math.random() * modules.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    logs.push({
      id: `log_${1000 + i}`,
      action_type: action,
      user_id: `user_${100 + i}`,
      user_email: user,
      role: role,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      module: module,
      record_id: `${module}_${Math.floor(Math.random() * 1000)}`,
      changes: action === 'update' ? {
        old_value: 'Previous Value',
        new_value: 'Updated Value',
        field: 'status'
      } : null,
      description: getActionDescription(action, module),
      status: Math.random() > 0.1 ? 'success' : 'failed'
    });
  }
  
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const getActionDescription = (action: string, module: string): string => {
  const descriptions: Record<string, string> = {
    login: 'User logged into the system',
    update: `Updated ${module} record`,
    approve: `Approved ${module} request`,
    delete: `Deleted ${module} record`,
    create: `Created new ${module} record`,
    view: `Viewed ${module} details`,
    export: `Exported ${module} data`
  };
  return descriptions[action] || 'System action performed';
};

const getActionIcon = (action: string) => {
  const icons: Record<string, any> = {
    login: LogIn,
    update: Edit,
    approve: CheckCircle,
    delete: Trash2,
    create: UserPlus,
    view: Eye,
    export: Download
  };
  return icons[action] || Activity;
};

const getActionColor = (action: string): string => {
  const colors: Record<string, string> = {
    login: 'blue',
    update: 'amber',
    approve: 'green',
    delete: 'red',
    create: 'emerald',
    view: 'slate',
    export: 'purple'
  };
  return colors[action] || 'slate';
};

const AuditTrailPage: React.FC<AuditTrailPageProps> = ({ currentPath }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    dateRange: 'all',
    user: 'all',
    module: 'all',
    action: 'all'
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockLogs = generateMockLogs();
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = logs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const days: Record<string, number> = {
        '1d': 1,
        '7d': 7,
        '30d': 30,
        '90d': 90
      };
      const cutoff = new Date(now.getTime() - days[filters.dateRange] * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(log => new Date(log.timestamp) >= cutoff);
    }

    // User filter
    if (filters.user !== 'all') {
      filtered = filtered.filter(log => log.user_email === filters.user);
    }

    // Module filter
    if (filters.module !== 'all') {
      filtered = filtered.filter(log => log.module === filters.module);
    }

    // Action filter
    if (filters.action !== 'all') {
      filtered = filtered.filter(log => log.action_type === filters.action);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, filters, logs]);

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Role', 'Action', 'Module', 'Description', 'IP Address', 'Status'],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.user_email,
        log.role,
        log.action_type,
        log.module,
        log.description,
        log.ip_address,
        log.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const LogDetailModal: React.FC<LogDetailModalProps> = ({ log, onClose }) => {
    if (!log) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Audit Log Details</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Log ID</label>
                <p className="text-slate-800 font-mono">{log.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Timestamp</label>
                <p className="text-slate-800">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">User</label>
                <p className="text-slate-800">{log.user_email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Role</label>
                <p className="text-slate-800">{log.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Action</label>
                <p className="text-slate-800 capitalize">{log.action_type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Module</label>
                <p className="text-slate-800 capitalize">{log.module}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">IP Address</label>
                <p className="text-slate-800 font-mono">{log.ip_address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Status</label>
                <div className="flex items-center">
                  {log.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className={`capitalize ${log.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {log.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Description</label>
              <p className="text-slate-800">{log.description}</p>
            </div>
            
            {log.changes && (
              <div>
                <label className="text-sm font-medium text-slate-600">Changes Made</label>
                <div className="bg-slate-50 rounded-lg p-4 mt-2">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-slate-600">Field:</span>
                      <span className="ml-2 text-slate-800">{log.changes.field}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">Old Value:</span>
                      <span className="ml-2 text-red-600 line-through">{log.changes.old_value}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">New Value:</span>
                      <span className="ml-2 text-green-600">{log.changes.new_value}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#49A097]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center">
              <Shield className="h-8 w-8 text-[#49A097] mr-3" />
              Audit Trail & System Logs
            </h1>
            <p className="text-slate-600 mt-2">
              Track all system activities, user actions, and changes made across the platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-300 ${
                showFilters 
                  ? 'bg-[#49A097] text-white border-[#49A097]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#49A097]'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Logs</p>
                <p className="text-2xl font-bold text-blue-800">{filteredLogs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Successful Actions</p>
                <p className="text-2xl font-bold text-green-800">
                  {filteredLogs.filter(log => log.status === 'success').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Failed Actions</p>
                <p className="text-2xl font-bold text-red-800">
                  {filteredLogs.filter(log => log.status === 'failed').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold text-purple-800">
                  {new Set(filteredLogs.map(log => log.user_email)).size}
                </p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search logs by user, action, module, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-300"
          />
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                <option value="all">All Time</option>
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">User</label>
              <select
                value={filters.user}
                onChange={(e) => setFilters(prev => ({ ...prev, user: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                <option value="all">All Users</option>
                {Array.from(new Set(logs.map(log => log.user_email))).map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Module</label>
              <select
                value={filters.module}
                onChange={(e) => setFilters(prev => ({ ...prev, module: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                <option value="all">All Modules</option>
                {Array.from(new Set(logs.map(log => log.module))).map(module => (
                  <option key={module} value={module}>{module.charAt(0).toUpperCase() + module.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Action</label>
              <select
                value={filters.action}
                onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                <option value="all">All Actions</option>
                {Array.from(new Set(logs.map(log => log.action_type))).map(action => (
                  <option key={action} value={action}>{action.charAt(0).toUpperCase() + action.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  User & Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredLogs.map((log) => {
                const ActionIcon = getActionIcon(log.action_type);
                const actionColor = getActionColor(log.action_type);
                
                return (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-2" />
                        <div className="text-sm text-slate-900">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-500 ml-2">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#49A097] flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{log.user_email}</div>
                          <div className="text-xs text-slate-500">{log.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ActionIcon className={`h-4 w-4 text-${actionColor}-500 mr-2`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${actionColor}-100 text-${actionColor}-800 capitalize`}>
                          {log.action_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-900 capitalize">{log.module}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 max-w-xs truncate">{log.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-slate-400 mr-2" />
                        <span className="text-sm text-slate-900 font-mono">{log.ip_address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {log.status === 'success' ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-green-600 font-medium">Success</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-sm text-red-600 font-medium">Failed</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-[#49A097] hover:text-[#49A097]/80 font-medium text-sm flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No logs found</h3>
            <p className="text-slate-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
};

export default AuditTrailPage;