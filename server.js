import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

let connectedUsers = {};

io.on("connection", (socket) => {
  connectedUsers[socket.id] = { id: socket.id, name: `Usuario ${socket.id.slice(0,4)}` };

  io.emit("users", Object.values(connectedUsers));

  socket.on("message", (msg) => {
    io.emit("message", { ...msg, fromId: socket.id });
  });

  socket.on("disconnect", () => {
    delete connectedUsers[socket.id];
    io.emit("users", Object.values(connectedUsers));
  });
});

httpServer.listen(4000, () => {
  console.log("Socket.IO server running on port 4000");
});
