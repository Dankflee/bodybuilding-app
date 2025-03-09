import { useState, useEffect, useRef } from 'react';

export default function AIAdvice() {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const abortControllerRef = useRef(null);

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('fitnessChats');
    if (savedChats) setChats(JSON.parse(savedChats));
  }, []);

  // Save chats to localStorage on update
  useEffect(() => {
    localStorage.setItem('fitnessChats', JSON.stringify(chats));
  }, [chats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userQuestion = input;
      
      // Add user question immediately
      setChats(prev => [...prev, {
        type: 'question',
        content: userQuestion,
        timestamp: new Date().toISOString()
      }]);

      // Initialize streaming
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion }),
        signal
      });

      if (!response.ok) throw new Error('API request failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;
        setStreamedResponse(aiResponse);
      }

      // Add final AI response to chat history
      setChats(prev => [...prev, {
        type: 'answer',
        content: aiResponse,
        timestamp: new Date().toISOString()
      }]);

    } catch (error) {
      if (error.name !== 'AbortError') {
        setChats(prev => [...prev, {
          type: 'error',
          content: 'Failed to get response. Please try again.',
          timestamp: new Date().toISOString()
        }]);
      }
    } finally {
      setIsLoading(false);
      setStreamedResponse('');
      setInput('');
      abortControllerRef.current = null;
    }
  };

  const handleClearChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setChats([]);
    localStorage.removeItem('fitnessChats');
  };

  return (
    <div className="advice-container">
      <div className="chat-history">
        {chats.map((chat, index) => (
          <div key={index} className={`chat-bubble ${chat.type}`}>
            <div className="chat-header">
              {chat.type === 'question' ? 'Your Question' : 'AI Advice'}
              <span className="timestamp">
                {new Date(chat.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="chat-content">
              {chat.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-bubble answer">
            <div className="chat-header">AI Advice</div>
            <div className="chat-content">
              {streamedResponse}
              <span className="typing-indicator">...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your fitness goals..."
          disabled={isLoading}
        />
        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Get Advice'}
          </button>
          <button 
            type="button" 
            onClick={handleClearChat}
            disabled={chats.length === 0 && !isLoading}
          >
            Clear Chat
          </button>
        </div>
      </form>
    </div>
  );
}