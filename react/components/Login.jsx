import React, { useState } from 'react';
import axios from 'axios';

export  default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                jsonrpc: '2.0',
                params:{
                    login: "admin",
                    password: "admin"
                }
            });
            console.log('Login successful',response.data);
            if(response.data){
                const getHeadersResponse = await axios.post('/api/get-headers', {
                    jsonrpc: '2.0',
                    params:{}
                });
                console.log('Headers Response',getHeadersResponse.data);
            }

        } catch (error) {
            // Handle login error, e.g., display error message
            console.error('error:', error);
        }
    };

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleLogin}>
                {/*<div>*/}
                {/*    <label htmlFor="username">Username:</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        id="username"*/}
                {/*        value={username}*/}
                {/*        onChange={(e) => setUsername(e.target.value)}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <label htmlFor="password">Password:</label>*/}
                {/*    <input*/}
                {/*        type="password"*/}
                {/*        id="password"*/}
                {/*        value={password}*/}
                {/*        onChange={(e) => setPassword(e.target.value)}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}