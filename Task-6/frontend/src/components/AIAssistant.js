import React, { useState } from 'react';
import { askAIAgent } from '../services/api';
import './AIAssistant.css';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hello! I am the AI Admin Assistant. I can analyze the user database. Try asking "how many users?" or "average age?"' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMessage]);
        setQuery('');
        setIsLoading(true);

        try {
            const res = await askAIAgent(userMessage.text);
            if (res.success) {
                setMessages(prev => [...prev, { sender: 'ai', text: res.answer }]);
            } else {
                setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I ran into an error processing that.' }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I could not connect to the server.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`ai-fab ${isOpen ? 'open' : ''}`} onClick={() => !isOpen && setIsOpen(true)}>
                {!isOpen && <span className="ai-fab-icon">🤖 AI</span>}
            </div>

            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <h3>🤖 AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
                    </div>
                    <div className="ai-chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`ai-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <div className="ai-message ai">Typing...</div>}
                    </div>
                    <form className="ai-chat-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask me anything..."
                        />
                        <button type="submit" disabled={isLoading || !query.trim()}>Send</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
