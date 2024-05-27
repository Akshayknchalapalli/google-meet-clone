
import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import {Server as HTTPServer} from 'http';
import {Socket as NetSocket} from 'net';


interface ExtendedNextApiResponse extends NextApiResponse {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
}
const SocketHandler = (req: NextApiRequest,res: ExtendedNextApiResponse) => {
  console.log("API endpoint called");
  if (res.socket.server.io) {
    console.log('socket is already running')
  } else {
    console.log('Socket is initializing');

    const io = new IOServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection',(socket) => {
      console.log('A client is connected')
    })
  }
  res.end()
}
export default SocketHandler;