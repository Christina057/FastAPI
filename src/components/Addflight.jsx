import React, { useState } from 'react';
import axios from 'axios';

const AddFlight = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [seats, setSeats] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const addFlight = async () => {
        const flightData = { 
            flight_number: flightNumber, 
            departure_time: departureTime,
            arrival_time: arrivalTime,      
            seats: parseInt(seats, 10) 
        };
        console.log(flightData);
        try {
            const response = await axios.post('http://localhost:8000/add_flight/', flightData);
            console.log(response.data);
            setSuccessMessage('Flight added successfully');
        } catch (error) {
            console.error(error);
            setSuccessMessage('Failed to add flight');
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
            <input style={inputStyle} type="text" onChange={e => setFlightNumber(e.target.value)} placeholder="Flight Number" />
            <input style={inputStyle} type="text" onChange={e => setDepartureTime(e.target.value)} placeholder="Departure Time" />
            <input style={inputStyle} type="text" onChange={e => setArrivalTime(e.target.value)} placeholder="Arrival Time" />
            <input style={inputStyle} type="number" onChange={e => setSeats(e.target.value)} placeholder="Seats" />
            <button style={buttonStyle} onClick={addFlight}>Add Flight</button>

            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default AddFlight;
