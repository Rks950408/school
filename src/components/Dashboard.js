import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    pendingFees: 0,
    upcomingExams: 0,
    notifications: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        totalStudents: 1250,
        totalTeachers: 85,
        totalClasses: 45,
        pendingFees: 23,
        upcomingExams: 8,
        notifications: 12
      });

      setRecentActivities([
        { id: 1, type: 'fee', message: 'Fee payment received from John Doe', time: '2 hours ago' },
        { id: 2, type: 'admission', message: 'New student admission: Jane Smith', time: '4 hours ago' },
        { id: 3, type: 'exam', message: 'Math exam scheduled for Grade 10', time: '6 hours ago' },
        { id: 4, type: 'attendance', message: 'Attendance marked for Class 9A', time: '8 hours ago' },
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
              <span className={`text-2xl ${color}`}>{icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
          </div>
        </div>
        {description && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'fee': return '💰';
      case 'admission': return '👨‍🎓';
      case 'exam': return '📝';
      case 'attendance': return '📅';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 shadow-xl rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name || user?.email?.split('@')[0]}! 👋
            </h1>
            <p className="mt-2 text-primary-100 text-lg">
              Here's what's happening at your school today.
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-primary-100">
              <span>📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span className="capitalize">🔰 {user?.role} Dashboard</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">
                {user?.role === 'admin' ? '👨‍💼' : user?.role === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👨‍🎓"
          color="text-blue-600"
          description="Active enrollments"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon="👨‍🏫"
          color="text-green-600"
          description="Faculty members"
        />
        <StatCard
          title="Total Classes"
          value={stats.totalClasses}
          icon="🏫"
          color="text-purple-600"
          description="Active classes"
        />
        <StatCard
          title="Pending Fees"
          value={stats.pendingFees}
          icon="💰"
          color="text-red-600"
          description="Students with due payments"
        />
        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExams}
          icon="📝"
          color="text-yellow-600"
          description="Scheduled this month"
        />
        <StatCard
          title="Notifications"
          value={stats.notifications}
          icon="🔔"
          color="text-indigo-600"
          description="Unread alerts"
        />
      </div>

      {/* Quick Actions */}
      {user?.role === 'admin' && (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🚀</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200">
              <span className="text-2xl mb-2">👨‍🎓</span>
              <span className="text-sm font-medium text-gray-700">Add Student</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200">
              <span className="text-2xl mb-2">👨‍🏫</span>
              <span className="text-sm font-medium text-gray-700">Add Teacher</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200">
              <span className="text-2xl mb-2">📝</span>
              <span className="text-sm font-medium text-gray-700">Schedule Exam</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200">
              <span className="text-2xl mb-2">💰</span>
              <span className="text-sm font-medium text-gray-700">Send Reminders</span>
            </button>
          </div>
        </div>
      )}

      {/* Recent activities */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">⚡</span>
              Recent Activities
            </h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="flow-root">
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={activity.id}>
                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {activity.time}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
