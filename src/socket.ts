import { io, Socket } from 'socket.io-client';





const socket: Socket = io(`https://move-codeblock-back.onrender.com/`);

export default socket;
