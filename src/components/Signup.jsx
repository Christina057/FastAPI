import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/signup/', { username, password });
            console.log(response.data);
            if (response.data.message === "User signed up successfully") {
                alert("Sign up successful!");
            } else {
                alert("Sign up failed!");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during sign up.");
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
            <button style={buttonStyle} onClick={signUp}>Sign Up</button>
        </div>
    );
}

export default SignUp;
