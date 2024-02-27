import React, { useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [username, setUsername] = useState('');
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        const cleanUsername = username.trim();
        console.log("Fetching bookings for username:", cleanUsername);

        try {
            const response = await axios.get(`http://localhost:8000/my_bookings/${cleanUsername}`);
            console.log("Server Response:", response);

            setBookings(response.data.bookings);

            if (response.data.bookings.length > 0) {
                alert("Bookings fetched successfully!");
            } else {
                alert("No bookings found for this username!");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while fetching the bookings.");
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '50px'
    };

    const inputStyle = {
        width: '200px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        width: '100px',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        backgroundColor: 'green',
        cursor: 'pointer'
    };

    const bookingStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    };

    return (
        <div style={formStyle}>
            <input style={inputStyle} type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <button style={buttonStyle} onClick={fetchBookings}>Fetch My Bookings</button>
            {bookings.map((booking, index) => (
                <div key={index} style={bookingStyle}>
                    <p>User ID: {booking.user_id}</p>
                    <p>Flight Number: {booking.flight_number}</p>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;
