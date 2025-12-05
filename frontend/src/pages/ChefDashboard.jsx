import { useState, useEffect } from 'react';
import axios from 'axios';

const ChefDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);

        // First fetch chef profile ID using user ID (Assuming we stored it or fetch it)
        // For simplicity, we assume the chef ID matches user ID or we fetch user's chef profile
        // Currently our backend getChefBookings needs a Chef ID. 
        // Let's assume for this MVP that we need to fetch the Chef entity for this user first.
        // We'll quickly add a fetch logic or assume the chefId is known. 
        // A better way: The login response should ideally return chefId if the user is a chef.

        // Quick fix: Loop through all chefs to find the one matching current user (Not efficient but works for MVP)
        try {
            const chefsRes = await axios.get('http://localhost:8080/api/chefs');
            const myChefProfile = chefsRes.data.find(c => c.user.id === user.id);

            if (myChefProfile) {
                const bookingsRes = await axios.get(`http://localhost:8080/api/bookings/chef/${myChefProfile.id}`);
                setBookings(bookingsRes.data);
            }
        } catch (error) {
            console.error("Error loading dashboard", error);
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/bookings/${bookingId}/status`, { status: newStatus });
            // Refresh list
            fetchBookings();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '3rem' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Chef Dashboard</h1>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {bookings.map(booking => (
                        <div key={booking.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem' }}>{booking.user?.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{booking.user?.email}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        color: booking.status === 'CONFIRMED' ? '#10B981' :
                                            booking.status === 'REJECTED' ? '#EF4444' :
                                                '#F59E0B'
                                    }}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: 'var(--bg-color)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1rem'
                            }}>
                                <p><strong>Date:</strong> {new Date(booking.bookingTime).toLocaleString()}</p>
                                <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                                {booking.specialRequests && <p><strong>Request:</strong> {booking.specialRequests}</p>}
                            </div>

                            {booking.status === 'PENDING' && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                        className="btn"
                                        style={{ backgroundColor: '#10B981', color: 'white', flex: 1 }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(booking.id, 'REJECTED')}
                                        className="btn"
                                        style={{ backgroundColor: '#EF4444', color: 'white', flex: 1 }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {bookings.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            No booking requests yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChefDashboard;
