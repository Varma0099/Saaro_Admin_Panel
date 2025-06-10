import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  DollarSign, 
  Activity, 
  Scissors,
  ClipboardCheck,
  Mail,
  Clock,
  TrendingUp,
  BarChart3,
  Filter,
  RefreshCw,
  Eye,
  FileBarChart,
  Send
} from 'lucide-react';

// Type definitions
interface ReportsAnalyticsPageProps {
  currentPath?: string;
}

interface ReportMetrics {
  appointments: {
    total: number;
    completed: number;
    cancelled: number;
    missed: number;
    revenue: number;
  };
  doctors: {
    total: number;
    active: number;
    pending: number;
    blocked: number;
    avgRating: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
    refunds: number;
  };
  surgeries: {
    total: number;
    completed: number;
    scheduled: number;
    cancelled: number;
    revenue: number;
  };
  claims: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    amount: number;
  };
}

interface ScheduledReport {
  id: number;
  reportType: string;
  frequency: string;
  email: string;
  format: string;
  time: string;
  createdAt: string;
  status: string;
}

interface ScheduleData {
  reportType: string;
  frequency: string;
  email: string;
  format: string;
  time: string;
}

type ReportTypeKey = keyof ReportMetrics;

const ReportsAnalyticsPage: React.FC<ReportsAnalyticsPageProps> = ({ currentPath }) => {
  const [selectedReportType, setSelectedReportType] = useState<ReportTypeKey>('appointments');
  const [dateRange, setDateRange] = useState<string>('last-30-days');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);

  // Mock data for demonstration
  const [reportMetrics, setReportMetrics] = useState<ReportMetrics>({
    appointments: {
      total: 3420,
      completed: 2890,
      cancelled: 350,
      missed: 180,
      revenue: 245000
    },
    doctors: {
      total: 1247,
      active: 1198,
      pending: 23,
      blocked: 16,
      avgRating: 4.6
    },
    revenue: {
      total: 1250000,
      thisMonth: 245000,
      lastMonth: 220000,
      growth: 11.4,
      refunds: 12500
    },
    surgeries: {
      total: 456,
      completed: 423,
      scheduled: 33,
      cancelled: 12,
      revenue: 890000
    },
    claims: {
      total: 2340,
      approved: 2100,
      pending: 180,
      rejected: 60,
      amount: 567000
    }
  });

  const reportTypes = [
    { id: 'appointments' as ReportTypeKey, name: 'Appointments', icon: Calendar, color: 'emerald' },
    { id: 'doctors' as ReportTypeKey, name: 'Doctors', icon: Users, color: 'blue' },
    { id: 'revenue' as ReportTypeKey, name: 'Revenue', icon: DollarSign, color: 'green' },
    { id: 'surgeries' as ReportTypeKey, name: 'Surgeries', icon: Scissors, color: 'purple' },
    { id: 'claims' as ReportTypeKey, name: 'Claims', icon: ClipboardCheck, color: 'orange' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const generateReport = async (format: string = 'view'): Promise<void> => {
    setIsGeneratingReport(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (format === 'csv') {
      // Simulate CSV download
      const csvData = generateCSVData();
      downloadFile(csvData, `${selectedReportType}-report.csv`, 'text/csv');
    } else if (format === 'pdf') {
      // Simulate PDF download
      alert('PDF report generated successfully! (This would trigger actual PDF download)');
    }
    
    setIsGeneratingReport(false);
  };

  const generateCSVData = (): string => {
    const metrics = reportMetrics[selectedReportType];
    let csvContent = '';
    
    switch (selectedReportType) {
      case 'appointments':
        const appointmentMetrics = metrics as ReportMetrics['appointments'];
        csvContent = `Metric,Value\n`;
        csvContent += `Total Appointments,${appointmentMetrics.total}\n`;
        csvContent += `Completed,${appointmentMetrics.completed}\n`;
        csvContent += `Cancelled,${appointmentMetrics.cancelled}\n`;
        csvContent += `Missed,${appointmentMetrics.missed}\n`;
        csvContent += `Revenue,$${appointmentMetrics.revenue}\n`;
        break;
      case 'doctors':
        const doctorMetrics = metrics as ReportMetrics['doctors'];
        csvContent = `Metric,Value\n`;
        csvContent += `Total Doctors,${doctorMetrics.total}\n`;
        csvContent += `Active,${doctorMetrics.active}\n`;
        csvContent += `Pending,${doctorMetrics.pending}\n`;
        csvContent += `Blocked,${doctorMetrics.blocked}\n`;
        csvContent += `Average Rating,${doctorMetrics.avgRating}\n`;
        break;
      case 'revenue':
        const revenueMetrics = metrics as ReportMetrics['revenue'];
        csvContent = `Metric,Value\n`;
        csvContent += `Total Revenue,$${revenueMetrics.total}\n`;
        csvContent += `This Month,$${revenueMetrics.thisMonth}\n`;
        csvContent += `Last Month,$${revenueMetrics.lastMonth}\n`;
        csvContent += `Growth,${revenueMetrics.growth}%\n`;
        csvContent += `Refunds,$${revenueMetrics.refunds}\n`;
        break;
      case 'surgeries':
        const surgeryMetrics = metrics as ReportMetrics['surgeries'];
        csvContent = `Metric,Value\n`;
        csvContent += `Total Surgeries,${surgeryMetrics.total}\n`;
        csvContent += `Completed,${surgeryMetrics.completed}\n`;
        csvContent += `Scheduled,${surgeryMetrics.scheduled}\n`;
        csvContent += `Cancelled,${surgeryMetrics.cancelled}\n`;
        csvContent += `Revenue,$${surgeryMetrics.revenue}\n`;
        break;
      case 'claims':
        const claimMetrics = metrics as ReportMetrics['claims'];
        csvContent = `Metric,Value\n`;
        csvContent += `Total Claims,${claimMetrics.total}\n`;
        csvContent += `Approved,${claimMetrics.approved}\n`;
        csvContent += `Pending,${claimMetrics.pending}\n`;
        csvContent += `Rejected,${claimMetrics.rejected}\n`;
        csvContent += `Amount,$${claimMetrics.amount}\n`;
        break;
      default:
        csvContent = `Report Type,${selectedReportType}\nGenerated,${new Date().toISOString()}\n`;
    }
    
    return csvContent;
  };

  const downloadFile = (content: string, filename: string, contentType: string): void => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const scheduleReport = (reportData: ScheduleData): void => {
    const newReport: ScheduledReport = {
      id: Date.now(),
      ...reportData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setScheduledReports([...scheduledReports, newReport]);
    setShowScheduleModal(false);
    alert('Report scheduled successfully!');
  };

  const renderReportMetrics = () => {
    const metrics = reportMetrics[selectedReportType];
    const reportType = reportTypes.find(type => type.id === selectedReportType);
    
    switch (selectedReportType) {
      case 'appointments':
        const appointmentMetrics = metrics as ReportMetrics['appointments'];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Appointments</p>
                  <p className="text-3xl font-bold text-slate-900">{appointmentMetrics.total.toLocaleString()}</p>
                </div>
                <Calendar className="h-12 w-12 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{appointmentMetrics.completed.toLocaleString()}</p>
                </div>
                <div className="text-green-500">✓</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Revenue Generated</p>
                  <p className="text-3xl font-bold text-emerald-600">${appointmentMetrics.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-emerald-500" />
              </div>
            </div>
          </div>
        );
      
      case 'doctors':
        const doctorMetrics = metrics as ReportMetrics['doctors'];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Doctors</p>
                  <p className="text-3xl font-bold text-slate-900">{doctorMetrics.total.toLocaleString()}</p>
                </div>
                <Users className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Doctors</p>
                  <p className="text-3xl font-bold text-green-600">{doctorMetrics.active.toLocaleString()}</p>
                </div>
                <Activity className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Rating</p>
                  <p className="text-3xl font-bold text-yellow-500">{doctorMetrics.avgRating}</p>
                </div>
                <div className="text-yellow-500">⭐</div>
              </div>
            </div>
          </div>
        );

      case 'revenue':
        const revenueMetrics = metrics as ReportMetrics['revenue'];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">${revenueMetrics.total.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Month</p>
                  <p className="text-3xl font-bold text-green-600">${revenueMetrics.thisMonth.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Growth</p>
                  <p className="text-3xl font-bold text-emerald-600">{revenueMetrics.growth}%</p>
                </div>
                <div className="text-emerald-500">📈</div>
              </div>
            </div>
          </div>
        );

      case 'surgeries':
        const surgeryMetrics = metrics as ReportMetrics['surgeries'];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Surgeries</p>
                  <p className="text-3xl font-bold text-slate-900">{surgeryMetrics.total.toLocaleString()}</p>
                </div>
                <Scissors className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{surgeryMetrics.completed.toLocaleString()}</p>
                </div>
                <div className="text-green-500">✓</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Revenue</p>
                  <p className="text-3xl font-bold text-purple-600">${surgeryMetrics.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-purple-500" />
              </div>
            </div>
          </div>
        );

      case 'claims':
        const claimMetrics = metrics as ReportMetrics['claims'];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Claims</p>
                  <p className="text-3xl font-bold text-slate-900">{claimMetrics.total.toLocaleString()}</p>
                </div>
                <ClipboardCheck className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{claimMetrics.approved.toLocaleString()}</p>
                </div>
                <div className="text-green-500">✓</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Amount</p>
                  <p className="text-3xl font-bold text-orange-600">${claimMetrics.amount.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-orange-500" />
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <p className="text-slate-600">Report metrics for {reportType?.name} will be displayed here.</p>
          </div>
        );
    }
  };

  const ScheduleModal = () => {
    const [scheduleData, setScheduleData] = useState<ScheduleData>({
      reportType: selectedReportType,
      frequency: 'weekly',
      email: 'admin@saarohealth.com',
      format: 'pdf',
      time: '09:00'
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Schedule Report</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
              <select
                value={scheduleData.reportType}
                onChange={(e) => setScheduleData({...scheduleData, reportType: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
              <select
                value={scheduleData.frequency}
                onChange={(e) => setScheduleData({...scheduleData, frequency: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={scheduleData.email}
                onChange={(e) => setScheduleData({...scheduleData, email: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                placeholder="admin@saarohealth.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
              <select
                value={scheduleData.format}
                onChange={(e) => setScheduleData({...scheduleData, format: e.target.value})}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
              >
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-8">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => scheduleReport(scheduleData)}
              className="flex-1 px-4 py-3 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 transition-colors"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Reports & Analytics
        </h1>
        <p className="text-slate-600 text-lg">
          Generate comprehensive reports and analytics for your healthcare platform
        </p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <FileBarChart className="h-6 w-6 text-[#49A097] mr-2" />
          Report Configuration
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Report Type</label>
            <div className="space-y-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
                      selectedReportType === type.id
                        ? 'border-[#49A097] bg-[#49A097]/10 text-[#49A097]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] mb-4"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {dateRange === 'custom' && (
              <div className="space-y-3">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                  placeholder="End Date"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Actions</label>
            <div className="space-y-3">
              <button
                onClick={() => generateReport('view')}
                disabled={isGeneratingReport}
                className="w-full flex items-center justify-center p-4 bg-[#49A097] text-white rounded-lg hover:bg-[#49A097]/90 transition-colors disabled:opacity-50"
              >
                {isGeneratingReport ? (
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Eye className="h-5 w-5 mr-2" />
                )}
                {isGeneratingReport ? 'Generating...' : 'Generate Report'}
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport('csv')}
                  disabled={isGeneratingReport}
                  className="flex-1 flex items-center justify-center p-3 border border-[#49A097] text-[#49A097] rounded-lg hover:bg-[#49A097]/10 transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </button>
                <button
                  onClick={() => generateReport('pdf')}
                  disabled={isGeneratingReport}
                  className="flex-1 flex items-center justify-center p-3 border border-[#49A097] text-[#49A097] rounded-lg hover:bg-[#49A097]/10 transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </button>
              </div>

              <button
                onClick={() => setShowScheduleModal(true)}
                className="w-full flex items-center justify-center p-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Schedule Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Metrics */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <BarChart3 className="h-6 w-6 text-[#49A097] mr-2" />
          {reportTypes.find(type => type.id === selectedReportType)?.name} Report
        </h2>
        {renderReportMetrics()}
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <Clock className="h-6 w-6 text-[#49A097] mr-2" />
          Scheduled Reports
        </h2>

        {scheduledReports.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg mb-2">No scheduled reports yet</p>
          <p className="text-slate-400">Schedule your first automated report to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-2 font-medium text-slate-700">Report Type</th>
                <th className="text-left py-4 px-2 font-medium text-slate-700">Frequency</th>
                <th className="text-left py-4 px-2 font-medium text-slate-700">Email</th>
                <th className="text-left py-4 px-2 font-medium text-slate-700">Format</th>
                <th className="text-left py-4 px-2 font-medium text-slate-700">Time</th>
                <th className="text-left py-4 px-2 font-medium text-slate-700">Status</th>
                <th className="text-left py-4 px-2 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((report) => (
                <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2">
                    <div className="flex items-center">
                      {(() => {
                        const reportType = reportTypes.find(type => type.id === report.reportType);
                        if (reportType) {
                          const Icon = reportType.icon;
                          return <Icon className="h-4 w-4 mr-2 text-slate-500" />;
                        }
                        return <FileText className="h-4 w-4 mr-2 text-slate-500" />;
                      })()}
                      <span className="font-medium text-slate-900 capitalize">{report.reportType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="capitalize text-slate-700">{report.frequency}</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">{report.email}</td>
                  <td className="py-4 px-2">
                    <span className="uppercase text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded">
                      {report.format}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">{report.time}</td>
                  <td className="py-4 px-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      report.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => {
                        setScheduledReports(scheduledReports.filter(r => r.id !== report.id));
                        alert('Scheduled report deleted successfully!');
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && <ScheduleModal />}
    </div>
  );
};

export default ReportsAnalyticsPage;