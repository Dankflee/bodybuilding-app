import { useState } from 'react';

export default function AIAdvice() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a bodybuilding question..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Advice'}
        </button>
      </form>
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
}
