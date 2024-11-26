const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Servește fișierele statice din directorul curent
app.use(express.static(path.join(__dirname)));

// Servește fișierul HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Configurează Socket.IO
io.on("connection", (socket) => {
  console.log("Un utilizator s-a conectat");

  socket.on("disconnect", () => {
    console.log("Un utilizator s-a deconectat");
  });
});

// Pornește serverul
server.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
