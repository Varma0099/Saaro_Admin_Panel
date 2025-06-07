
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  Calendar
} from 'lucide-react';

interface Transaction {
  id: string;
  patientName: string;
  doctorName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
  date: string;
  appointmentId: string;
  transactionId: string;
}

const AllTransactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const transactions: Transaction[] = [
    {
      id: '1',
      patientName: 'Arjun Sharma',
      doctorName: 'Dr. Priya Patel',
      amount: 800,
      status: 'completed',
      paymentMethod: 'card',
      date: '2024-12-08T10:30:00',
      appointmentId: 'APT001',
      transactionId: 'TXN123456789'
    },
    {
      id: '2',
      patientName: 'Meera Kumar',
      doctorName: 'Dr. Rajesh Singh',
      amount: 1200,
      status: 'pending',
      paymentMethod: 'upi',
      date: '2024-12-08T14:15:00',
      appointmentId: 'APT002',
      transactionId: 'TXN123456790'
    },
    {
      id: '3',
      patientName: 'Vikram Reddy',
      doctorName: 'Dr. Sneha Gupta',
      amount: 1500,
      status: 'failed',
      paymentMethod: 'netbanking',
      date: '2024-12-08T16:45:00',
      appointmentId: 'APT003',
      transactionId: 'TXN123456791'
    },
    {
      id: '4',
      patientName: 'Ananya Iyer',
      doctorName: 'Dr. Karthik Nair',
      amount: 950,
      status: 'refunded',
      paymentMethod: 'wallet',
      date: '2024-12-07T11:20:00',
      appointmentId: 'APT004',
      transactionId: 'TXN123456792'
    },
    {
      id: '5',
      patientName: 'Rohit Joshi',
      doctorName: 'Dr. Kavya Menon',
      amount: 2000,
      status: 'completed',
      paymentMethod: 'card',
      date: '2024-12-07T09:30:00',
      appointmentId: 'APT005',
      transactionId: 'TXN123456793'
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      refunded: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle }
    };

    const { bg, text, icon: Icon } = config[status as keyof typeof config];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    const icons = {
      card: CreditCard,
      upi: Smartphone,
      netbanking: Building,
      wallet: CreditCard
    };
    
    const Icon = icons[method as keyof typeof icons];
    return <Icon className="h-4 w-4" />;
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || transaction.paymentMethod === paymentMethodFilter;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097] transition-all duration-300"
              placeholder="Search by patient, doctor, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#49A097] transition-all duration-200"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-[#49A097] text-white rounded-lg text-sm font-medium hover:bg-[#49A097]/90 focus:outline-none focus:ring-2 focus:ring-[#49A097] transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
              <select
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
              >
                <option value="all">All Methods</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">From Date</label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">To Date</label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#49A097] focus:border-[#49A097]"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Transactions ({filteredTransactions.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Transaction Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {transaction.transactionId}
                      </div>
                      <div className="text-sm text-slate-500">
                        {transaction.appointmentId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {transaction.patientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {transaction.doctorName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPaymentMethodIcon(transaction.paymentMethod)}
                      <span className="ml-2 text-sm text-slate-900 capitalize">
                        {transaction.paymentMethod === 'upi' ? 'UPI' : transaction.paymentMethod}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#49A097] hover:text-[#49A097]/80 transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg mb-2">No transactions found</div>
            <div className="text-slate-400 text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;