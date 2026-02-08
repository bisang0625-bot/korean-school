import { createContext, useContext, useState, useEffect } from 'react';
import { loadConfig, getDefaultConfig } from '../utils/configLoader';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(getDefaultConfig());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function initConfig() {
            try {
                const loadedConfig = await loadConfig();
                setConfig(loadedConfig);
            } catch (error) {
                console.error('Failed to load config:', error);
            } finally {
                setIsLoading(false);
            }
        }
        initConfig();
    }, []);

    const value = {
        config,
        isLoading,
        // Helper getters
        getSchoolName: (lang = 'ko') => config.schoolName?.[lang] || config.schoolName?.ko,
        getAcademicYear: () => config.academicYear,
        getTeacherPassword: () => config.teacherPassword,
        getClasses: () => config.classes || [],
        getGroups: () => config.groups || [],
        getTeacherEmail: () => config.teacherEmail,
        getGroups: () => config.groups,
        getDefaultColor: () => config.defaultColor || '#E91E63',
        config // Expose full config for flexible access
    };

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}
