import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Projects from './pages/Projects/Projects';
import Tasks from './pages/Tasks/Tasks';
import Timesheets from './pages/Timesheets/Timesheets';
import Leaves from './pages/Leaves/Leaves';
import Expenses from './pages/Expenses/Expenses';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/employees" element={
                    <ProtectedRoute><Employees /></ProtectedRoute>
                } />
                <Route path="/projects" element={
                    <ProtectedRoute><Projects /></ProtectedRoute>
                } />
                <Route path="/tasks" element={
                    <ProtectedRoute><Tasks /></ProtectedRoute>
                } />
                <Route path="/timesheets" element={
                    <ProtectedRoute><Timesheets /></ProtectedRoute>
                } />
                <Route path="/leaves" element={
                    <ProtectedRoute><Leaves /></ProtectedRoute>
                } />
                <Route path="/expenses" element={
                    <ProtectedRoute><Expenses /></ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

