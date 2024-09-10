import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import Message from './Message';

const ChatBox = ({
  chatBox,
  setChatBox,
  theme,
  chatUser,
  user,
  groupId
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const containerRef = useRef(null);
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    fetchMessages(); // Initial fetch
  }, [groupId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:4444/messages/group/${groupId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.log(error.response?.data || "Error fetching messages");
    }
  };

  useEffect(() => {
    if (!isUserScrolling) {
      const container = containerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, isUserScrolling]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsUserScrolling(!isAtBottom);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleLike = async (messageId) => {
    try {
      await axios.post(`http://localhost:4444/messages/${messageId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMessages(); // Re-fetch messages to update likes
    } catch (error) {
      toast.error("Error liking message");
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(
        `http://localhost:4444/messages/send`,
        { 
          groupId: groupId,
          content: newMessage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMessages(); // Add new message to the state
      setNewMessage(""); // Clear the input field
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  return (
    <div
      id="chatbox"
      className="chat-box"
      style={{
        left: chatBox,
        color: theme ? "#eff2f7" : "#343a40",
        backgroundColor: theme ? "#262e35" : "#ffffff",
        display: chatBox === "100vw" ? "none" : "block",
        position: "relative",
      }}
    >
      <div className="chatbox-chat p-4" ref={containerRef} style={{ width: "100%", zIndex: 10, overflowY: "scroll" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          {messages.length > 0 ? messages?.map((message) => {
            const isCurrentUser = message?.sender?._id === chatUser?._id;
            return (
              <Message
                key={message._id}
                content={message.content}
                left={!isCurrentUser}
                sentAt={message.timestamp}
                user={chatUser}
                theme={theme}
                chatUser={message.sender}
                likes={message.likes}
                onLike={() => handleLike(message._id)}
              />
            );
          }):<p>no messsages</p>}
        </div>
      </div>
      <div className="chatbox-input d-flex p-2" style={{ borderTop: "1px solid #ddd", position: "absolute", bottom: "0", width: "100%" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ marginLeft: "10px", padding: "10px 15px", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
