import React, { useState } from 'react';
import axios from 'axios';

const BookTicket = () => {
    const [userId, setUserId] = useState('');
    const [flightNumber, setFlightNumber] = useState('');

    const bookTicket = async () => {
        const flightData = { 
            user_id: parseInt(userId),
            flight_number: flightNumber
        };
        console.log("Sending data:", flightData);
        try {
            const response = await axios.post('http://localhost:8000/book_ticket/', flightData);
            console.log("Response data:", response.data);
            if (response.data.message === "Ticket booked successfully") {
                alert("Ticket booked successfully!");
            } else {
                alert("Failed to book ticket!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while booking the ticket.");
        }
    }    

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

    return (
        <div style={formStyle}>
            <input style={inputStyle} type="number" onChange={e => setUserId(e.target.value)} placeholder="User ID" />
            <input style={inputStyle} type="text" onChange={e => setFlightNumber(e.target.value)} placeholder="Flight Number" />
            <button style={buttonStyle} onClick={bookTicket}>Book Ticket</button>
        </div>
    );
}

export default BookTicket;
