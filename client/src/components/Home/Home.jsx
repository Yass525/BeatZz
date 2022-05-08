import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = useState("");

  const [room2, setRoom2] = useState("");

  const [pass2, setPass2] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  const handleRoom2Change = (event) => {
    setRoom2(event.target.value);
  };

  const handlePass2Change = (event) => {
    setPass2(event.target.value);
  };

  return (
    <div className="home-container">
      <h3>Join a public room</h3>
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/chat/${roomName}/create`} className="enter-room-button">
        Join public room
      </Link>
      <h2>Or</h2>
      <h3>Create your own room</h3>
      <input
        type="text"
        placeholder="Room"
        value={room2}
        onChange={handleRoom2Change}
        className="text-input-field"
      />
      <input
        type="text"
        placeholder="Password"
        value={pass2}
        onChange={handlePass2Change}
        className="text-input-field"
      />
      <Link to={{
        pathname:`/chat/${room2}/createPrivate`,
        state:{password:pass2}
        }}  className="enter-room-button">
        Create
      </Link>
      <h2>Or</h2>
      <h3>Ask your friends for a invite code</h3>
      
    </div>
  );
};

export default Home;