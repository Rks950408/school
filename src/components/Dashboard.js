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
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`text-2xl ${color}`}>{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
        {description && (
          <div className="mt-3">
            <p className="text-sm text-gray-600">{description}</p>
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
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || user?.email}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening at your school today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Recent activities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== recentActivities.length - 1 && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-900">{activity.message}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
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
