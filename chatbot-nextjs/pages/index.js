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
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#f2f2f2' }}> {/* Global Background */}
      {/* Optional: Background Image (External) */}
      <img src="public/bg.jpg" alt="Background Image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'blur(2px)', opacity: 0.2, z-index: -1 }} />

      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}> {/* Chat Box with Rounded Corners and Shadow */}
        <div style={{ border: 'none', borderRadius: '4px', padding: '15px', height: '400px', overflowY: 'scroll' }} ref={chatHistoryRef}>
          {messages.map((msg, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}> {/* Added Spacing Between Bubbles */}
              {msg.sender === 'user' && (
                <img src="public/user_icon.png" alt="User Icon" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
              )}
              {msg.sender === 'bot' && (
                <img src="public/bot_icon.png" alt="Bot Icon" style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '10px' }} />
              )}
              <div style={{ display: 'inline-block', padding: '10px', borderRadius: '5px', backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da' }}>
                {msg.sender === 'user' && <span style={{ fontWeight: 'bold' }}>You:</span>}
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '80%', padding: '10px', borderRadius: '15px', border: '1px solid #ccc' }}
          />
          <button onClick={handleSendMessage} style={{ width: '18%', padding: '10px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#007bff', color: '#fff', marginLeft: '2%' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}