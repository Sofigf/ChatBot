import { useState } from 'react';

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
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px', height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <div style={{ display: 'inline-block', padding: '10px', borderRadius: '4px', backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da' }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: '80%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button onClick={handleSendMessage} style={{ width: '18%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#007bff', color: '#fff', marginLeft: '2%' }}>
                    Send
                </button>
            </div>
        </div>
    );
}
