import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${match.params.userId}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchMessages();
  }, [match.params.userId]);

  const sendMessage = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ receiver: match.params.userId, content });

    try {
      await axios.post('/api/messages', body, config);
      setContent('');
      fetchMessages();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map(message => (
          <li key={message._id}>
            <strong>{message.sender.name}</strong>: {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
