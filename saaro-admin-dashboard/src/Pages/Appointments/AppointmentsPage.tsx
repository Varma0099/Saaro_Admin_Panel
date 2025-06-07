import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, FileText } from 'lucide-react';
import AllAppointments from './AllAppointments';
import MissedDelayed from './MissedDelayed';
import IssueLogs from './IssueLogs';

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
  component: React.ComponentType;
  path: string;
}

interface AppointmentsPageProps {
  currentPath?: string;
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ currentPath = '/appointments' }) => {
  const [activeTab, setActiveTab] = useState('all-appointments');

  const tabs: TabItem[] = [
    {
      id: 'all-appointments',
      label: 'All Appointments',
      icon: Calendar,
      component: AllAppointments,
      path: '/appointments/all'
    },
    {
      id: 'missed-delayed',
      label: 'Missed / Delayed',
      icon: Clock,
      badge: 8,
      component: MissedDelayed,
      path: '/appointments/missed'
    },
    {
      id: 'issue-logs',
      label: 'Issue Logs',
      icon: AlertTriangle,
      badge: 4,
      component: IssueLogs,
      path: '/appointments/issues'
    }
  ];

  // Sync activeTab with currentPath from sidebar navigation
  useEffect(() => {
    const matchingTab = tabs.find(tab => tab.path === currentPath);
    if (matchingTab) {
      setActiveTab(matchingTab.id);
    } else if (currentPath === '/appointments') {
      setActiveTab('all-appointments');
    }
  }, [currentPath]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) return null;
    
    const Component = activeTabData.component;
    return <Component />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Appointment Management
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Monitor appointments, track issues, and manage telemedicine sessions
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium">Today's Appointments</p>
              <p className="text-2xl font-bold text-green-700">342</p>
            </div>
            <div className="text-right bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-amber-600 font-medium">Missed/Delayed</p>
              <p className="text-2xl font-bold text-amber-700">8</p>
            </div>
            <div className="text-right bg-red-50 rounded-xl p-4">
              <p className="text-sm text-red-600 font-medium">Issue Reports</p>
              <p className="text-2xl font-bold text-red-700">4</p>
            </div>
            <div className="text-right bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium">Completion Rate</p>
              <p className="text-2xl font-bold text-blue-700">94.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-300 relative group
                    ${isActive
                      ? 'border-[#49A097] text-[#49A097] bg-[#49A097]/5 rounded-t-lg'
                      : 'border-transparent text-slate-500 hover:text-[#49A097] hover:border-[#49A097]/50'
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#49A097]/10 shadow-sm' 
                      : 'group-hover:bg-[#49A097]/5 group-hover:scale-110'
                  }`}>
                    <tab.icon className="h-5 w-5 mr-2 transition-all duration-300" />
                  </div>
                  {tab.label}
                  {tab.badge && (
                    <span className="ml-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2.5 py-1 min-w-[20px] text-center font-medium shadow-sm animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#49A097] to-[#49A097]/80 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;