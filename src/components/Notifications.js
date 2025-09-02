import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Mock data - replace with actual API call
      const mockNotifications = [
        {
          id: 1,
          type: 'fee_due',
          title: 'Fee Payment Overdue',
          message: 'Your tuition fee for January 2024 is overdue. Please pay immediately to avoid late charges.',
          studentId: 1,
          studentName: 'John Doe',
          priority: 'high',
          isRead: false,
          createdAt: '2024-01-20T10:30:00Z',
          actionRequired: true,
          actionType: 'pay_fee',
          actionData: { feeId: 1, amount: 1500 }
        },
        {
          id: 2,
          type: 'exam_schedule',
          title: 'Upcoming Exam Scheduled',
          message: 'Mathematics exam for Grade 10A has been scheduled for February 15, 2024 at 9:00 AM.',
          studentId: null,
          studentName: null,
          priority: 'medium',
          isRead: true,
          createdAt: '2024-01-18T14:15:00Z',
          actionRequired: false,
          actionType: null,
          actionData: null
        },
        {
          id: 3,
          type: 'attendance_warning',
          title: 'Low Attendance Alert',
          message: 'Your attendance has dropped below 75%. Current attendance: 68%. Please improve to meet minimum requirements.',
          studentId: 2,
          studentName: 'Alice Smith',
          priority: 'high',
          isRead: false,
          createdAt: '2024-01-17T09:45:00Z',
          actionRequired: true,
          actionType: 'view_attendance',
          actionData: { studentId: 2 }
        },
        {
          id: 4,
          type: 'admission_expired',
          title: 'Admission Status Expired',
          message: 'Student admission has expired. Please contact administration for readmission process.',
          studentId: 2,
          studentName: 'Alice Smith',
          priority: 'critical',
          isRead: false,
          createdAt: '2024-01-16T16:20:00Z',
          actionRequired: true,
          actionType: 'readmission',
          actionData: { studentId: 2 }
        },
        {
          id: 5,
          type: 'fee_payment',
          title: 'Fee Payment Received',
          message: 'Payment of $1200 for February 2024 tuition fee has been successfully received.',
          studentId: 2,
          studentName: 'Alice Smith',
          priority: 'low',
          isRead: true,
          createdAt: '2024-01-15T11:10:00Z',
          actionRequired: false,
          actionType: null,
          actionData: null
        },
        {
          id: 6,
          type: 'result_published',
          title: 'Exam Results Published',
          message: 'Results for December 2023 semester exams have been published. Check your performance.',
          studentId: null,
          studentName: null,
          priority: 'medium',
          isRead: false,
          createdAt: '2024-01-14T13:30:00Z',
          actionRequired: true,
          actionType: 'view_results',
          actionData: { examId: 'dec2023' }
        }
      ];
      
      setNotifications(mockNotifications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      // Mock API call - replace with actual implementation
      const updatedNotifications = notifications.map(notification => {
        if (notification.id === notificationId) {
          return { ...notification, isRead: true };
        }
        return notification;
      });
      
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Mock API call - replace with actual implementation
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        isRead: true
      }));
      
      setNotifications(updatedNotifications);
      alert('All notifications marked as read!');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleAction = (notification) => {
    switch (notification.actionType) {
      case 'pay_fee':
        alert(`Redirecting to fee payment for amount $${notification.actionData.amount}`);
        // In real app: navigate to fees page or payment gateway
        break;
      case 'view_attendance':
        alert('Redirecting to attendance page');
        // In real app: navigate to attendance page
        break;
      case 'readmission':
        alert('Redirecting to readmission process');
        // In real app: navigate to readmission form
        break;
      case 'view_results':
        alert('Redirecting to exam results');
        // In real app: navigate to results page
        break;
      default:
        alert('Action not implemented');
    }
    
    handleMarkAsRead(notification.id);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'fee_due':
      case 'fee_payment':
        return '💰';
      case 'exam_schedule':
      case 'result_published':
        return '📝';
      case 'attendance_warning':
        return '📅';
      case 'admission_expired':
        return '⚠️';
      default:
        return '🔔';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    if (filter === 'action_required') return notification.actionRequired;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-1 text-sm text-gray-600">
              Stay updated with important alerts and messages
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} unread
              </span>
            )}
            <button
              onClick={handleMarkAllAsRead}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'unread'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'read'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Read ({notifications.length - unreadCount})
          </button>
          <button
            onClick={() => setFilter('action_required')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'action_required'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Action Required ({notifications.filter(n => n.actionRequired).length})
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white shadow rounded-lg p-6 border-l-4 ${
              !notification.isRead ? 'bg-blue-50' : ''
            } ${getPriorityColor(notification.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-lg font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600">
                    {notification.message}
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                      <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
                      {notification.studentName && (
                        <span>• Student: {notification.studentName}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {notification.actionRequired && (
                        <button
                          onClick={() => handleAction(notification)}
                          className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700"
                        >
                          Take Action
                        </button>
                      )}
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-sm">
              {filter === 'all' 
                ? 'You have no notifications at the moment.' 
                : `No ${filter.replace('_', ' ')} notifications found.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
