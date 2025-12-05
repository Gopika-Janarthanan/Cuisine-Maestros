import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);

            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/user/${user.id}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
            setLoading(false);
        };

        fetchBookings();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-500';
            case 'CONFIRMED': return 'text-green-500';
            case 'REJECTED': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '3rem' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>You haven't made any bookings yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {bookings.map(booking => (
                            <div key={booking.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Chef {booking.chef?.user?.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        {new Date(booking.bookingTime).toLocaleString()} • {booking.numberOfGuests} Guests
                                    </p>
                                    {booking.specialRequests && (
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                            Note: {booking.specialRequests}
                                        </p>
                                    )}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        fontWeight: '700',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '1rem',
                                        backgroundColor: booking.status === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.1)' :
                                            booking.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.1)' :
                                                'rgba(245, 158, 11, 0.1)',
                                        color: booking.status === 'CONFIRMED' ? '#10B981' :
                                            booking.status === 'REJECTED' ? '#EF4444' :
                                                '#F59E0B'
                                    }}>
                                        {booking.status}
                                    </span>
                                    {booking.status === 'CONFIRMED' && (
                                        <div style={{ marginTop: '1rem' }}>
                                            <button
                                                onClick={async () => {
                                                    const score = prompt("Rate this chef (1-5):");
                                                    if (score && score >= 1 && score <= 5) {
                                                        const comment = prompt("Leave a comment (optional):");
                                                        const user = JSON.parse(localStorage.getItem('user'));
                                                        try {
                                                            await axios.post('http://localhost:8080/api/ratings', {
                                                                userId: user.id,
                                                                chefId: booking.chef.id, // Ensure booking has chef.id
                                                                score: parseInt(score),
                                                                comment: comment || ''
                                                            });
                                                            alert('Rating submitted successfully!');
                                                        } catch (err) {
                                                            alert('Failed to submit rating.');
                                                            console.error(err);
                                                        }
                                                    } else if (score) {
                                                        alert("Please enter a valid score (1-5)");
                                                    }
                                                }}
                                                className="btn btn-outline"
                                                style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
                                            >
                                                Rate Chef
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
