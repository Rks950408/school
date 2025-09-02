# School Management System - Frontend

A comprehensive React.js frontend for a School Management System built with modern web technologies.

## 🚀 Features

### Authentication & Authorization
- Role-based access control (Admin, Teacher, Student)
- JWT token-based authentication
- Protected routes with permission levels

### Dashboard
- Overview statistics for all metrics
- Recent activities timeline
- Role-specific content display

### Student Management
- View student profiles with admission status
- **Readmission functionality** for expired students
- Student search and filtering
- Admission tracking with expiry dates

### Fee Management
- Payment status tracking with due dates
- **Send WhatsApp reminders** for overdue fees
- Bulk reminder functionality
- Payment history and statistics

### Teacher Management
- Teacher profiles and assignments
- Class assignments and schedules
- Performance tracking

### Class Management
- Class scheduling and timetables
- Student enrollment tracking
- Capacity management

### Attendance Management
- Daily attendance marking
- Attendance statistics and reports
- Low attendance alerts

### Exam Management
- Exam scheduling and management
- Result publication and tracking
- Grade and rank calculations

### Notifications
- Real-time alerts for various events
- Fee due notifications
- Exam schedule alerts
- Attendance warnings
- Action-required notifications

## 🛠 Technology Stack

- **React.js 18** - Frontend framework
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.js              # Authentication component
│   ├── Layout.js             # Main layout with navigation
│   ├── Dashboard.js          # Dashboard overview
│   ├── Students.js           # Student management with readmission
│   ├── Teachers.js           # Teacher management
│   ├── Classes.js            # Class management
│   ├── Fees.js               # Fee management with reminders
│   ├── Attendance.js         # Attendance tracking
│   ├── Exams.js              # Exam and results management
│   ├── Notifications.js      # Notification center
│   └── ProtectedRoute.js     # Route protection component
├── context/
│   └── AuthContext.js        # Authentication context
├── utils/
│   └── api.js                # Axios configuration
├── App.js                    # Main app with routing
└── index.js                  # App entry point
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Dependencies are already installed**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - The app will automatically redirect to login

### Demo Credentials

| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| Admin   | admin@school.com         | admin123   |
| Teacher | teacher@school.com       | teacher123 |
| Student | student@school.com       | student123 |

## 🔐 Role-Based Access

### Admin
- Full access to all features
- Student readmission capabilities
- Teacher management
- Fee reminder functionality
- Attendance management

### Teacher
- Student management (view/edit)
- Attendance marking
- Exam management
- Class assignments

### Student
- View personal information
- Check fee status
- View attendance and results
- Access notifications

## 💡 Key Features Implemented

### Student Readmission System
- **Automatic status tracking**: Students are marked as expired when admission date passes
- **Readmission button**: Admin can re-enroll expired students
- **Readmission counter**: Tracks number of times student has been readmitted
- **Status indicators**: Visual status display (active/expired)

### Fee Management with Reminders
- **Payment status tracking**: Shows paid/unpaid/overdue status
- **Due date monitoring**: Automatic overdue detection
- **WhatsApp integration ready**: Send reminder functionality (mock implementation)
- **Bulk operations**: Send reminders to all overdue students
- **Payment statistics**: Total, paid, and pending amounts

### Notification System
- **Real-time alerts**: Fee dues, exam schedules, attendance warnings
- **Action-required notifications**: Interactive notifications with action buttons
- **Priority levels**: Critical, high, medium, low priority notifications
- **Mark as read functionality**: Individual and bulk read operations

## 🔄 API Integration

The frontend is designed to work with a REST API backend. All API calls are configured through:

- **Base URL**: `http://localhost:5000/api` (configurable via environment variables)
- **Authentication**: JWT tokens in Authorization headers
- **Error handling**: Automatic token refresh and logout on 401 errors

### Environment Variables

Create a `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 UI/UX Features

- **Modern design**: Clean, professional interface
- **Intuitive navigation**: Sidebar navigation with role-based menu items
- **Interactive elements**: Hover effects, loading states, and animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Status indicators**: Color-coded status badges and progress bars

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Mock Data

The application currently uses mock data for demonstration. In production:

1. Replace mock API calls in components with actual API endpoints
2. Update the `api.js` configuration with production URLs
3. Implement proper error handling for network failures

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting service

## 🔮 Future Enhancements

- Real-time notifications with WebSocket
- Advanced reporting and analytics
- Mobile app version
- Integration with payment gateways
- Advanced search and filtering
- Export functionality for reports
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This is the frontend implementation only. For the complete system, you'll need to implement the backend API with Node.js, Express, MongoDB, and WhatsApp integration as specified in the original requirements.
