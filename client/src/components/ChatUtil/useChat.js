import { useEffect, useRef, useState ,useContext} from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store"

import PlayerContext from "../../store/player-context";
const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
const PLAY_SONG = "PLAY_SONG";
const SOCKET_SERVER_URL = "http://www.beatzz.tech:3004";


const useChat = (roomId,mode,pass) => {
  const playerCtx = useContext(PlayerContext)
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState();
  const [invitecode, setInvitecode] = useState();
  const socketRef = useRef();
  //const { u } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const state = store.getState()
      
      console.log(state)
      const response = await axios.get("https://api.randomuser.me/");
      const result = response.data.results[0];
      var uname = result.username;
      if(state.user.user){
        uname = state.user.user.username;
      }
      
      setUser({
        name: uname,
        picture: result.picture.thumbnail,
      });
    };

    fetchUser();
  }, []);


  /*useEffect(() => {
    const fetchCode = async () => {
      const state = store.getState()
      //console.log(state)
      const response = await axios.get("http://www.beatzz.tech:3004/rooms/"+roomId+"/invitecode");
      const result = response.data;
      
      setInvitecode(result);
    };

    fetchCode();
  }, []);*/

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${SOCKET_SERVER_URL}/rooms/${roomId}/users`
      );
      const result = response.data.users;
      
      console.log(result.username)
      setUsers(result);
    };

    fetchUsers();
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `${SOCKET_SERVER_URL}/rooms/${roomId}/messages`
      );
      const result = response.data.messages;
      setMessages(result);
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (!user) {
      return;
    }
   if(mode=="create"){
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, name: user.name, picture: user.picture, password:"", create: true },
    });
  }else if(mode=="createPrivate"){
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, name: user.name, picture: user.picture, password:pass, create: true },
    });
  }else{
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, name: user.name, picture: user.picture,password:"", create: false },
    });
  }
    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
      if (user.id === socketRef.current.id) return;
      setUsers((users) => [...users, user]);
    });

    socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
      setUsers((users) => users.filter((u) => u.id !== user.id));
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(START_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => [...users, user]);
      }
    });

    socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => users.filter((u) => u.name !== user.name));
      }
    });

    socketRef.current.on(PLAY_SONG, (song) => {
      console.log("PLAY SONG:")
      console.log(song)
      axios.get('http://www.beatzz.tech:3002/songs/get-image/'+ song._id,{
			responseType: 'arraybuffer'
		}).then((response) => {
			let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
			let srcValue = "data:image/png;base64,"+base64ImageString;
			
      //const audio = document.getElementById('audio')
			
			playerCtx.playSong(song, srcValue, null, null);
      //audio.play();
			})

      

    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user]);

  const sendMessage = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      user: user,
    });
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(START_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user,
    });
  };

  return {
    messages,
    user,
    users,
    typingUsers,
    //invitecode,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  };
};

export default useChat;
