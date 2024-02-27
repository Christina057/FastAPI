import React, { useState } from 'react';
import axios from 'axios';

const AllBookings = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            console.log("Before request - Flight Number:", flightNumber);
            const response = await axios.get('http://localhost:8000/view_bookings/', { params: { flight: flightNumber } });
            console.log("Server Response:", response.data);
            if (response.data.bookings.length === 0) {
                console.log("No bookings found for this flight.");
            } else {
                console.log("Bookings:", response.data.bookings);
                console.log("First booking object:", response.data.bookings[0]);  // Add this line
            }
            setBookings(response.data.bookings);
            alert("Bookings fetched successfully!");
        } catch (error) {
            console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
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
            <input style={inputStyle} type="text" onChange={e => setFlightNumber(e.target.value)} placeholder="Flight Number" />
            <button style={buttonStyle} onClick={fetchBookings}>Fetch All Bookings</button>
            {bookings.map((booking, index) => {
                console.log(booking);  // Added this line
                return (
                    <div key={index} style={bookingStyle}>
                        <p>User ID: {booking.user_id}</p>
                        <p>Flight Number: {booking.flight_number}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default AllBookings;
