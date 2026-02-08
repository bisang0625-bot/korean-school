// Configuration loader utility
// Loads config.json from public folder for runtime configuration

let cachedConfig = null;

export async function loadConfig() {
    if (cachedConfig) {
        return cachedConfig;
    }

    try {
        const response = await fetch('/config.json');
        if (!response.ok) {
            throw new Error('Failed to load config.json');
        }
        cachedConfig = await response.json();
        return cachedConfig;
    } catch (error) {
        console.error('Error loading config:', error);
        // Return default config as fallback
        return getDefaultConfig();
    }
}

export function getDefaultConfig() {
    return {
        schoolName: {
            ko: '암스테르담 한글학교',
            en: 'Amsterdam Korean School'
        },
        academicYear: '2025/2026',
        teacherPassword: '2026spring',
        classes: [
            { id: 1, name: '유치반', nameEn: 'Kindergarten', color: '#9C27B0' },
            { id: 2, name: '1학년', nameEn: 'Grade 1', color: '#FF9800' },
            { id: 3, name: '2학년', nameEn: 'Grade 2', color: '#4CAF50' }
        ],
        groups: [
            { id: 1, name: '전체 공지', nameEn: 'All Announcements', color: '#E91E63', icon: '📢' },
            { id: 2, name: '1학년', nameEn: 'Grade 1', color: '#FF9800', icon: '🎒' },
            { id: 3, name: '2학년', nameEn: 'Grade 2', color: '#4CAF50', icon: '📚' }
        ],
        teacherEmail: 'teacher@koreanschool.nl'
    };
}

// Synchronous getter for cached config (call loadConfig first)
export function getConfig() {
    return cachedConfig || getDefaultConfig();
}

// Clear cache (useful for testing or reloading)
export function clearConfigCache() {
    cachedConfig = null;
}
