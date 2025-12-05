import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChefList = () => {
    const [chefs, setChefs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        cuisine: '',
        location: '',
    });

    useEffect(() => {
        fetchChefs();
    }, []);

    const fetchChefs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/chefs');
            setChefs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching chefs:', error);
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let url = 'http://localhost:8080/api/chefs/search?';
            if (filters.cuisine) url += `cuisine=${filters.cuisine}&`;
            if (filters.location) url += `location=${filters.location}&`;

            const response = await axios.get(url);
            setChefs(response.data);
        } catch (error) {
            console.error('Error searching chefs:', error);
        }
        setLoading(false);
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '3rem' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Find Your Personal Chef</h1>

                {/* Search Bar */}
                <div className="card" style={{ marginBottom: '3rem', padding: '1.5rem' }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <input
                                type="text"
                                placeholder="Cuisine (e.g., Italian)"
                                value={filters.cuisine}
                                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',

                                    backgroundColor: 'white',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <input
                                type="text"
                                placeholder="Location"
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',

                                    backgroundColor: 'white',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0 2rem' }}>
                            Search
                        </button>
                    </form>
                </div>

                {/* Results */}
                {loading ? (
                    <p>Loading amazing chefs...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {chefs.map(chef => (
                            <div key={chef.id} className="card">
                                <div style={{ height: '200px', backgroundColor: '#334155', borderRadius: '0.5rem', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${chef.user?.name}&background=random&size=200`}
                                        alt={chef.user?.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300?text=Chef'; }}
                                    />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{chef.user?.name || 'Chef'}</h3>
                                <p style={{ color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: '500' }}>{chef.cuisineSpecialty}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    📍 {chef.location} • {chef.experienceYears} Years Exp.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#F59E0B' }}>
                                    <span style={{ marginRight: '0.5rem' }}>★ {chef.rating || 'New'}</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        ({chef.rating ? 'Rated' : 'No ratings'})
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {chef.bio || 'No bio available.'}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-primary)' }}>₹ {chef.hourlyRate} / hour</span>
                                    <Link to={`/chef/${chef.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && chefs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        No chefs found matching your criteria. Try adjusting your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChefList;
