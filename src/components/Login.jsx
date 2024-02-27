import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login/', { username, password });
            console.log(response.data);
            if (response.data.message === "User logged in successfully") {
                alert("Login successful!");
            } else {
                alert("Login failed!");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during login.");
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
            <input style={inputStyle} type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input style={inputStyle} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button style={buttonStyle} onClick={login}>Login</button>
        </div>
    );
}

export default Login;
