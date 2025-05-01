import {WebSocketServer} from "ws";


const wss = new WebSocketServer({port:8080})
let userCount = 0;


wss.on("connection" , (socket) => {

   socket.on("message" , (event) => {
    const message = event.toString()
    if( message ===  "ping"){
        socket.send("pong")

    }

   })
    userCount = userCount + 1;
    console.log("user Connected #" + userCount)
})