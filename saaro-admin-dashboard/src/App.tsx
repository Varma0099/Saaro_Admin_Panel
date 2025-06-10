import React, { useState } from 'react';
import ModernSidebar from './Components/Layout/Sidebar';
import StatCard from './Components/UI/Dashboard/StatCard';
import DoctorsPage from './Pages/Doctors/DoctorsPage';
import AppointmentsPage from './Pages/Appointments/AppointmentsPage';
import Patient from './Pages/Patients/PatientsPage';  
import HospitalsPage from './Pages/Hospital/HospitalsPage'; 
import EMRPage from './Pages/EMR/EMRPage';
import SurgerySpecialtyPage from './Pages/SurgeryPage/SurgerySpecialtyPage'; 
import BillingPage from './Pages/Billing&Refund/BillingPage';
import ContentManagerPage from './Pages/App&Content/ContentManagerPage';
import LocationManagerPage from './Pages/Locations/LocationManagerPage';
import AIInsightsPage from './Pages/AIInsights/AIInsightsPage';
import ReportsPage from './Pages/Reports/ReportsAnalyticsPage';
import SettingsCompliancePage from './Pages/Settings/SettingsCompliancePage';
import AuditTrailPage from './Pages/AuditTrail/AuditTrailPage'; // Added Audit Trail import

import {
  Users,
  Calendar,
  Building2,
  Activity,
  DollarSign,
  AlertTriangle,
  Bell,
  Search,
  User,
  Scissors, 
  CreditCard, 
  RefreshCw,
  FileText,
  MapPin,
  Brain,
  TrendingUp,
  Shield, // Added for Audit Trail icon
  Eye // Added for System Logs icon
} from 'lucide-react';
import PatientsPage from './Pages/Patients/PatientsPage';

function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const handleCardClick = (cardName: string) => {
    if (cardName === 'Total Doctors') {
      setCurrentPath('/doctors');
    } else if (cardName === 'Appointments') {
      setCurrentPath('/appointments');
    } else if (cardName === 'Hospitals') { 
      setCurrentPath('/hospitals');
    } else if (cardName === 'Surgeries') { 
      setCurrentPath('/surgery');
    } else if (cardName === 'Revenue' || cardName === 'Monthly Revenue') { 
      setCurrentPath('/billing');
    } else if (cardName === 'Pending Refunds') { 
      setCurrentPath('/billing/refunds');
    } else if (cardName === 'Content Pages') {
      setCurrentPath('/content');
    } else if (cardName === 'Active Cities') {
      setCurrentPath('/locations');
    } else if (cardName === 'AI Prescriptions') {
      setCurrentPath('/ai-insights');
    } else if (cardName === 'AI Accuracy') {
      setCurrentPath('/ai-insights/feedback');
    } else if (cardName === 'Audit Logs') { // Added Audit Trail card handling
      setCurrentPath('/audit');
    } else if (cardName === 'System Changes') { // Added System Changes card handling
      setCurrentPath('/audit/changes');
    } else {
      alert(`Clicked on ${cardName} card!`);
    }
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    console.log(`Navigating to: ${path}`);
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Saaro Health Dashboard
        </h1>
        <p className="text-slate-600 text-lg">
          Welcome to your super admin panel - Manage your healthcare platform efficiently! 🏥
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Doctors"
          value={1247}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          color="blue"
          onClick={() => handleCardClick('Total Doctors')}
        />
        
        <StatCard
          title="Today's Appointments"
          value={342}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          color="emerald"
          onClick={() => handleCardClick('Appointments')}
        />
        
        <StatCard
          title="Active Hospitals"
          value={89}
          icon={Building2}
          trend={{ value: 3, isPositive: false }}
          color="purple"
          onClick={() => handleCardClick('Hospitals')}
        />
        
        <StatCard
          title="Surgery Types"
          value={156}
          icon={Scissors}
          trend={{ value: 7, isPositive: true }}
          color="teal"
          onClick={() => handleCardClick('Surgeries')}
        />
        
        <StatCard
          title="Patient Complaints"
          value={23}
          icon={AlertTriangle}
          trend={{ value: 15, isPositive: false }}
          color="rose"
          onClick={() => handleCardClick('Complaints')}
        />
        
        <StatCard
          title="Monthly Revenue"
          value="$245,000"
          icon={DollarSign}
          trend={{ value: 22, isPositive: true }}
          color="emerald"
          onClick={() => handleCardClick('Monthly Revenue')}
        />
        
        <StatCard
          title="System Health"
          value="98.5%"
          icon={Activity}
          color="teal"
          onClick={() => handleCardClick('System Health')}
        />

        <StatCard
          title="Pending Refunds"
          value={15}
          icon={RefreshCw}
          trend={{ value: 5, isPositive: false }}
          color="orange"
          onClick={() => handleCardClick('Pending Refunds')}
        />

        <StatCard
          title="Content Pages"
          value={12}
          icon={FileText}
          trend={{ value: 2, isPositive: true }}
          color="indigo"
          onClick={() => handleCardClick('Content Pages')}
        />

        <StatCard
          title="Active Cities"
          value={3}
          icon={MapPin}
          trend={{ value: 1, isPositive: true }}
          color="purple"
          onClick={() => handleCardClick('Active Cities')}
        />

        {/* AI Insights Cards */}
        <StatCard
          title="AI Prescriptions"
          value={234}
          icon={Brain}
          trend={{ value: 18, isPositive: true }}
          color="teal"
          onClick={() => handleCardClick('AI Prescriptions')}
        />

        <StatCard
          title="AI Accuracy"
          value="94.2%"
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          color="emerald"
          onClick={() => handleCardClick('AI Accuracy')}
        />

        {/* Added Audit Trail Cards */}
        <StatCard
          title="Audit Logs"
          value={1542}
          icon={Shield}
          trend={{ value: 24, isPositive: true }}
          color="indigo"
          onClick={() => handleCardClick('Audit Logs')}
        />

        <StatCard
          title="System Changes"
          value={87}
          icon={Eye}
          trend={{ value: 12, isPositive: true }}
          color="blue"
          onClick={() => handleCardClick('System Changes')}
        />
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div>
                <p className="font-semibold text-red-800">High Risk AI Case Flagged</p>
                <p className="text-sm text-red-600">Patient with multiple drug interactions</p>
              </div>
              <span className="text-xs text-red-500">1 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div>
                <p className="font-semibold text-red-800">High Priority Doctor Complaint</p>
                <p className="text-sm text-red-600">Dr. Smith - Patient care issue</p>
              </div>
              <span className="text-xs text-red-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              <div>
                <p className="font-semibold text-amber-800">AI Prescription Needs Review</p>
                <p className="text-sm text-amber-600">Low confidence score detected</p>
              </div>
              <span className="text-xs text-amber-500">3 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div>
                <p className="font-semibold text-blue-800">New Doctor Registration</p>
                <p className="text-sm text-blue-600">Pending verification</p>
              </div>
              <span className="text-xs text-blue-500">10 min ago</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Activity className="h-6 w-6 text-[#49A097] mr-2" />
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">API Health</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 font-semibold">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">AI Engine</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 font-semibold">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Database</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 font-semibold">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Payment Gateway</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-yellow-600 font-semibold">Degraded</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Video Calls</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 font-semibold">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPageContent = () => {
  switch (true) {
    case currentPath === '/dashboard':
      return renderDashboardContent();

    case currentPath === '/doctors':
    case currentPath === '/doctors/all':
    case currentPath === '/doctors/requests':
    case currentPath === '/doctors/behavior':
    case currentPath === '/doctors/blocked':
      return <DoctorsPage currentPath={currentPath} />;

    case currentPath === '/appointments':
    case currentPath === '/appointments/all':
    case currentPath === '/appointments/missed':
    case currentPath === '/appointments/issues':
      return <AppointmentsPage currentPath={currentPath} />;

    case currentPath === '/patients':
    case currentPath.startsWith('/patients'):
      return <Patient currentPath={currentPath} />;

    case currentPath === '/hospitals':
    case currentPath === '/hospitals/pending':
    case currentPath === '/hospitals/verified':
    case currentPath === '/hospitals/rejected':
    case currentPath === '/hospitals/suspended':
    case currentPath.startsWith('/hospitals'):
      return <HospitalsPage currentPath={currentPath} />;

    case currentPath === '/emr':
    case currentPath.startsWith('/emr'):
      return <EMRPage currentPath={currentPath} />;

    case currentPath === '/surgery':
    case currentPath === '/surgery/specialties':
    case currentPath === '/surgery/pricing':
    case currentPath.startsWith('/surgery'):
      return <SurgerySpecialtyPage currentPath={currentPath} />;

    case currentPath === '/billing':
    case currentPath === '/billing/transactions':
    case currentPath === '/billing/refunds':
    case currentPath === '/billing/insurance':
    case currentPath.startsWith('/billing'):
      return <BillingPage currentPath={currentPath} />;

    case currentPath === '/content':
    case currentPath === '/content/homepage':
    case currentPath === '/content/about':
    case currentPath === '/content/services':
    case currentPath === '/content/faq':
    case currentPath === '/content/policies':
    case currentPath === '/content/blog':
    case currentPath.startsWith('/content'):
      return <ContentManagerPage currentPath={currentPath} />;

    case currentPath === '/locations':
    case currentPath === '/locations/cities':
    case currentPath === '/locations/services':
    case currentPath === '/locations/pricing':
    case currentPath.startsWith('/locations'):
      return <LocationManagerPage currentPath={currentPath} />;

    // AI Insights routing
    case currentPath === '/ai':
    case currentPath === '/ai/flag-rules':
    case currentPath === '/ai/auto-actions':
    case currentPath === '/ai-insights':
    case currentPath.startsWith('/ai/'):
      return <AIInsightsPage currentPath={currentPath} />;

    // Reports & Analytics routing
    case currentPath === '/reports':
    case currentPath === '/reports/doctors':
    case currentPath === '/reports/revenue':
    case currentPath === '/reports/surgeries':
    case currentPath === '/reports/appointments':
    case currentPath === '/reports/claims':
    case currentPath === '/reports/scheduled':
    case currentPath.startsWith('/reports'):
      return <ReportsPage currentPath={currentPath} />;

    // System Settings routing
    case currentPath === '/settings':
    case currentPath === '/settings/roles':
    case currentPath === '/settings/notifications':
    case currentPath === '/settings/consult':
    case currentPath === '/settings/platform':
    case currentPath.startsWith('/settings'):
      return <SettingsCompliancePage currentPath={currentPath} />;

    // Audit Trail routing - Added new routing logic
    case currentPath === '/audit':
    case currentPath === '/audit/logs':
    case currentPath === '/audit/changes':
    case currentPath === '/audit/user-activity':
    case currentPath === '/audit/system-events':
    case currentPath.startsWith('/audit'):
      return <AuditTrailPage currentPath={currentPath} />;

    // Security & Logs routing - Now handled by AuditTrailPage
    case currentPath === '/security':
    case currentPath === '/security/login-logs':
    case currentPath === '/security/data-access':
    case currentPath === '/security/blocked':
    case currentPath === '/security/audit':
    case currentPath.startsWith('/security'):
      return <AuditTrailPage currentPath={currentPath} />;

    default:
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              {currentPath.replace('/', '').replace('-', ' ').split('/').pop()?.toUpperCase()}
            </h2>
            <p className="text-slate-600 text-lg mb-6">
              This is a placeholder for the <strong className="text-[#49A097]">{currentPath}</strong> page.
              The content for this section will be implemented in the next steps.
            </p>
            <div className="mt-6 p-6 bg-gradient-to-r from-[#49A097]/10 to-[#49A097]/5 rounded-xl border border-[#49A097]/20">
              <p className="text-sm text-slate-700">
                <strong className="text-[#49A097]">Next Steps:</strong> Implement the specific components and functionality for this section
                based on your requirements document.
              </p>
            </div>
          </div>
        </div>
      );
  }
};

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <ModernSidebar currentPath={currentPath} onNavigate={handleNavigation} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-300 text-sm font-medium"
                  placeholder="Search doctors, patients, appointments..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="relative p-3 text-slate-500 hover:text-[#49A097] focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:ring-offset-2 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-[#49A097]/10 transition-all duration-300 group">
                <Bell className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 ring-2 ring-white text-white text-xs font-bold flex items-center justify-center animate-pulse">5</span>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-3 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:ring-offset-2 p-2 bg-white/50 backdrop-blur-sm hover:bg-[#49A097]/10 transition-all duration-300 group">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#49A097] to-[#49A097]/80 flex items-center justify-center shadow-lg ring-2 ring-white group-hover:scale-105 transition-transform duration-200">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-slate-800">Super Admin</p>
                    <p className="text-xs text-slate-500 font-medium">saarohealth@gmail.com</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}

export default App;