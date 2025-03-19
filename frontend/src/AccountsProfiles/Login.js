import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountToken } from "../api";
import './Login.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State to store error messages


    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const body =
            {
                username: username,
                password: password,
            };
            await getAccountToken(body);
            navigate('/profiles');
        } catch (error) {
            setError("Login failed!");
        }

    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    autoCapitalize="none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleLogin}>Login</button>
                {error && <div className="error-message">
                    {error}
                </div>}
            </div>
        </div>
    );
};

export default Login;
