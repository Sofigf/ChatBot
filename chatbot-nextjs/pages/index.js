import { useState } from 'react';
import Image from 'next/image'; // Importing Image component for better performance

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: 'user', text: input }]);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: data.response }]);
        setInput('');
    };

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundImage: 'url(/bg.jpg)', // Set the background image
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed',
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '600px', 
                padding: '20px', 
                borderRadius: '20px', 
                backdropFilter: 'blur(10px)', // Apply glassmorphism blur
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Optional shadow for better depth
                border: '1px solid rgba(255, 255, 255, 0.3)', // Border for glass effect
            }}>
                <div style={{ 
                    height: '400px', 
                    overflowY: 'scroll', 
                    padding: '10px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slightly transparent white background inside chat
                    borderRadius: '10px',
                }}>
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                display: 'flex', 
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', 
                                marginBottom: '10px',
                            }}
                        >
                            <div style={{ 
                                maxWidth: '70%', 
                                padding: '10px', 
                                borderRadius: '15px', 
                                backgroundColor: msg.sender === 'user' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', 
                                color: msg.sender === 'user' ? '#000' : '#fff', // Different text colors
                                backdropFilter: 'blur(10px)', // Glass effect for bubbles
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Shadow for depth
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ 
                            flex: '1', 
                            padding: '10px', 
                            borderRadius: '10px', 
                            border: '1px solid #ccc', 
                            backdropFilter: 'blur(5px)', // Slight blur on input
                        }}
                    />
                    <button 
                        onClick={handleSendMessage} 
                        style={{ 
                            marginLeft: '10px', 
                            padding: '10px 20px', 
                            borderRadius: '10px', 
                            border: 'none', 
                            backgroundColor: '#007bff', 
                            color: '#fff', 
                            cursor: 'pointer', 
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Button shadow for depth
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
