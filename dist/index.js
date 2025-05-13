"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            console.log("userJoind the ", parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        //  if(parsedMessage.type == "chat"){
        //   // const currentUserRoom = allSockets.find((x) => x.socket == socket)
        //   console.log("user wants chat ");
        //   let currentUserRoom = null;
        //   for(let i =0 ;i< allSockets.length ;i++){
        //     if(allSockets[i].socket == socket){
        //       currentUserRoom = allSockets[i].room
        //     }
        //   }
        //   for( let i = 0 ; i <allSockets.length ;i++){
        //     if(allSockets[i].room == currentUserRoom ){
        //       allSockets[i].socket.send(parsedMessage.payload.message )
        //     }
        //   }
        //  }
        if (parsedMessage.type == "chat") {
            console.log("User sent a message");
            // Find the sender's room
            const currentUserRoom = (_a = allSockets.find(user => user.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            if (currentUserRoom) {
                // Broadcast to all users in the same room
                const messageToSend = JSON.stringify({
                    type: "message",
                    payload: {
                        name: parsedMessage.payload.name,
                        message: parsedMessage.payload.message
                    }
                });
                allSockets.forEach(user => {
                    if (user.room === currentUserRoom) {
                        user.socket.send(messageToSend);
                    }
                });
            }
        }
    });
});
//This is how Socket look alike
// full detail s is : <ref *1> WebSocket {
//     _events: [Object: null prototype] {
//       close: [Function (anonymous)],
//       message: [Function (anonymous)]
//     },
//     _eventsCount: 2,
//     _maxListeners: undefined,
//     _binaryType: 'nodebuffer',
//     _closeCode: 1006,
//     _closeFrameReceived: false,
//     _closeFrameSent: false,
//     _closeMessage: <Buffer >,
//     _closeTimer: null,
//     _errorEmitted: false,
//     _extensions: {},
//     _paused: false,
//     _protocol: '',
//     _readyState: 1,
//     _receiver: Receiver {
//       _events: {
//         close: undefined,
//         error: [Function: receiverOnError],
//         prefinish: undefined,
//         finish: undefined,
//         drain: [Function: receiverOnDrain],
//         conclude: [Function: receiverOnConclude],
//         message: [Function: receiverOnMessage],
//         ping: [Function: receiverOnPing],
//         pong: [Function: receiverOnPong]
//       },
//       _writableState: WritableState {
//         highWaterMark: 16384,
//         length: 0,
//         corked: 0,
//         onwrite: [Function: bound onwrite],
//         writelen: 0,
//         bufferedIndex: 0,
//         pendingcb: 0,
//         [Symbol(kState)]: 17580812,
//         [Symbol(kBufferedValue)]: null
//       },
//       _maxListeners: undefined,
//       _allowSynchronousEvents: true,
//       _binaryType: 'nodebuffer',
//       _extensions: {},
//       _isServer: true,
//       _maxPayload: 104857600,
//       _skipUTF8Validation: false,
//       _bufferedBytes: 0,
//       _buffers: [],
//       _compressed: false,
//       _payloadLength: 0,
//       _mask: undefined,
//       _fragmented: 0,
//       _masked: false,
//       _fin: false,
//       _opcode: 0,
//       _totalPayloadLength: 0,
//       _messageLength: 0,
//       _fragments: [],
//       _errored: false,
//       _loop: false,
//       _state: 0,
//       _eventsCount: 6,
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false,
//       [Symbol(websocket)]: [Circular *1]
//     },
//     _sender: Sender {
//       _extensions: {},
//       _socket: Socket {
//         connecting: false,
//         _hadError: false,
//         _parent: null,
//         _host: null,
//         _closeAfterHandlingError: false,
//         _events: [Object],
//         _readableState: [ReadableState],
//         _writableState: [WritableState],
//         allowHalfOpen: true,
//         _maxListeners: undefined,
//         _eventsCount: 4,
//         _sockname: null,
//         _pendingData: null,
//         _pendingEncoding: '',
//         server: [Server],
//         _server: [Server],
//         parser: null,
//         on: [Function (anonymous)],
//         addListener: [Function (anonymous)],
//         prependListener: [Function: prependListener],
//         setEncoding: [Function: socketSetEncoding],
//         _paused: false,
//         timeout: 0,
//         [Symbol(async_id_symbol)]: 5,
//         [Symbol(kHandle)]: [TCP],
//         [Symbol(lastWriteQueueSize)]: 0,
//         [Symbol(timeout)]: null,
//         [Symbol(kBuffer)]: null,
//         [Symbol(kBufferCb)]: null,
//         [Symbol(kBufferGen)]: null,
//         [Symbol(shapeMode)]: true,
//         [Symbol(kCapture)]: false,
//         [Symbol(kSetNoDelay)]: true,
//         [Symbol(kSetKeepAlive)]: false,
//         [Symbol(kSetKeepAliveInitialDelay)]: 0,
//         [Symbol(kBytesRead)]: 0,
//         [Symbol(kBytesWritten)]: 0,
//         [Symbol(websocket)]: [Circular *1]
//       },
//       _firstFragment: true,
//       _compress: false,
//       _bufferedBytes: 0,
//       _queue: [],
//       _state: 0,
//       onerror: [Function: senderOnError],
//       [Symbol(websocket)]: [Circular *1]
//     },
//     _socket: <ref *2> Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _closeAfterHandlingError: false,
//       _events: {
//         close: [Function: socketOnClose],
//         error: [Function: socketOnError],
//         prefinish: undefined,
//         finish: undefined,
//         drain: undefined,
//         data: [Function: socketOnData],
//         end: [Array],
//         readable: undefined,
//         timeout: undefined,
//         resume: undefined,
//         pause: undefined
//       },
//       _readableState: ReadableState {
//         highWaterMark: 16384,
//         buffer: [],
//         bufferIndex: 0,
//         length: 0,
//         pipes: [],
//         awaitDrainWriters: null,
//         [Symbol(kState)]: 193997060
//       },
//       _writableState: WritableState {
//         highWaterMark: 16384,
//         length: 0,
//         corked: 0,
//         onwrite: [Function: bound onwrite],
//         writelen: 0,
//         bufferedIndex: 0,
//         pendingcb: 0,
//         [Symbol(kState)]: 17563908,
//         [Symbol(kBufferedValue)]: null
//       },
//       allowHalfOpen: true,
//       _maxListeners: undefined,
//       _eventsCount: 4,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: Server {
//         maxHeaderSize: undefined,
//         insecureHTTPParser: undefined,
//         requestTimeout: 300000,
//         headersTimeout: 60000,
//         keepAliveTimeout: 5000,
//         connectionsCheckingInterval: 30000,
//         requireHostHeader: true,
//         joinDuplicateHeaders: undefined,
//         rejectNonStandardBodyWrites: false,
//         _events: [Object: null prototype],
//         _eventsCount: 5,
//         _maxListeners: undefined,
//         _connections: 2,
//         _handle: [TCP],
//         _usingWorkers: false,
//         _workers: [],
//         _unref: false,
//         allowHalfOpen: true,
//         pauseOnConnect: false,
//         noDelay: true,
//         keepAlive: false,
//         keepAliveInitialDelay: 0,
//         highWaterMark: 16384,
//         httpAllowHalfOpen: false,
//         timeout: 0,
//         maxHeadersCount: null,
//         maxRequestsPerSocket: 0,
//         _connectionKey: '6::::8080',
//         [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//         [Symbol(ServerResponse)]: [Function: ServerResponse],
//         [Symbol(shapeMode)]: false,
//         [Symbol(kCapture)]: false,
//         [Symbol(async_id_symbol)]: 2,
//         [Symbol(kUniqueHeaders)]: null,
//         [Symbol(http.server.connections)]: ConnectionsList {},
//         [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
//           _idleTimeout: 30000,
//           _idlePrev: [TimersList],
//           _idleNext: [TimersList],
//           _idleStart: 60073,
//           _onTimeout: [Function: bound checkConnections],
//           _timerArgs: undefined,
//           _repeat: 30000,
//           _destroyed: false,
//           [Symbol(refed)]: false,
//           [Symbol(kHasPrimitive)]: false,
//           [Symbol(asyncId)]: 4,
//           [Symbol(triggerId)]: 3
//         }
//       },
//       _server: Server {
//         maxHeaderSize: undefined,
//         insecureHTTPParser: undefined,
//         requestTimeout: 300000,
//         headersTimeout: 60000,
//         keepAliveTimeout: 5000,
//         connectionsCheckingInterval: 30000,
//         requireHostHeader: true,
//         joinDuplicateHeaders: undefined,
//         rejectNonStandardBodyWrites: false,
//         _events: [Object: null prototype],
//         _eventsCount: 5,
//         _maxListeners: undefined,
//         _connections: 2,
//         _handle: [TCP],
//         _usingWorkers: false,
//         _workers: [],
//         _unref: false,
//         allowHalfOpen: true,
//         pauseOnConnect: false,
//         noDelay: true,
//         keepAlive: false,
//         keepAliveInitialDelay: 0,
//         highWaterMark: 16384,
//         httpAllowHalfOpen: false,
//         timeout: 0,
//         maxHeadersCount: null,
//         maxRequestsPerSocket: 0,
//         _connectionKey: '6::::8080',
//         [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//         [Symbol(ServerResponse)]: [Function: ServerResponse],
//         [Symbol(shapeMode)]: false,
//         [Symbol(kCapture)]: false,
//         [Symbol(async_id_symbol)]: 2,
//         [Symbol(kUniqueHeaders)]: null,
//         [Symbol(http.server.connections)]: ConnectionsList {},
//         [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
//           _idleTimeout: 30000,
//           _idlePrev: [TimersList],
//           _idleNext: [TimersList],
//           _idleStart: 60073,
//           _onTimeout: [Function: bound checkConnections],
//           _timerArgs: undefined,
//           _repeat: 30000,
//           _destroyed: false,
//           [Symbol(refed)]: false,
//           [Symbol(kHasPrimitive)]: false,
//           [Symbol(asyncId)]: 4,
//           [Symbol(triggerId)]: 3
//         }
//       },
//       parser: null,
//       on: [Function (anonymous)],
//       addListener: [Function (anonymous)],
//       prependListener: [Function: prependListener],
//       setEncoding: [Function: socketSetEncoding],
//       _paused: false,
//       timeout: 0,
//       [Symbol(async_id_symbol)]: 5,
//       [Symbol(kHandle)]: TCP {
//         reading: true,
//         onconnection: null,
//         _consumed: true,
//         [Symbol(owner_symbol)]: [Circular *2]
//       },
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: true,
//       [Symbol(kSetKeepAlive)]: false,
//       [Symbol(kSetKeepAliveInitialDelay)]: 0,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(websocket)]: [Circular *1]
//     },
//     _autoPong: true,
//     _isServer: true,
//     [Symbol(shapeMode)]: false,
//     [Symbol(kCapture)]: false
//   }
