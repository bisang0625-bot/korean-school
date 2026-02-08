import { NavLink } from 'react-router-dom';
import { Home, Newspaper, Calendar, Settings, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';

export default function BottomNav() {
    const { t } = useLanguage();

    const navItems = [
        { to: '/', icon: Home, labelKey: 'nav.home' },
        { to: '/news', icon: Newspaper, labelKey: 'nav.news' },
        { to: '/market', icon: ShoppingBag, labelKey: 'nav.market' },
        { to: '/calendar', icon: Calendar, labelKey: 'nav.calendar' },
        { to: '/settings', icon: Settings, labelKey: 'nav.settings' }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(({ to, icon: Icon, labelKey }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <Icon size={24} strokeWidth={2} />
                    <span className="nav-label">{t(labelKey)}</span>
                </NavLink>
            ))}
        </nav>
    );
}
