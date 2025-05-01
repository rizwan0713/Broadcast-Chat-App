"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on("connection", (socket) => {
    socket.on("message", (event) => {
        const message = event.toString();
        if (message === "ping") {
            socket.send("pong");
        }
    });
    userCount = userCount + 1;
    console.log("user Connected #" + userCount);
});
