import React, { useEffect, useState , useRef} from "react";

import "./ChatRoom.css";
import useChat from "../ChatUtil/useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../ChatUtil/useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";
import Users from "../Users/Users";
import UserAvatar from "../UserAvatar/UserAvatar";


const ChatRoom = (props) => {
  const { roomId , mode} = props.match.params;
  var pass = "";
  if(mode=="createPrivate") {pass = props.location.state.password;}
  
  //console.log(props)
  const {
    messages,
    user,
    users,
    typingUsers,
    //inviteCode,
    sendMessage,
    startTypingMessage,
    stopTypingMessage
  } = useChat(roomId,mode,pass);
  const [newMessage, setNewMessage] = useState("");

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);
/* {mode=="createPrivate" && <h3 className="room-name">InviteLink: {inviteCode}</h3>}*/
  return (
    <div className="chat-room-container">
      <div className="chat-room-top-bar">
        <h2 className="room-name">Room name: {roomId}</h2>
       
        {user && <UserAvatar user={user}></UserAvatar>}
      </div>
      <Users users={users}></Users>
      <div className="messages-container">
        <ol id="messageList" className="messages-list">
          {messages.map((message, i) => (
            <li key={i}>
              <ChatMessage message={message}></ChatMessage>
              <AlwaysScrollToBottom/>
            </li>
          ))}
          {typingUsers.map((user, i) => (
            <li key={messages.length + i}>
              <TypingMessage user={user}></TypingMessage>
            </li>
          ))}
        </ol>
      </div>
      <NewMessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleStartTyping={startTyping}
        handleStopTyping={stopTyping}
        handleSendMessage={handleSendMessage}
      ></NewMessageForm>
    </div>
  );
};

export default ChatRoom;
