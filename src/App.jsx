import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ConfigProvider } from './context/ConfigContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import News from './pages/News';
import Calendar from './pages/Calendar';
import Market from './pages/Market';
import Settings from './pages/Settings';
import GroupDetail from './pages/GroupDetail';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TeacherHome from './pages/TeacherHome';
import StudentManagement from './pages/StudentManagement';
import './App.css';

function App() {
    return (
        <ConfigProvider>
            <LanguageProvider>
                <AuthProvider>
                    <Router>
                        <div className="app-container">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/market" element={<Market />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/group/:id" element={<GroupDetail />} />
                                <Route path="/help" element={<HelpPage />} />
                                <Route path="/privacy" element={<PrivacyPage />} />
                                <Route path="/teacher" element={<TeacherHome />} />
                                <Route path="/teacher/students" element={<StudentManagement />} />
                            </Routes>
                            <BottomNav />
                        </div>
                    </Router>
                </AuthProvider>
            </LanguageProvider>
        </ConfigProvider>
    );
}

export default App;
