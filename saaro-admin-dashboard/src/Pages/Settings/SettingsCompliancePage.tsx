import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building2,
  Shield,
  Globe,
  Image,
  Link,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Database,
  Clock,
  Save,
  RefreshCw,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Info,
  Calendar,
  Trash2
} from 'lucide-react';

// Define interfaces for type safety
interface SaveStatus {
  type: 'success' | 'error';
  message: string;
}

interface PlatformSettings {
  name: string;
  tagline: string;
  logo: string | null;
  favicon: string | null;
  supportEmail: string;
  supportPhone: string;
  address: string;
}

interface ServiceSettings {
  [key: string]: boolean;
  telemedicine: boolean;
  inPersonConsults: boolean;
  emergencyServices: boolean;
  surgeryBooking: boolean;
  aiPrescriptions: boolean;
  healthRecords: boolean;
  billingSystem: boolean;
  appointmentReminders: boolean;
}

interface PolicyLinks {
  [key: string]: string;
  privacyPolicy: string;
  termsOfService: string;
  hipaaCompliance: string;
  cookiePolicy: string;
  dataRetention: string;
}

interface SystemSettings {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  allowAdminAccess: boolean;
  estimatedDowntime: string;
}

interface RetentionSettings {
  [key: string]: number | boolean;
  patientRecords: number;
  appointmentHistory: number;
  billingRecords: number;
  auditLogs: number;
  chatHistory: number;
  autoDeleteInactive: boolean;
  inactiveThreshold: number;
}

interface SettingsCompliancePageProps {
  currentPath: string;
}

type TabId = 'platform' | 'services' | 'policies' | 'maintenance' | 'retention';

const SettingsCompliancePage: React.FC<SettingsCompliancePageProps> = ({ currentPath }) => {
  const [activeTab, setActiveTab] = useState<TabId>('platform');
  const [loading, setLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null);
  
  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    name: 'Saaro Health',
    tagline: 'Your trusted healthcare partner',
    logo: null,
    favicon: null,
    supportEmail: 'support@saarohealth.com',
    supportPhone: '+1-800-SAARO-HEALTH',
    address: '123 Healthcare Blvd, Medical District, City 12345'
  });

  // Service Toggle State
  const [serviceSettings, setServiceSettings] = useState<ServiceSettings>({
    telemedicine: true,
    inPersonConsults: true,
    emergencyServices: true,
    surgeryBooking: true,
    aiPrescriptions: true,
    healthRecords: true,
    billingSystem: true,
    appointmentReminders: true
  });

  // Policy Links State
  const [policyLinks, setPolicyLinks] = useState<PolicyLinks>({
    privacyPolicy: 'https://saarohealth.com/privacy',
    termsOfService: 'https://saarohealth.com/terms',
    hipaaCompliance: 'https://saarohealth.com/hipaa',
    cookiePolicy: 'https://saarohealth.com/cookies',
    dataRetention: 'https://saarohealth.com/data-retention'
  });

  // Maintenance & System State
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    maintenanceMessage: 'System maintenance in progress. We\'ll be back shortly.',
    allowAdminAccess: true,
    estimatedDowntime: '2 hours'
  });

  // Data Retention State
  const [retentionSettings, setRetentionSettings] = useState<RetentionSettings>({
    patientRecords: 7, // years
    appointmentHistory: 5, // years
    billingRecords: 10, // years
    auditLogs: 3, // years
    chatHistory: 2, // years
    autoDeleteInactive: true,
    inactiveThreshold: 365 // days
  });

  const tabs = [
    { id: 'platform' as const, label: 'Platform Settings', icon: Building2 },
    { id: 'services' as const, label: 'Service Controls', icon: ToggleLeft },
    { id: 'policies' as const, label: 'Policy Links', icon: Link },
    { id: 'maintenance' as const, label: 'Maintenance', icon: Settings },
    { id: 'retention' as const, label: 'Data Retention', icon: Database }
  ];

  // Simulate API calls
  const handleSave = async (section: string): Promise<void> => {
    setLoading(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Saving ${section} settings:`, {
        platform: platformSettings,
        services: serviceSettings,
        policies: policyLinks,
        system: systemSettings,
        retention: retentionSettings
      });
      
      setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });
      
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save settings. Please try again.' });
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (type: keyof PlatformSettings, event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPlatformSettings(prev => ({
            ...prev,
            [type]: e.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Building2 className="h-6 w-6 text-[#49A097] mr-3" />
          Platform Identity
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={platformSettings.name}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                placeholder="Enter platform name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={platformSettings.tagline}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                placeholder="Enter tagline"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={platformSettings.supportEmail}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                placeholder="support@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Support Phone
              </label>
              <input
                type="tel"
                value={platformSettings.supportPhone}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, supportPhone: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                placeholder="+1-800-XXX-XXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Platform Logo
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('logo', e)}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center px-4 py-2 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 cursor-pointer transition-colors duration-200"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </label>
                {platformSettings.logo && (
                  <img src={platformSettings.logo} alt="Logo preview" className="h-12 w-12 object-contain rounded" />
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Address
              </label>
              <textarea
                value={platformSettings.address}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                rows={3}
                placeholder="Enter business address"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => handleSave('platform')}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Platform Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderServiceControls = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Globe className="h-6 w-6 text-[#49A097] mr-3" />
          Global Service Controls
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(serviceSettings).map(([service, enabled]) => {
            const serviceLabels: Record<string, string> = {
              telemedicine: 'Telemedicine Consultations',
              inPersonConsults: 'In-Person Consultations',
              emergencyServices: 'Emergency Services',
              surgeryBooking: 'Surgery Booking',
              aiPrescriptions: 'AI Prescription Engine',
              healthRecords: 'Electronic Health Records',
              billingSystem: 'Billing & Payment System',
              appointmentReminders: 'Appointment Reminders'
            };
            
            return (
              <div key={service} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <h4 className="font-semibold text-slate-800">{serviceLabels[service]}</h4>
                  <p className="text-sm text-slate-600">
                    {enabled ? 'Currently active for all users' : 'Disabled globally'}
                  </p>
                </div>
                <button
                  onClick={() => setServiceSettings(prev => ({ ...prev, [service]: !enabled }))}
                  className={`flex items-center transition-colors duration-200 ${
                    enabled ? 'text-[#49A097]' : 'text-slate-400'
                  }`}
                >
                  {enabled ? (
                    <ToggleRight className="h-8 w-8" />
                  ) : (
                    <ToggleLeft className="h-8 w-8" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">Important Notice</h4>
              <p className="text-sm text-amber-700 mt-1">
                Disabling services will immediately affect all users. Consider maintenance mode for temporary outages.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => handleSave('services')}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Service Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderPolicyLinks = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Link className="h-6 w-6 text-[#49A097] mr-3" />
          Legal & Policy Links
        </h3>
        
        <div className="space-y-4">
          {Object.entries(policyLinks).map(([policy, url]) => {
            const policyLabels: Record<string, string> = {
              privacyPolicy: 'Privacy Policy',
              termsOfService: 'Terms of Service',
              hipaaCompliance: 'HIPAA Compliance',
              cookiePolicy: 'Cookie Policy',
              dataRetention: 'Data Retention Policy'
            };
            
            const policyDescriptions: Record<string, string> = {
              privacyPolicy: 'How we collect, use, and protect personal information',
              termsOfService: 'Legal agreement between users and the platform',
              hipaaCompliance: 'Healthcare data protection and compliance details',
              cookiePolicy: 'Information about cookies and tracking technologies',
              dataRetention: 'How long we keep different types of data'
            };
            
            return (
              <div key={policy} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{policyLabels[policy]}</h4>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#49A097] hover:text-[#49A097]/80 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-slate-600 mb-3">{policyDescriptions[policy]}</p>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setPolicyLinks(prev => ({ ...prev, [policy]: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200 text-sm"
                  placeholder="https://example.com/policy"
                />
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => handleSave('policies')}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Policy Links
          </button>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Settings className="h-6 w-6 text-[#49A097] mr-3" />
          Maintenance Mode
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <h4 className="font-semibold text-slate-800">Maintenance Mode</h4>
              <p className="text-sm text-slate-600">
                {systemSettings.maintenanceMode ? 'Platform is currently in maintenance mode' : 'Platform is operational'}
              </p>
            </div>
            <button
              onClick={() => setSystemSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
              className={`flex items-center transition-colors duration-200 ${
                systemSettings.maintenanceMode ? 'text-red-500' : 'text-slate-400'
              }`}
            >
              {systemSettings.maintenanceMode ? (
                <ToggleRight className="h-8 w-8" />
              ) : (
                <ToggleLeft className="h-8 w-8" />
              )}
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Maintenance Message
            </label>
            <textarea
              value={systemSettings.maintenanceMessage}
              onChange={(e) => setSystemSettings(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
              rows={3}
              placeholder="Message shown to users during maintenance"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Estimated Downtime
              </label>
              <input
                type="text"
                value={systemSettings.estimatedDowntime}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, estimatedDowntime: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                placeholder="e.g., 2 hours"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="admin-access"
                checked={systemSettings.allowAdminAccess}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, allowAdminAccess: e.target.checked }))}
                className="h-4 w-4 text-[#49A097] focus:ring-[#49A097] border-slate-300 rounded"
              />
              <label htmlFor="admin-access" className="ml-2 text-sm font-medium text-slate-700">
                Allow admin access during maintenance
              </label>
            </div>
          </div>
          
          {systemSettings.maintenanceMode && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800">Maintenance Mode Active</h4>
                  <p className="text-sm text-red-700 mt-1">
                    All users except admins are currently blocked from accessing the platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => handleSave('maintenance')}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Maintenance Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderDataRetention = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Database className="h-6 w-6 text-[#49A097] mr-3" />
          Data Retention Policies
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(retentionSettings).filter(([key]) => !['autoDeleteInactive', 'inactiveThreshold'].includes(key)).map(([dataType, years]) => {
            const dataLabels: Record<string, string> = {
              patientRecords: 'Patient Medical Records',
              appointmentHistory: 'Appointment History',
              billingRecords: 'Billing & Payment Records',
              auditLogs: 'System Audit Logs',
              chatHistory: 'Chat & Communication History'
            };
            
            const dataDescriptions: Record<string, string> = {
              patientRecords: 'Medical records, prescriptions, and health data',
              appointmentHistory: 'Past and cancelled appointments',
              billingRecords: 'Payment history and insurance claims',
              auditLogs: 'System access and security logs',
              chatHistory: 'Doctor-patient conversations and support chats'
            };
            
            return (
              <div key={dataType} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-2">{dataLabels[dataType]}</h4>
                <p className="text-sm text-slate-600 mb-3">{dataDescriptions[dataType]}</p>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={years as number}
                    onChange={(e) => setRetentionSettings(prev => ({ ...prev, [dataType]: parseInt(e.target.value) || 1 }))}
                    className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                  />
                  <span className="text-sm text-slate-600">years</span>
                  <Clock className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-4">Automatic Data Cleanup</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-slate-700">Auto-delete inactive accounts</h5>
                <p className="text-sm text-slate-600">Automatically remove accounts with no activity</p>
              </div>
              <button
                onClick={() => setRetentionSettings(prev => ({ ...prev, autoDeleteInactive: !prev.autoDeleteInactive }))}
                className={`flex items-center transition-colors duration-200 ${
                  retentionSettings.autoDeleteInactive ? 'text-[#49A097]' : 'text-slate-400'
                }`}
              >
                {retentionSettings.autoDeleteInactive ? (
                  <ToggleRight className="h-8 w-8" />
                ) : (
                  <ToggleLeft className="h-8 w-8" />
                )}
              </button>
            </div>
            
            {retentionSettings.autoDeleteInactive && (
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-slate-700">Inactive threshold:</label>
                <input
                  type="number"
                  min="30"
                  max="1095"
                  value={retentionSettings.inactiveThreshold as number}
                  onChange={(e) => setRetentionSettings(prev => ({ ...prev, inactiveThreshold: parseInt(e.target.value) || 365 }))}
                  className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-200"
                />
                <span className="text-sm text-slate-600">days</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">HIPAA Compliance Note</h4>
              <p className="text-sm text-blue-700 mt-1">
                Healthcare data retention policies must comply with federal regulations. Consult legal counsel before modifying these settings.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => handleSave('retention')}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Retention Policies
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'platform':
        return renderPlatformSettings();
      case 'services':
        return renderServiceControls();
      case 'policies':
        return renderPolicyLinks();
      case 'maintenance':
        return renderMaintenanceSettings();
      case 'retention':
        return renderDataRetention();
      default:
        return renderPlatformSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/*<div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings & Compliance</h1>
        <p className="text-slate-600">Manage platform settings, service controls, and compliance policies</p>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`p-4 rounded-lg border ${
          saveStatus.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {saveStatus.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-3" />
            ) : (
              <XCircle className="h-5 w-5 mr-3" />
            )}
            {saveStatus.message}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#49A097] text-[#49A097] bg-[#49A097]/5'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SettingsCompliancePage;