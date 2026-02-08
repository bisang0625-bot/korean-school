import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Phone, Mail, MoreVertical, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentsByClassId } from '../data/mockData';
import './StudentManagement.css';

export default function StudentManagement() {
    const navigate = useNavigate();
    const { role, selectedClass } = useAuth();
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: '', email1: '', email2: '' });

    useEffect(() => {
        if (selectedClass) {
            setStudents(getStudentsByClassId(selectedClass.id));
        }
    }, [selectedClass]);

    useEffect(() => {
        if (role !== 'teacher') {
            navigate('/');
        }
    }, [role, navigate]);

    if (role !== 'teacher') {
        return null;
    }

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.emails.some(email => email.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const handleAddStudent = () => {
        if (!newStudent.name.trim() || !newStudent.email1.trim()) {
            alert('이름과 이메일을 입력하세요.');
            return;
        }

        const emails = [newStudent.email1];
        if (newStudent.email2.trim()) {
            emails.push(newStudent.email2);
        }

        const student = {
            id: Date.now(),
            name: newStudent.name,
            emails,
            classId: selectedClass.id,
        };

        setStudents([...students, student]);
        setNewStudent({ name: '', email1: '', email2: '' });
        setIsAddModalOpen(false);
    };

    const handleEditStudent = (student) => {
        setEditingStudent({
            ...student,
            email1: student.emails[0] || '',
            email2: student.emails[1] || ''
        });
        setSelectedStudent(null);
    };

    const handleSaveEdit = () => {
        if (!editingStudent.name.trim() || !editingStudent.email1.trim()) {
            alert('이름과 이메일을 입력하세요.');
            return;
        }

        const emails = [editingStudent.email1];
        if (editingStudent.email2.trim()) {
            emails.push(editingStudent.email2);
        }

        setStudents(prev => prev.map(s => {
            if (s.id === editingStudent.id) {
                return {
                    ...s,
                    name: editingStudent.name,
                    emails
                };
            }
            return s;
        }));
        setEditingStudent(null);
    };

    const handleDeleteStudent = (studentId) => {
        if (confirm('정말 이 학생을 삭제하시겠습니까?')) {
            setStudents(prev => prev.filter(s => s.id !== studentId));
            setSelectedStudent(null);
        }
    };

    return (
        <div className="student-management">
            {/* Header */}
            <header className="management-header">
                <button className="back-btn" onClick={() => navigate('/teacher')}>
                    <ChevronLeft size={24} />
                </button>
                <div className="header-title">
                    <h1>학생 관리</h1>
                    <p>{selectedClass?.name || '반 선택 필요'}</p>
                </div>
                <button className="add-student-btn" onClick={() => setIsAddModalOpen(true)}>
                    <Plus size={22} />
                </button>
            </header>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-value total">{students.length}</span>
                    <span className="stat-label">전체 학생</span>
                </div>
            </div>

            {/* Search */}
            <div className="search-filter">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="이름 또는 이메일 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Student List */}
            <div className="student-list">
                {filteredStudents.map((student, index) => (
                    <div
                        key={student.id}
                        className="student-card fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="student-avatar">
                            <span>{student.name.charAt(0)}</span>
                        </div>
                        <div className="student-info">
                            <h3>{student.name}</h3>
                            <p className="student-emails">
                                {student.emails.slice(0, 2).map((email, i) => (
                                    <span key={i}>{email}</span>
                                ))}
                            </p>
                        </div>
                        <div className="student-actions">
                            <button
                                className="more-btn"
                                onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                            >
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        {/* Expanded Actions */}
                        {selectedStudent === student.id && (
                            <div className="student-expanded">
                                <button className="action-btn edit" onClick={() => handleEditStudent(student)}>
                                    <Edit2 size={16} />
                                    <span>수정</span>
                                </button>
                                <button className="action-btn delete" onClick={() => handleDeleteStudent(student.id)}>
                                    <Trash2 size={16} />
                                    <span>삭제</span>
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {filteredStudents.length === 0 && (
                    <div className="empty-state">
                        <p>학생이 없습니다.</p>
                        <button onClick={() => setIsAddModalOpen(true)}>학생 추가하기</button>
                    </div>
                )}
            </div>

            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="student-modal slide-up" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>학생 추가</h2>
                            <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>학생 이름</label>
                                <input
                                    type="text"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                    placeholder="홍길동"
                                />
                            </div>
                            <div className="form-group">
                                <label>이메일 1 (필수)</label>
                                <input
                                    type="email"
                                    value={newStudent.email1}
                                    onChange={(e) => setNewStudent({ ...newStudent, email1: e.target.value })}
                                    placeholder="parent@email.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>이메일 2 (선택)</label>
                                <input
                                    type="email"
                                    value={newStudent.email2}
                                    onChange={(e) => setNewStudent({ ...newStudent, email2: e.target.value })}
                                    placeholder="parent2@email.com"
                                />
                            </div>
                            <p className="email-hint">
                                학부모가 이 이메일로 가입하면 자녀가 이 반에 배정됩니다.
                            </p>
                            <button className="save-btn" onClick={handleAddStudent}>
                                <Save size={18} />
                                <span>저장</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Student Modal */}
            {editingStudent && (
                <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
                    <div className="student-modal slide-up" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>학생 정보 수정</h2>
                            <button className="modal-close" onClick={() => setEditingStudent(null)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>학생 이름</label>
                                <input
                                    type="text"
                                    value={editingStudent.name}
                                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>이메일 1 (필수)</label>
                                <input
                                    type="email"
                                    value={editingStudent.email1}
                                    onChange={(e) => setEditingStudent({ ...editingStudent, email1: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>이메일 2 (선택)</label>
                                <input
                                    type="email"
                                    value={editingStudent.email2}
                                    onChange={(e) => setEditingStudent({ ...editingStudent, email2: e.target.value })}
                                />
                            </div>
                            <button className="save-btn" onClick={handleSaveEdit}>
                                <Save size={18} />
                                <span>저장</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
