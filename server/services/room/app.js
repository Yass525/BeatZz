const express = require('express')
const morgan = require ('morgan')
const Member = require('./util/Member.js')
const randomstring = require("randomstring");
const http = require("http");

const cors = require("cors");
const socketIo = require("socket.io");
const axios = require("axios");
const { addUser, removeUser, getUsersInRoom } = require("./users");
const { addMessage, getMessagesInRoom } = require("./messages");


require('dotenv').config({ path: '../../.env' })

require('../../db')

//Each Room is an array of Members
var rooms = []; //Array of Rooms
var roomNames = []; //Array of Room Names
var roomPasswords = []; //Array of Room Passwords
var roomInviteCodes = []; //parallel array to hold room invites

var publicRooms = []; //Array of Public Room Names for display purposes


const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/rooms/:roomId/users", (req, res) => {
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});

app.get("/rooms/:roomId/messages", (req, res) => {
  const messages = getMessagesInRoom(req.params.roomId);
  return res.json({ messages });
});

app.get("/rooms/:roomId/exist",(req,res)=>{
  if(roomExists(req.params.roomId)){
    return res.json({message:true})
  }else{
    return res.json({message:false})
  }
})


app.get("/rooms/:roomId/invitecode",(req,res)=>{
  if(roomExists(req.params.roomId)){
    i = rooms.indexOf(req.params.roomId);
    console.log("invite link sent: "+roomInviteCodes[i])
    return res.json(roomInviteCodes[i])
  }else{
    return res.json({message:"Room does not exist"})
  }
})

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
const PLAY_SONG = "PLAY_SONG";
const ROOM_ALREADY_EXIST = "ROOM_ALREADY_EXIST";
const INVALID_LINK = "INVALID_LINK"
const server = http.createServer(app);
//const Server = require("socket.io");

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
// console.log(socket.handshake.query)
  // Join a conversation
  const { roomId, name, picture ,password,create} = socket.handshake.query;
  user = null;
  /*if(roomExists(roomId)&&(create==false)){
    if(correctPassword(roomId,password)){
      socket.join(roomId);
      user = addUser(socket.id, roomId, name, picture);
      io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);
    console.log("Room alrady exists! user joined: "+name)
    console.log("Current Rooms: "+rooms)
    }else{
      console.log("Worng password !cannot join room: "+roomId)
    }
  }else if((!roomExists(roomId))&&(create=='true')){
    socket.join(roomId);
    rooms.push(roomId)
    roomPasswords.push(password)
    roomInviteCodes.push(generateInviteLink())
    user = addUser(socket.id, roomId, name, picture);
    io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);
    console.log("Room Created by user: "+name)
    console.log("Current Rooms: "+rooms)
    
  }else{
    console.log("Warning!")
  }*/
  /*if(!user)
  return;*/
  if(create=='true'&&roomExists(roomId)){
    socket.send(ROOM_ALREADY_EXIST)
  }
  if(!roomExists(roomId)){
    rooms.push(roomId)
    roomPasswords.push(password)
    roomInviteCodes.push(generateInviteLink())
    console.log("Room Created by user: "+name)
    console.log("Current Rooms: "+rooms)
  }else{
    console.log("Room alrady exists! user joined: "+name)
    console.log("Current Rooms: "+rooms)
  }
  socket.join(roomId);
  user = addUser(socket.id, roomId, name, picture);
  io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);
  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log("new message event: "+data)
    const message = addMessage(roomId, data);
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
    console.log("data")
    console.log(data)
    if(message.body == "!invite"){
      const message2 = addMessage(roomId, {body:"Invite link : "+ roomInviteCodes[rooms.indexOf(roomId)],systemMessage:true});
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message2);
    }

    if(message.body.indexOf("!play ") == 0){
      songname = message.body.slice(6)
      console.log("searching for song:"+songname)
      axios.get("http://localhost:3000/api/song/get-songs/"+songname).then(res=>{
        console.log(res.data);
        if(res.data.success){
          const message3 = addMessage(roomId, {body:"Now playing: "+res.data.songs[0].title,systemMessage:true});
          io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message3);
          io.in(roomId).emit(PLAY_SONG, res.data.songs[0]);
        }else{
          const message3 = addMessage(roomId, {body:"No song found with title: "+songname,systemMessage:true});
          io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message3);
         
        }
      })
    }
  });

  // Listen typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
    socket.leave(roomId);
    deleteRoom(roomId)
  });
});


function generateInviteLink(){
  url = "http://localhost:5000/cinvite/"
  u = randomstring.generate(7);
  while(roomInviteCodes.indexOf(u)!= -1){
    u = randomstring.generate(7);
  }
  return url+u;

}
function roomExists(id)  {
  for(const r in rooms){
    if(rooms[r] == id){
      return true;
    }
  }
  return false;
}

function correctPassword(id,pass){
  for(const r in rooms){
    if(rooms[r] == id){
      if(roomPasswords[r]==pass){
      return true;
      }else{
        return false;
      }
    }
  }
  return false;
}

function deleteRoom(id){
  const index = rooms.indexOf(id);
  if(index >= 0){
    console.log("Everyone left room "+id+" room has been deleted!")
    rooms.splice(index, 1);
    roomPasswords.splice(index, 1);
    roomInviteCodes.splice(index, 1);
  }
}




 const PORT =  3004

 server.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })

 
