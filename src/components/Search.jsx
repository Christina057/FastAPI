import React, { useState } from 'react';
import axios from 'axios';

const SearchFlights = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [flights, setFlights] = useState([]);

    const searchFlights = async () => {
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`;

        try {
            const response = await axios.get(`http://localhost:8000/search_flights/${formattedDate}/${time}`);
            console.log(response.data);
            if (response.data.flights.length > 0) {
                setFlights(response.data.flights);
                alert("Flights fetched successfully!");
            } else {
                alert("No flights found for this date and time!");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while searching for flights.");
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

    const flightStyle = {
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
            <input style={inputStyle} type="text" onChange={e => setDate(e.target.value)} placeholder="Date (DD-MM-YYYY)" />
            <input style={inputStyle} type="time" onChange={e => setTime(e.target.value)} />
            <button style={buttonStyle} onClick={searchFlights}>Search Flights</button>
            {flights.map((flight, index) => (
                <div key={index} style={flightStyle}>
                    <p>Flight Number: {flight.flight_number}</p>
                    <p>Departure Time: {flight.departure_time}</p>
                    <p>Arrival Time: {flight.arrival_time}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchFlights;
