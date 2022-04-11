const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;
 var peer = new Peer("dang", {
     path: "/peerjs",
     host: "/",
     port: "443",
   });
console.log("DAN");
let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });
  
      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });

    });

    const connectToNewUser = (userId, stream) => {
        const call = peer.call(userId, stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      };
      
      peer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id);
      });


//Now we will create addVideoStream function. which will add the stream to the video element.

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
          videoGrid.append(video);
        });
      };


 






//_______Button logic-------------------------------?


 const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");


//Syntax
//element.addEventListener("click", myFunction);
// function myFunction() {
//     alert ("Hello World!");
//   }

inviteButton.addEventListener("click", () => {
    prompt(
      "Copy this link and send it to people you want to talk--(Ayush)",
      window.location.href
  //What is Windows location href?
// href property returns the URL of the current page.
    );
  });

  //The getAudioTracks() method of the MediaStream interface returns a sequence that represents all the MediaStreamTrack objects in this stream's track set where MediaStreamTrack.kind is audio.

  muteButton.addEventListener("click", () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    //To get audio track is true or false

    //if(enabled==true)// if(enabled)
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      html = `<i class="fas fa-microphone-slash fa-2x"></i>`;
      muteButton.innerHTML = html;
    } else {
      myVideoStream.getAudioTracks()[0].enabled = true;
      html = `<i class="fas fa-microphone fa-2x"></i>`;
     muteButton.innerHTML = html;
    }
  });

  //getVideotracks return true or false just like audio

  stopVideo.addEventListener("click", () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      html = `<i class="fas fa-video-slash fa-2x"></i>`;
      stopVideo.innerHTML = html;
      //.innerHTML = html to change the html
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
      html = `<i class="fas fa-video fa-2x"></i>`;
      stopVideo.classList.toggle("background__red");
      stopVideo.innerHTML = html;
    }
  });


 cancel.addEventListener("click", () => 
 {
  
    alert("Scripts can not close windows that were not opened by script"+" "+"So please cancel it by cancelling the tab manually----(Ayush)")
   
});