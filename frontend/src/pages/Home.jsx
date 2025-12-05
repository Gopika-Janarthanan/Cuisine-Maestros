import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedChefs = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        const fetchChefs = async () => {
            try {
                // Fetch all and take top 3 (Mocking 'top rated' by taking first 3)
                const response = await axios.get('http://localhost:8080/api/chefs');
                setChefs(response.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching chefs", error);
            }
        };
        fetchChefs();
    }, []);

    if (chefs.length === 0) return null;

    return (
        <section style={{ padding: '5rem 0', background: 'var(--surface-color)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Top Rated Chefs</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Discover local culinary talent</p>
                    </div>
                    <Link to="/chefs" style={{ color: 'var(--primary-color)', fontWeight: '600', background: 'none' }}>View all chefs &rarr;</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {chefs.map(chef => (
                        <div key={chef.id} className="card">
                            <div style={{ height: '200px', borderRadius: '0.5rem', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${chef.user?.name}&background=1E3A8A&color=fff&size=200`}
                                    alt={chef.user?.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{chef.user?.name}</h3>
                            <p style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontWeight: '500' }}>{chef.cuisineSpecialty}</p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {chef.bio || "Experience culinary excellence."}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '700' }}>₹ {chef.hourlyRate} / hour</span>
                                <Link to={`/chef/${chef.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>View Profile</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '600px' }} className="animate-fade-in">
                        <h1 style={{
                            fontSize: '4rem',
                            marginBottom: '1.5rem',
                            backgroundImage: 'linear-gradient(to right, #1E3A8A, #3B82F6)', /* Navy to Blue */
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Taste the Extraordinary
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '2.5rem',
                            lineHeight: 1.8
                        }}>
                            Book private chefs for your special occasions. From intimate dinners to grand parties, experience culinary excellence at home.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                Find a Chef
                            </button>
                            <button className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                How it Works
                            </button>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(30, 58, 138, 0.1) 0%, rgba(255, 255, 255, 0) 70%)', /* Navy Blue tint */
                    borderRadius: '50%',
                    zIndex: 1
                }}></div>
            </section>

            {/* Featured Chefs Preview (Real Data) */}
            <FeaturedChefs />
        </div>
    );
};

export default Home;
