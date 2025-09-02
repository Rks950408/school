import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Classes = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      // Mock data - replace with actual API call
      const mockClasses = [
        {
          id: 1,
          name: 'Grade 10A',
          grade: 10,
          section: 'A',
          classTeacher: 'Dr. Sarah Wilson',
          teacherId: 1,
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'History'],
          students: [
            { id: 1, name: 'John Doe', rollNumber: '2023001' },
            { id: 3, name: 'Mike Johnson', rollNumber: '2023078' }
          ],
          schedule: [
            { day: 'Monday', periods: ['Math', 'Physics', 'English', 'Chemistry', 'History', 'Sports'] },
            { day: 'Tuesday', periods: ['Physics', 'Math', 'Chemistry', 'English', 'Computer', 'Art'] },
            { day: 'Wednesday', periods: ['Chemistry', 'English', 'Math', 'Physics', 'History', 'Music'] },
            { day: 'Thursday', periods: ['English', 'Math', 'Physics', 'Chemistry', 'Geography', 'Sports'] },
            { day: 'Friday', periods: ['Math', 'Chemistry', 'Physics', 'English', 'Biology', 'Library'] }
          ],
          capacity: 40,
          currentStrength: 35,
          classroom: 'Room 101',
          status: 'active'
        },
        {
          id: 2,
          name: 'Grade 9B',
          grade: 9,
          section: 'B',
          classTeacher: 'Ms. Emily Chen',
          teacherId: 3,
          subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer'],
          students: [
            { id: 2, name: 'Alice Smith', rollNumber: '2022045' }
          ],
          schedule: [
            { day: 'Monday', periods: ['Math', 'Science', 'English', 'Social Studies', 'Computer', 'Sports'] },
            { day: 'Tuesday', periods: ['Science', 'Math', 'English', 'Computer', 'Art', 'Music'] },
            { day: 'Wednesday', periods: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Library'] },
            { day: 'Thursday', periods: ['Math', 'Science', 'English', 'Computer', 'Sports', 'Art'] },
            { day: 'Friday', periods: ['Science', 'English', 'Math', 'Social Studies', 'Computer', 'Music'] }
          ],
          capacity: 35,
          currentStrength: 32,
          classroom: 'Room 205',
          status: 'active'
        },
        {
          id: 3,
          name: 'Grade 11C',
          grade: 11,
          section: 'C',
          classTeacher: 'Mr. John Davis',
          teacherId: 2,
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'],
          students: [],
          schedule: [
            { day: 'Monday', periods: ['Math', 'Physics', 'Chemistry', 'English', 'Computer', 'Lab'] },
            { day: 'Tuesday', periods: ['Physics', 'Math', 'English', 'Chemistry', 'Computer', 'Sports'] },
            { day: 'Wednesday', periods: ['Chemistry', 'Physics', 'Math', 'English', 'Computer', 'Lab'] },
            { day: 'Thursday', periods: ['Math', 'Chemistry', 'Physics', 'English', 'Computer', 'Sports'] },
            { day: 'Friday', periods: ['Physics', 'Math', 'Chemistry', 'English', 'Computer', 'Library'] }
          ],
          capacity: 30,
          currentStrength: 28,
          classroom: 'Room 301',
          status: 'active'
        }
      ];
      
      setClasses(mockClasses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setLoading(false);
    }
  };

  const getUtilizationColor = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Classes Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage class assignments and schedules
            </p>
          </div>
          {user?.role === 'admin' && (
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Add New Class
            </button>
          )}
        </div>
      </div>

      {/* Classes grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{classItem.name}</h3>
                  <p className="text-sm text-gray-500">{classItem.classroom}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(classItem.status)}`}>
                  {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Class Teacher:</span>
                  <span className="text-sm font-medium text-gray-900">{classItem.classTeacher}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Students:</span>
                  <span className={`text-sm font-medium ${getUtilizationColor(classItem.currentStrength, classItem.capacity)}`}>
                    {classItem.currentStrength}/{classItem.capacity}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(classItem.currentStrength / classItem.capacity) * 100}%` }}
                  ></div>
                </div>

                <div>
                  <span className="text-sm text-gray-600 block mb-2">Subjects:</span>
                  <div className="flex flex-wrap gap-1">
                    {classItem.subjects.slice(0, 3).map((subject, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {subject}
                      </span>
                    ))}
                    {classItem.subjects.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{classItem.subjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedClass(classItem);
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

      {/* Class Details Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-medium text-gray-900">{selectedClass.name} Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Class Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Class Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Class Name</label>
                      <p className="text-sm text-gray-900">{selectedClass.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Grade</label>
                      <p className="text-sm text-gray-900">Grade {selectedClass.grade}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Section</label>
                      <p className="text-sm text-gray-900">Section {selectedClass.section}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Classroom</label>
                      <p className="text-sm text-gray-900">{selectedClass.classroom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Class Teacher</label>
                      <p className="text-sm text-gray-900">{selectedClass.classTeacher}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Capacity</label>
                      <p className="text-sm text-gray-900">{selectedClass.currentStrength}/{selectedClass.capacity} students</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedClass.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Weekly Schedule</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {selectedClass.schedule.map((daySchedule, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-gray-900 mb-2">{daySchedule.day}</h5>
                          <div className="grid grid-cols-3 gap-1">
                            {daySchedule.periods.map((period, periodIndex) => (
                              <span
                                key={periodIndex}
                                className="text-xs bg-white px-2 py-1 rounded border text-center"
                              >
                                {period}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Students List */}
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Students ({selectedClass.students.length})
                </h4>
                {selectedClass.students.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedClass.students.map((student) => (
                        <div key={student.id} className="bg-white p-3 rounded border">
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">Roll: {student.rollNumber}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <div className="text-gray-500">No students assigned to this class yet.</div>
                  </div>
                )}
              </div>

              {user?.role === 'admin' && (
                <div className="mt-6 flex space-x-3">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    Edit Class
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Manage Students
                  </button>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                    Update Schedule
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

export default Classes;
