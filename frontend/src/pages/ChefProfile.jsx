import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ChefProfile = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chefRes = await axios.get(`http://localhost:8080/api/chefs/${id}`);
                setChef(chefRes.data);

                const ratingsRes = await axios.get(`http://localhost:8080/api/ratings/chef/${id}`);
                setRatings(ratingsRes.data);
            } catch (error) {
                console.error("Error fetching chef data", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center', color: 'var(--text-primary)' }}>Loading profile...</div>;
    if (!chef) return <div style={{ paddingTop: '100px', textAlign: 'center', color: 'var(--text-primary)' }}>Chef not found</div>;

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '3rem' }}>
            <div className="container">
                {/* Profile Header */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '4px solid var(--primary-color)',
                            flexShrink: 0
                        }}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${chef.user?.name}&background=1E3A8A&color=fff&size=200`}
                                alt={chef.user?.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{chef.user?.name}</h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', fontWeight: '600', marginBottom: '1rem' }}>
                                {chef.cuisineSpecialty} Specialist
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '600px', lineHeight: 1.8 }}>
                                {chef.bio || "No bio available."}
                            </p>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>₹ {chef.hourlyRate}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}> / hour</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#F59E0B', fontSize: '1.5rem' }}>★</span>
                                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{chef.rating || "New"}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>({ratings.length} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <Link to={`/book/${chef.id}`} className="btn btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1.1rem' }}>
                            Book This Chef
                        </Link>
                    </div>
                </div>

                {/* Additional Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="card">
                        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Details</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <strong>Experience:</strong> {chef.experienceYears} Years
                            </li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <strong>Location:</strong> {chef.location}
                            </li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <strong>Availability:</strong> {chef.available ? 'Available Now' : 'Booked'}
                            </li>
                        </ul>
                    </div>
                    <div className="card">
                        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Recent Reviews</h3>
                        {ratings.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)' }}>No reviews yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {ratings.slice(0, 3).map(rating => (
                                    <div key={rating.id} style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{rating.user?.name}</span>
                                            <span style={{ color: '#F59E0B' }}>{'★'.repeat(rating.score)}</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{rating.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChefProfile;
