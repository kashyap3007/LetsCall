const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
const server = require("http").Server(app);
const io = require("socket.io")(server)
const { v4: uuidv4 } = require("uuid");



const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});


app.use("/peerjs", peerServer); //for express
//We have one get route, and then we create our server. However, for our application to work, Whenever a new user visits our default route we will redirect him to a unique URL. We will use uuid library to create a random unique URL for each room.
// UUID is a javascript library that allows us to create unique Ids. In our application, we will use uuid version 4 to create our unique URL

//Now, We will use uuid library to create a random unique id for each room. and we will redirect our user to that room.

//room id ko id die
app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
  });

//add a view for every unique room and we will pass the current URL to that view.
  app.get("/:room", (req, res) => {
    res.render("room", { roomId: req.params.room });
  });

  ///07ca6e8c-b5a1-41c1-99fa-2fceed3f784a This is uuid


   io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit("user-connected", userId);
     
    });
  });




   server.listen(process.env.PORT || 3030);

   ////Now it’s time to use Socket.io and PeerJS. For those who don’t know Socket.io allows us to do real-time communication. and PeerJS allow us to implement WebRTC.