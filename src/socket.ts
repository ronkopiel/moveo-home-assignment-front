import { io, Socket } from 'socket.io-client';




// const SOCKET_PORT = process.env.SOCKET_PORT;
const SOCKET_PORT = 8000;
const socket: Socket = io(`http://localhost:${SOCKET_PORT}`); // Replace with your server's address

export default socket;
