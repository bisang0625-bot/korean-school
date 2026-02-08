import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [role, setRole] = useState('parent'); // 'parent' or 'teacher'
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 선생님 인증 여부
    const [selectedClass, setSelectedClass] = useState(null); // 선택된 반
    const [user, setUser] = useState({
        name: '김민지',
        nameEn: { firstName: '', lastName: '' }, // English name fields
        email: 'minji.kim@email.com',
        phone: '',
        role: 'parent'
    });

    const switchToTeacher = (classInfo) => {
        setRole('teacher');
        setIsAuthenticated(true);
        setSelectedClass(classInfo);
        setUser(prev => ({ ...prev, role: 'teacher' }));
    };

    const switchToParent = () => {
        setRole('parent');
        setIsAuthenticated(false);
        setSelectedClass(null);
        setUser(prev => ({ ...prev, role: 'parent' }));
    };

    const changeClass = (classInfo) => {
        setSelectedClass(classInfo);
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <AuthContext.Provider value={{
            role,
            user,
            isAuthenticated,
            selectedClass,
            switchToTeacher,
            switchToParent,
            changeClass,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
