import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Exams = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExams();
    fetchResults();
  }, []);

  const fetchExams = async () => {
    try {
      // Mock data - replace with actual API call
      const mockExams = [
        {
          id: 1,
          title: 'Mathematics Mid-term Exam',
          subject: 'Mathematics',
          class: 'Grade 10A',
          classId: 1,
          date: '2024-02-15',
          time: '09:00',
          duration: 180, // minutes
          totalMarks: 100,
          examType: 'mid-term',
          teacher: 'Dr. Sarah Wilson',
          teacherId: 1,
          status: 'upcoming',
          instructions: 'Bring calculator, graph paper, and geometry box. No mobile phones allowed.',
          venue: 'Room 101'
        },
        {
          id: 2,
          title: 'Physics Unit Test',
          subject: 'Physics',
          class: 'Grade 11C',
          classId: 3,
          date: '2024-02-20',
          time: '11:00',
          duration: 120,
          totalMarks: 50,
          examType: 'unit-test',
          teacher: 'Mr. John Davis',
          teacherId: 2,
          status: 'upcoming',
          instructions: 'Formula sheet will be provided. Calculators allowed.',
          venue: 'Room 301'
        },
        {
          id: 3,
          title: 'Chemistry Practical Exam',
          subject: 'Chemistry',
          class: 'Grade 9B',
          classId: 2,
          date: '2024-01-25',
          time: '14:00',
          duration: 150,
          totalMarks: 30,
          examType: 'practical',
          teacher: 'Ms. Emily Chen',
          teacherId: 3,
          status: 'completed',
          instructions: 'Lab coat and safety goggles mandatory.',
          venue: 'Chemistry Lab'
        },
        {
          id: 4,
          title: 'English Literature Final Exam',
          subject: 'English',
          class: 'Grade 8A',
          classId: 4,
          date: '2024-01-30',
          time: '10:00',
          duration: 180,
          totalMarks: 100,
          examType: 'final',
          teacher: 'Mr. Michael Brown',
          teacherId: 4,
          status: 'completed',
          instructions: 'Reference books not allowed. Write in blue or black pen only.',
          venue: 'Room 201'
        }
      ];
      
      setExams(mockExams);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      // Mock data - replace with actual API call
      const mockResults = [
        {
          id: 1,
          examId: 3,
          studentId: 2,
          studentName: 'Alice Smith',
          rollNumber: '2022045',
          marksObtained: 28,
          totalMarks: 30,
          percentage: 93.33,
          grade: 'A+',
          rank: 1,
          remarks: 'Excellent performance'
        },
        {
          id: 2,
          examId: 4,
          studentId: 1,
          studentName: 'John Doe',
          rollNumber: '2023001',
          marksObtained: 85,
          totalMarks: 100,
          percentage: 85.0,
          grade: 'A',
          rank: 2,
          remarks: 'Good work'
        }
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const getExamsByStatus = (status) => {
    return exams.filter(exam => exam.status === status);
  };

  const getExamTypeColor = (type) => {
    switch (type) {
      case 'final':
        return 'bg-red-100 text-red-800';
      case 'mid-term':
        return 'bg-blue-100 text-blue-800';
      case 'unit-test':
        return 'bg-yellow-100 text-yellow-800';
      case 'practical':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600';
      case 'B+':
      case 'B':
        return 'text-blue-600';
      case 'C+':
      case 'C':
        return 'text-yellow-600';
      case 'D':
      case 'F':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const isExamToday = (examDate) => {
    const today = new Date().toISOString().split('T')[0];
    return examDate === today;
  };

  const upcomingExams = getExamsByStatus('upcoming');
  const completedExams = getExamsByStatus('completed');

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
            <h1 className="text-2xl font-bold text-gray-900">Exams & Results</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage exam schedules and view results
            </p>
          </div>
          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Schedule New Exam
            </button>
          )}
        </div>
      </div>

      {/* Exam Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-blue-600">📅</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Exams</dt>
                  <dd className="text-lg font-medium text-gray-900">{upcomingExams.length}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-lg font-medium text-gray-900">{completedExams.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-yellow-600">⚡</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Today's Exams</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {upcomingExams.filter(exam => isExamToday(exam.date)).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-purple-600">📊</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Results Published</dt>
                  <dd className="text-lg font-medium text-gray-900">{results.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Exams ({upcomingExams.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Exams ({completedExams.length})
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'results'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Results ({results.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Upcoming Exams Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingExams.length > 0 ? (
                upcomingExams.map((exam) => (
                  <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                          {isExamToday(exam.date) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Today
                            </span>
                          )}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExamTypeColor(exam.examType)}`}>
                            {exam.examType.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Subject:</span> {exam.subject}
                          </div>
                          <div>
                            <span className="font-medium">Class:</span> {exam.class}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {new Date(exam.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {exam.time}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {exam.duration} mins
                          </div>
                          <div>
                            <span className="font-medium">Marks:</span> {exam.totalMarks}
                          </div>
                          <div>
                            <span className="font-medium">Venue:</span> {exam.venue}
                          </div>
                          <div>
                            <span className="font-medium">Teacher:</span> {exam.teacher}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedExam(exam);
                          setShowModal(true);
                        }}
                        className="ml-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming exams</h3>
                    <p className="text-sm">No exams are scheduled at the moment.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Completed Exams Tab */}
          {activeTab === 'completed' && (
            <div className="space-y-4">
              {completedExams.length > 0 ? (
                completedExams.map((exam) => (
                  <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(exam.status)}`}>
                            {exam.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Subject:</span> {exam.subject}
                          </div>
                          <div>
                            <span className="font-medium">Class:</span> {exam.class}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {new Date(exam.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Total Marks:</span> {exam.totalMarks}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedExam(exam);
                            setShowModal(true);
                          }}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                          View Details
                        </button>
                        {(user?.role === 'admin' || user?.role === 'teacher') && (
                          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            View Results
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No completed exams</h3>
                    <p className="text-sm">No exams have been completed yet.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div>
              {results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Exam
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marks
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Percentage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => {
                        const exam = exams.find(e => e.id === result.examId);
                        return (
                          <tr key={result.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary-600">
                                      {result.studentName.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                                  <div className="text-sm text-gray-500">Roll: {result.rollNumber}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{exam?.title}</div>
                              <div className="text-sm text-gray-500">{exam?.subject}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {result.marksObtained}/{result.totalMarks}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {result.percentage.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm font-medium ${getGradeColor(result.grade)}`}>
                                {result.grade}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              #{result.rank}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results available</h3>
                    <p className="text-sm">Exam results will appear here once published.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Exam Details Modal */}
      {showModal && selectedExam && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Exam Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedExam.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExamTypeColor(selectedExam.examType)}`}>
                      {selectedExam.examType.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedExam.status)}`}>
                      {selectedExam.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="text-sm text-gray-900">{selectedExam.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class</label>
                    <p className="text-sm text-gray-900">{selectedExam.class}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-sm text-gray-900">{new Date(selectedExam.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <p className="text-sm text-gray-900">{selectedExam.time}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-sm text-gray-900">{selectedExam.duration} minutes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                    <p className="text-sm text-gray-900">{selectedExam.totalMarks}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Venue</label>
                    <p className="text-sm text-gray-900">{selectedExam.venue}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Invigilator</label>
                    <p className="text-sm text-gray-900">{selectedExam.teacher}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-900">{selectedExam.instructions}</p>
                  </div>
                </div>
              </div>

              {(user?.role === 'admin' || user?.role === 'teacher') && selectedExam.status === 'upcoming' && (
                <div className="mt-6 flex space-x-3">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    Edit Exam
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Cancel Exam
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

export default Exams;
