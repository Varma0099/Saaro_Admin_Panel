
import React, { useState } from 'react';
import AllTransactions from './AllTransactions';
import RefundRequests from './RefundRequests';
import InsuranceClaims from './InsuranceClaims';
import { 
  CreditCard, 
  RefreshCw, 
  Shield,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface BillingPageProps {
  currentPath: string;
}

const BillingPage: React.FC<BillingPageProps> = ({ currentPath }) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (currentPath.includes('/refunds')) return 'refunds';
    if (currentPath.includes('/insurance')) return 'insurance';
    return 'transactions';
  });

  // Summary stats for the billing overview
  const billingStats = {
    totalRevenue: '$1,245,780',
    pendingRefunds: 23,
    processedClaims: 156,
    rejectedClaims: 12
  };

  const renderBillingOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Billing & Refunds Management
        </h1>
        <p className="text-slate-600 text-lg">
          Manage transactions, process refunds, and handle insurance claims
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">{billingStats.totalRevenue}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 text-sm font-semibold">+12.5%</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Pending Refunds</p>
              <p className="text-2xl font-bold text-slate-800">{billingStats.pendingRefunds}</p>
              <div className="flex items-center mt-2">
                <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-orange-600 text-sm font-semibold">Needs Attention</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Processed Claims</p>
              <p className="text-2xl font-bold text-slate-800">{billingStats.processedClaims}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-600 text-sm font-semibold">This Month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Rejected Claims</p>
              <p className="text-2xl font-bold text-slate-800">{billingStats.rejectedClaims}</p>
              <div className="flex items-center mt-2">
                <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-600 text-sm font-semibold">Review Needed</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'transactions'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>All Transactions</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('refunds')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'refunds'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refund Requests</span>
                {billingStats.pendingRefunds > 0 && (
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {billingStats.pendingRefunds}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('insurance')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'insurance'
                  ? 'border-[#49A097] text-[#49A097]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Insurance Claims</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'transactions' && <AllTransactions />}
          {activeTab === 'refunds' && <RefundRequests />}
          {activeTab === 'insurance' && <InsuranceClaims />}
        </div>
      </div>
    </div>
  );

  return renderBillingOverview();
};

export default BillingPage;