import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatHistoryRef = useRef(null); // Reference to scroll to the bottom

  useEffect(() => {
    // Scroll to the bottom whenever a new message is added
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px', height: '400px', overflowY: 'scroll', backgroundColor: '#f0f0f0' }} ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '10px', borderRadius: '5px', backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da' }}>
              {msg.sender === 'user' && <span style={{ fontWeight: 'bold' }}>You:</span>}
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
          style={{ width: '80%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSendMessage} style={{ width: '18%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#007bff', color: '#fff', marginLeft: '2%' }}>
          Send
        </button>
      </div>
    </div>
  );
}