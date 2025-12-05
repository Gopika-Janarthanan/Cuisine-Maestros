import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if we are on the home page to apply transparent behavior
    const isHome = location.pathname === '/';

    return (
        <nav
            style={{
                padding: '1.5rem 0',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: isScrolled || !isHome ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: (isScrolled || !isHome) ? 'blur(10px)' : 'none',
                borderBottom: (isScrolled || !isHome) ? '1px solid var(--border-color)' : 'none',
                transition: 'var(--transition)',
                boxShadow: (isScrolled || !isHome) ? 'var(--shadow-sm)' : 'none'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <img src={logo} alt="Cuisine Maestros" style={{ height: '40px', width: 'auto' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                        Cuisine Maestros
                    </span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Home
                    </Link>
                    <Link to="/chefs" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Find a Chef
                    </Link>
                    <Link to="/user-dashboard" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        My Bookings
                    </Link>
                    <Link to="/chef-dashboard" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Chef Panel
                    </Link>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem' }}>
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
