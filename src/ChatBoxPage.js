// ChatBoxPage.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatBoxPage.css'; 



const ChatBoxPage = () => {

  const [messages, setMessages] = useState([]);
  const [localMessages, setLocalMessages] = useState();
  const [serverMessages, setServerMessages] = useState();
  const inputRef = useRef(null)
  const chatBodyRef = useRef(null);

  const msisdn = localStorage.getItem("phonenumber")
  const username = localStorage.getItem("username")
  const [text, setText] = useState('')

  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(text)
  }
  const object={
    msisdn: msisdn,
    message : text,
  }
  const handleSendMessageAndFocus = () => {
    handleSendMessage();
    fetchMessage(object);
    setText('');
    inputRef.current.focus();
  }
  const handleSendMessage = () => {
    if (text.trim() !== '') {
      const newMessage = {
        text: text.trim(),
        sender: 'You'
        
      };
            
       setLocalMessages(newMessage)
      
      };
    
  };
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const fetchMessage = (data) => {
    // fetch("http://127.0.0.1:5000/frontend",{method:"POST",
    fetch("http://13.53.46.28:5000/frontend",{method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  } ) 
    .then(response => {
      return response.json()
      // console.log(response.json() )
    }).then(result => {
      console.log(result)
      const newMessage = {
        text:result.message,
        sender: 'server' 
      };
            
      setServerMessages(newMessage)

    })
    .catch(error => {
      console.error('Error fetching data', error)
    })
  }

  useEffect(() => {
    if (localMessages) {
      setMessages(prevMessages => [...prevMessages, localMessages]);
    }
  }, [localMessages]);

  useEffect(() => {
    if (serverMessages) {
      setMessages(prevMessages => [...prevMessages, serverMessages]);
    }
  }, [serverMessages]);

  return (
    <div className="chat-box-page">
      {/* Top bar */}
      <div className="top-bar">
        <p>{username}</p>
        <p>{msisdn}</p> 
      </div>

      {/* Body */}
      <div className="chat-body" ref={chatBodyRef}>
        <p className="message message-text" >Welcome to our dating service with 6000 potential dating partners!
        To register SMS start#name#age#gender#county#town to 22141.
        e.g., start#John Doe#26#Male#Nakuru#Naivasha
        </p>
        {messages.map((message, index) => (
            <div key={index} className="message" >  
            <span className="sender">{message.sender}: </span>
            <span className="message-text">{message.text}</span>
          </div>
        ))}
       
      </div>

      {/* Bottom Input Area */}
      <div className="bottom-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={handleTextChange}
          ref={inputRef}
        />
        <button onClick={handleSendMessageAndFocus}>Send</button>
      </div>
    </div>
  );
};

export default ChatBoxPage;
