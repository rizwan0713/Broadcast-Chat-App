"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    socket.on("message", (message) => {
        console.log("message recieved" + message.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            console.log("full detail s is :", s);
            s.send(message.toString() + ":sent from the server ");
        }
    });
});
