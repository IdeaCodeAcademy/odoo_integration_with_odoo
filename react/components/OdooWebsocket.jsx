import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        // Function to extract session ID from browser's storage
        const getSessionId = () => {
            // Your logic to get the session ID from where it's stored (e.g., localStorage, sessionStorage)
            // For example:
            const storedSessionId = sessionStorage.getItem('session_id');
            return storedSessionId;
        };

        // Get session ID
        const sessionId = getSessionId();
        setSessionId(sessionId);

        // Create a new WebSocket connection with session ID included as a URL parameter
        const socket = new WebSocket('ws://localhost:8069/websocket');

        socket.onopen = function (event) {
            console.log('WebSocket connection opened:', event);
            socket.send(JSON.stringify({ "event_name": "subscribe", "data": { 'channels': [], 'last': 2000 } }));
        };

        socket.onerror = function (error) {
            console.error('WebSocket error:', error);
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.error('WebSocket connection abruptly closed');
            }
        };

        // Define what to do when a message is received from the WebSocket server
        socket.onmessage = (event) => {
            setMessage(event.data);
            console.log(event.data)
        };

        // Clean up the WebSocket connection when the component is unmounted
        return () => {
            socket.close();
        };
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div>
            <h1>WebSocket Listener</h1>
            <p>Session ID: {sessionId}</p>
            <p>Received message: {message}</p>
        </div>
    );
};

export default WebSocketComponent;
