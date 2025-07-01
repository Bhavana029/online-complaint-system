import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatWindow.css';

const ChatWindow = (props) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  const fetchMessageList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessageList();
  }, [props.complaintId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const data = {
        name: props.name,
        message: messageInput,
        complaintId: props.complaintId
      };
      const response = await axios.post('http://localhost:8000/messages', data);
      setMessageList(prev => [...prev, response.data]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat-container shadow">
      <h2 className="chat-title">📩 Message Box</h2>

      <div className="message-window" ref={messageWindowRef}>
        {messageList.slice().reverse().map((msg) => (
          <div className={`message ${msg.name === props.name ? 'own' : 'other'}`} key={msg._id}>
            <p className="sender">{msg.name}:</p>
            <p className="text">{msg.message}</p>
            <p className="timestamp">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, 
              {' '}{new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <textarea
          className="form-control"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          rows={2}
        ></textarea>
        <button className="btn btn-primary mt-2 w-100" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
