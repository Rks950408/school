import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Fees = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sendingReminder, setSendingReminder] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      // Mock data - replace with actual API call
      const mockFees = [
        {
          id: 1,
          studentId: 1,
          studentName: 'John Doe',
          studentClass: 'Grade 10A',
          studentPhone: '+1234567890',
          feeType: 'Tuition Fee',
          amount: 1500,
          dueDate: '2024-01-15',
          isPaid: false,
          paymentDate: null,
          month: 'January 2024',
          status: 'overdue'
        },
        {
          id: 2,
          studentId: 2,
          studentName: 'Alice Smith',
          studentClass: 'Grade 9B',
          studentPhone: '+1234567891',
          feeType: 'Tuition Fee',
          amount: 1200,
          dueDate: '2024-02-15',
          isPaid: true,
          paymentDate: '2024-02-10',
          month: 'February 2024',
          status: 'paid'
        },
        {
          id: 3,
          studentId: 3,
          studentName: 'Mike Johnson',
          studentClass: 'Grade 11C',
          studentPhone: '+1234567892',
          feeType: 'Tuition Fee',
          amount: 1800,
          dueDate: '2024-03-15',
          isPaid: false,
          paymentDate: null,
          month: 'March 2024',
          status: 'pending'
        },
        {
          id: 4,
          studentId: 1,
          studentName: 'John Doe',
          studentClass: 'Grade 10A',
          studentPhone: '+1234567890',
          feeType: 'Lab Fee',
          amount: 300,
          dueDate: '2024-01-20',
          isPaid: false,
          paymentDate: null,
          month: 'January 2024',
          status: 'overdue'
        }
      ];
      
      setFees(mockFees);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fees:', error);
      setLoading(false);
    }
  };

  const handleSendReminder = async (feeId) => {
    setSendingReminder(feeId);
    
    try {
      // Mock API call for sending WhatsApp reminder
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // In real implementation, this would call:
      // await api.post('/fees/reminder', { feeId });
      
      alert('Reminder sent successfully via WhatsApp!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Error sending reminder');
    } finally {
      setSendingReminder(null);
    }
  };

  const handleMarkAsPaid = async (feeId) => {
    try {
      // Mock API call - replace with actual implementation
      const updatedFees = fees.map(fee => {
        if (fee.id === feeId) {
          return {
            ...fee,
            isPaid: true,
            paymentDate: new Date().toISOString().split('T')[0],
            status: 'paid'
          };
        }
        return fee;
      });
      
      setFees(updatedFees);
      alert('Fee marked as paid successfully!');
    } catch (error) {
      console.error('Error marking fee as paid:', error);
      alert('Error updating fee status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !fees.find(f => f.dueDate === dueDate)?.isPaid;
  };

  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.feeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.month.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filter === 'paid') matchesFilter = fee.isPaid;
    else if (filter === 'unpaid') matchesFilter = !fee.isPaid;
    else if (filter === 'overdue') matchesFilter = !fee.isPaid && isOverdue(fee.dueDate);
    
    return matchesSearch && matchesFilter;
  });

  const totalAmount = filteredFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = filteredFees.filter(fee => fee.isPaid).reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fees Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Track fee payments and send reminders
            </p>
          </div>
          {user?.role === 'admin' && (
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Add New Fee
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-blue-600">💰</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                  <dd className="text-lg font-medium text-gray-900">${totalAmount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-green-600">✅</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Paid Amount</dt>
                  <dd className="text-lg font-medium text-gray-900">${paidAmount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-red-600">⏰</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Amount</dt>
                  <dd className="text-lg font-medium text-gray-900">${pendingAmount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Fees
            </label>
            <input
              type="text"
              placeholder="Search by student name, fee type, or month..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Fees</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fees table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {fee.studentName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{fee.studentName}</div>
                        <div className="text-sm text-gray-500">{fee.studentClass}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fee.feeType}</div>
                    <div className="text-sm text-gray-500">{fee.month}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${fee.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </div>
                    {isOverdue(fee.dueDate) && !fee.isPaid && (
                      <div className="text-xs text-red-600 font-medium">Overdue</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                      </span>
                      {fee.isPaid && fee.paymentDate && (
                        <div className="text-xs text-gray-500">
                          Paid: {new Date(fee.paymentDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {!fee.isPaid && user?.role === 'admin' && (
                      <>
                        <button
                          onClick={() => handleMarkAsPaid(fee.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Mark Paid
                        </button>
                        <button
                          onClick={() => handleSendReminder(fee.id)}
                          disabled={sendingReminder === fee.id}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                        >
                          {sendingReminder === fee.id ? 'Sending...' : 'Send Reminder'}
                        </button>
                      </>
                    )}
                    {fee.isPaid && (
                      <span className="text-gray-400">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No fees found matching your criteria.</div>
          </div>
        )}
      </div>

      {/* Bulk Actions for Admin */}
      {user?.role === 'admin' && filteredFees.some(fee => !fee.isPaid) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Actions</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const overdueCount = filteredFees.filter(fee => !fee.isPaid && isOverdue(fee.dueDate)).length;
                if (overdueCount > 0) {
                  alert(`Sending reminders to ${overdueCount} students with overdue fees...`);
                } else {
                  alert('No overdue fees found.');
                }
              }}
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
            >
              Send Bulk Reminders (Overdue)
            </button>
            <button
              onClick={() => {
                const unpaidCount = filteredFees.filter(fee => !fee.isPaid).length;
                if (unpaidCount > 0) {
                  alert(`Generating fee reports for ${unpaidCount} unpaid fees...`);
                } else {
                  alert('No unpaid fees found.');
                }
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
