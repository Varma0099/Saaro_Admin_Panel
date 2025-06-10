import React, { useState } from 'react';
import {
  Home,
  Users,
  Calendar,
  Building2,
  FileText,
  CreditCard,
  Bot,
  Settings,
  Shield,
  BarChart3,
  ChevronDown,
  ChevronRight,
  UserCheck,
  AlertTriangle,
  MapPin,
  Stethoscope,
  ClipboardList,
  Heart,
  Brain,
  Pill,
  MessageSquare
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  subItems?: SubMenuItem[];
  badge?: number;
  isActive?: boolean;
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  badge?: number;
  isActive?: boolean;
  icon?: React.ComponentType<any>; // Added icon property
}

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const ModernSidebar: React.FC<SidebarProps> = ({
  currentPath = '/dashboard',
  onNavigate
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['doctors', 'appointments']);

  const menuItems: MenuItem[] = [
   
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      isActive: currentPath === '/dashboard'
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: Users,
      badge: 12,
      subItems: [
        { id: 'all-doctors', label: 'All Doctors', path: '/doctors/all', isActive: currentPath === '/doctors/all' },
        { id: 'doctor-requests', label: 'Doctor Requests', path: '/doctors/requests', badge: 5, isActive: currentPath === '/doctors/requests' },
        { id: 'behavior-monitor', label: 'Behavior Monitor', path: '/doctors/behavior', badge: 3, isActive: currentPath === '/doctors/behavior' },
        { id: 'blocked-doctors', label: 'Blocked Doctors', path: '/doctors/blocked', isActive: currentPath === '/doctors/blocked' }
      ]
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      badge: 23,
      subItems: [
        { id: 'all-appointments', label: 'All Appointments', path: '/appointments/all', isActive: currentPath === '/appointments/all' },
        { id: 'missed-delayed', label: 'Missed / Delayed', path: '/appointments/missed', badge: 8, isActive: currentPath === '/appointments/missed' },
        { id: 'issue-logs', label: 'Issue Logs', path: '/appointments/issues', badge: 4, isActive: currentPath === '/appointments/issues' }
      ]
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: UserCheck,
      subItems: [
        { id: 'all-patients', label: 'All Patients', path: '/patients/all', isActive: currentPath === '/patients/all' },
        { id: 'complaints', label: 'Complaints', path: '/patients/complaints', badge: 7, isActive: currentPath === '/patients/complaints' },
        { id: 'privacy-logs', label: 'Consent & Privacy Logs', path: '/patients/privacy', isActive: currentPath === '/patients/privacy' }
      ]
    },
    {
      id: 'hospitals',
      label: 'Hospitals & Clinics',
      icon: Building2,
      path: '/hospitals',
      isActive: currentPath === '/hospitals'
    },
    {
      id: 'emr',
      label: 'EMR/EHR Oversight',
      icon: FileText,
      subItems: [
        { id: 'prescriptions', label: 'Prescriptions', path: '/emr/prescriptions', isActive: currentPath === '/emr/prescriptions' },
        { id: 'ai-suggestions', label: 'AI Suggestions', path: '/emr/ai-suggestions', isActive: currentPath === '/emr/ai-suggestions' },
        { id: 'medical-notes', label: 'Medical Notes', path: '/emr/notes', isActive: currentPath === '/emr/notes' }
      ]
    },
    {
      id: 'surgery',
      label: 'Surgery & Specialty',
      icon: Stethoscope,
      subItems: [
        { id: 'specialties', label: 'Specialties', path: '/surgery/specialties', isActive: currentPath === '/surgery/specialties' },
        { id: 'surgeries', label: 'Surgeries', path: '/surgery/list', isActive: currentPath === '/surgery/list' },
        { id: 'pricing', label: 'City Pricing', path: '/surgery/pricing', isActive: currentPath === '/surgery/pricing' }
      ]
    },
    {
      id: 'billing',
      label: 'Billing & Refunds',
      icon: CreditCard,
      badge: 15,
      subItems: [
        { id: 'all-transactions', label: 'All Transactions', path: '/billing/transactions', isActive: currentPath === '/billing/transactions' },
        { id: 'refund-requests', label: 'Refund Requests', path: '/billing/refunds', badge: 6, isActive: currentPath === '/billing/refunds' },
        { id: 'insurance-claims', label: 'Insurance Claims', path: '/billing/claims', badge: 9, isActive: currentPath === '/billing/claims' }
      ]
    },
    {
      id: 'content',
      label: 'App & Content',
      icon: ClipboardList,
      subItems: [
        { id: 'homepage', label: 'Homepage Sections', path: '/content/homepage', isActive: currentPath === '/content/homepage' },
        { id: 'notifications', label: 'Push Notifications', path: '/content/notifications', isActive: currentPath === '/content/notifications' },
        { id: 'articles', label: 'Articles & Blogs', path: '/content/articles', isActive: currentPath === '/content/articles' },
        { id: 'legal-docs', label: 'Legal Documents', path: '/content/legal', isActive: currentPath === '/content/legal' }
      ]
    },
    {
      id: 'locations',
      label: 'Location Controls',
      icon: MapPin,
      subItems: [
        { id: 'cities', label: 'Supported Cities', path: '/locations/cities', isActive: currentPath === '/locations/cities' },
        { id: 'services', label: 'City Services', path: '/locations/services', isActive: currentPath === '/locations/services' }
      ]
    },
    {
      id: 'ai-automations',
      label: 'AI & Automations',
      icon: Bot,
      subItems: [
        { id: 'flag-rules', label: 'Flag Rules', path: '/ai/flag-rules', isActive: currentPath === '/ai/flag-rules' },
        { id: 'auto-actions', label: 'Doctor Auto Actions', path: '/ai/auto-actions', isActive: currentPath === '/ai/auto-actions' },
        { id: 'ai-insights', label: 'AI Insights Monitor', path: '/ai/insights', isActive: currentPath === '/ai/insights' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      subItems: [
        { id: 'doctor-reports', label: 'Doctor Reports', path: '/reports/doctors', isActive: currentPath === '/reports/doctors' },
        { id: 'revenue-reports', label: 'Revenue Reports', path: '/reports/revenue', isActive: currentPath === '/reports/revenue' },
        { id: 'appointment-reports', label: 'Appointment Reports', path: '/reports/appointments', isActive: currentPath === '/reports/appointments' },
        { id: 'scheduled-reports', label: 'Scheduled Reports', path: '/reports/scheduled', isActive: currentPath === '/reports/scheduled' }
      ]
    },
    {
      id: 'system-settings',
      label: 'System Settings',
      icon: Settings,
      subItems: [
        { id: 'user-roles', label: 'User Roles & Permissions', path: '/settings/roles', isActive: currentPath === '/settings/roles' },
        { id: 'notification-settings', label: 'Notification Settings', path: '/settings/notifications', isActive: currentPath === '/settings/notifications' },
        { id: 'consult-settings', label: 'Consult Settings', path: '/settings/consult', isActive: currentPath === '/settings/consult' },
        { id: 'platform-settings', label: 'Platform Settings', path: '/settings/platform', isActive: currentPath === '/settings/platform' }
      ]
    },
    {
      id: 'security',
      label: 'Security & Logs',
      icon: Shield,
      badge: 2,
      subItems: [
        { id: 'login-logs', label: 'Login Logs', path: '/security/login-logs', isActive: currentPath === '/security/login-logs' },
        { id: 'data-access', label: 'Data Access Logs', path: '/security/data-access', isActive: currentPath === '/security/data-access' },
        { id: 'blocked-ips', label: 'Blocked IPs / Devices', path: '/security/blocked', badge: 2, isActive: currentPath === '/security/blocked' },
        { id: 'audit-trail', label: 'Audit Trail', path: '/security/audit', isActive: currentPath === '/security/audit' }
      ]
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = item.isActive || (item.subItems && item.subItems.some(sub => sub.isActive));

    return (
      <div key={item.id} className="mb-2">
        <div
          className={`
            group relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden
            ${isActive 
              ? 'bg-gradient-to-r from-[#49A097] to-[#49A097]/80 text-white shadow-lg transform scale-[1.02]' 
              : 'text-slate-600 hover:text-[#49A097] hover:bg-gradient-to-r hover:from-[#49A097]/10 hover:to-[#49A097]/5'
            }
          `}
          onClick={() => {
            if (hasSubItems) {
              toggleExpanded(item.id);
            } else if (item.path) {
              handleNavigation(item.path);
            }
          }}
        >
          {/* Background decoration */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-[#49A097]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`}></div>
          
          <div className="relative z-10 flex items-center">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? 'bg-white/20 shadow-md' 
                : 'group-hover:bg-[#49A097]/10 group-hover:scale-110'
            }`}>
              <item.icon className="h-5 w-5 mr-3 transition-all duration-300" />
            </div>
            <span className="font-semibold text-sm transition-all duration-300">{item.label}</span>
            {item.badge && (
              <span className="ml-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2.5 py-1 min-w-[22px] text-center font-medium shadow-sm animate-pulse">
                {item.badge}
              </span>
            )}
          </div>
          {hasSubItems && (
            <div className="relative z-10 flex items-center">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 transition-transform duration-300 transform rotate-0" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </div>
          )}
        </div>
        
        {/* Sub-items */}
        {hasSubItems && isExpanded && (
          <div className="ml-8 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
            {item.subItems!.map((subItem) => (
              <div
                key={subItem.id}
                className={`
                  group relative flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden
                  ${subItem.isActive 
                    ? 'bg-gradient-to-r from-[#49A097]/20 to-[#49A097]/10 text-[#49A097] border-l-4 border-[#49A097] shadow-sm' 
                    : 'text-slate-500 hover:text-[#49A097] hover:bg-gradient-to-r hover:from-[#49A097]/10 hover:to-transparent hover:translate-x-2'
                  }
                `}
                onClick={() => handleNavigation(subItem.path)}
              >
                <div className="flex items-center">
                  {subItem.icon && (
                    <div className="mr-2">
                      <subItem.icon className="h-4 w-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium relative z-10">{subItem.label}</span>
                </div>
                {subItem.badge && (
                  <span className="relative z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium animate-pulse shadow-sm">
                    {subItem.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#49A097]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-2xl h-screen flex flex-col border-r border-slate-200/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#49A097] to-[#49A097]/80 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-[#49A097]/20">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Saaro Health
              </h2>
              <p className="text-xs text-slate-500 font-medium">Super Admin Panel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50 bg-white/80 backdrop-blur-sm">
        <div className="text-xs text-slate-500 text-center">
          <p className="font-semibold text-slate-600">Saaro Health Admin</p>
          <p className="mt-1">© 2025 Healthcare Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default ModernSidebar;