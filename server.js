const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const path = require("path");
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const axios = require("axios")
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(cors());
app.use(routes);

// Connect to the Mongo DB
mongoose
    // .connect("mongodb://localhost/greenpoint_test", {
      
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

io.sockets.on('connection', function (socket) {
  console.log("A user just connected");
  socket.emit("Welcome", {message:"Welcome to our site"})

  setInterval(() => getWeather(socket), 60000)

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })



  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });



})

const getWeather = async socket => {
  console.log("I'm getting the weather")
  socket.emit("Weather", "Here is the weather")
  // try {
  //   const res =await axios.get (
  //     "https://api.darksky.net/forecast/d9b62331cf144fc78ad5473806d97872/38.9072,-77.0369"

  //   );
   
  // } catch (error) {
  //   console.log(error)
  // }
}
