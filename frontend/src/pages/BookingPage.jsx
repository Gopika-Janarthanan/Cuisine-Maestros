import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
    const { chefId } = useParams();
    const navigate = useNavigate();
    const [chef, setChef] = useState(null);
    const [formData, setFormData] = useState({
        bookingTime: '',
        numberOfGuests: 2,
        specialRequests: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Fetch chef details
        axios.get(`http://localhost:8080/api/chefs/${chefId}`)
            .then(res => setChef(res.data))
            .catch(err => console.error(err));
    }, [chefId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userStr);

        try {
            await axios.post('http://localhost:8080/api/bookings', {
                userId: user.id,
                chefId: chefId,
                bookingTime: formData.bookingTime, // Ensure this format matches backend LocalDateTime
                numberOfGuests: formData.numberOfGuests,
                specialRequests: formData.specialRequests
            });
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError('Booking failed. Please try again.');
            console.error(err);
        }
    };

    if (!chef) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '3rem' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem' }}>Book {chef.user?.name}</h2>

                    {success ? (
                        <div style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: '#10B981',
                            padding: '2rem',
                            borderRadius: '0.5rem',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ marginBottom: '1rem' }}>Booking Request Sent!</h3>
                            <p>The chef will review your request shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Date & Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={formData.bookingTime}
                                    onChange={e => setFormData({ ...formData, bookingTime: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: '#fff',
                                        color: 'var(--text-primary)',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Number of Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    required
                                    value={formData.numberOfGuests}
                                    onChange={e => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: '#fff',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Special Requests / Menu Preferences</label>
                                <textarea
                                    rows="4"
                                    value={formData.specialRequests}
                                    onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: '#fff',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            {error && <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{error}</p>}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
                                Confirm Booking Request
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
