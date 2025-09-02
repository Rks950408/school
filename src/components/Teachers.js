import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Teachers = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTeachers = [
        {
          id: 1,
          name: 'Dr. Sarah Wilson',
          email: 'sarah.wilson@school.com',
          phone: '+1234567890',
          subject: 'Mathematics',
          classes: ['Grade 10A', 'Grade 10B', 'Grade 11A'],
          experience: 8,
          qualification: 'PhD in Mathematics',
          joiningDate: '2018-08-15',
          address: '123 Teacher Lane, City',
          salary: 65000,
          status: 'active'
        },
        {
          id: 2,
          name: 'Mr. John Davis',
          email: 'john.davis@school.com',
          phone: '+1234567891',
          subject: 'Physics',
          classes: ['Grade 11B', 'Grade 12A'],
          experience: 12,
          qualification: 'MSc in Physics',
          joiningDate: '2015-03-20',
          address: '456 Education Ave, City',
          salary: 70000,
          status: 'active'
        },
        {
          id: 3,
          name: 'Ms. Emily Chen',
          email: 'emily.chen@school.com',
          phone: '+1234567892',
          subject: 'Chemistry',
          classes: ['Grade 9A', 'Grade 9B', 'Grade 10C'],
          experience: 5,
          qualification: 'MSc in Chemistry',
          joiningDate: '2020-07-10',
          address: '789 Science Blvd, City',
          salary: 58000,
          status: 'active'
        },
        {
          id: 4,
          name: 'Mr. Michael Brown',
          email: 'michael.brown@school.com',
          phone: '+1234567893',
          subject: 'English Literature',
          classes: ['Grade 8A', 'Grade 8B'],
          experience: 15,
          qualification: 'MA in English Literature',
          joiningDate: '2012-01-05',
          address: '321 Literature St, City',
          salary: 72000,
          status: 'on_leave'
        }
      ];
      
      setTeachers(mockTeachers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Teachers Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage teaching staff and their assignments
            </p>
          </div>
          {user?.role === 'admin' && (
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Add New Teacher
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Teachers
          </label>
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Teachers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-xl font-medium text-primary-600">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.subject}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                    {teacher.status.replace('_', ' ').charAt(0).toUpperCase() + teacher.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">📧</span>
                  {teacher.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">📞</span>
                  {teacher.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">🎓</span>
                  {teacher.experience} years experience
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">🏫</span>
                  {teacher.classes.length} classes assigned
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Assigned Classes:</h4>
                <div className="flex flex-wrap gap-1">
                  {teacher.classes.map((className, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setShowModal(true);
                  }}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
            <p className="text-sm">
              No teachers match your search criteria.
            </p>
          </div>
        </div>
      )}

      {/* Teacher Details Modal */}
      {showModal && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Teacher Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Qualification</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.qualification}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.experience} years</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                  <p className="text-sm text-gray-900">{new Date(selectedTeacher.joiningDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900">{selectedTeacher.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTeacher.status)}`}>
                    {selectedTeacher.status.replace('_', ' ').charAt(0).toUpperCase() + selectedTeacher.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
                {user?.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                    <p className="text-sm text-gray-900">${selectedTeacher.salary.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned Classes</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTeacher.classes.map((className, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {user?.role === 'admin' && (
                <div className="mt-6 space-y-2">
                  <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    Edit Teacher
                  </button>
                  <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    View Performance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
