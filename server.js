const express = require("express");
const http = require("http"); // Modul pentru a crea server HTTP
const { Server } = require("socket.io"); // Importă Server din socket.io
const path = require("path"); // Pentru a gestiona căi de fișiere

// Creează aplicația Express
const app = express();

// Creează serverul HTTP și îl atașează aplicației Express
const server = http.createServer(app);

// Creează un server Socket.IO și îl atașează serverului HTTP
const io = new Server(server);

const PORT = 3000;

// Servește fișierele statice din directorul proiectului
app.use(express.static(path.join(__dirname)));

// Servește fișierul HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Configurează evenimentele Socket.IO
io.on("connection", (socket) => {
  console.log("Un utilizator s-a conectat!");

  // Evenimente personalizate
  socket.on("chat message", (msg) => {
    console.log("Mesaj primit:", msg);
    // Trimite mesajul tuturor clienților
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Un utilizator s-a deconectat.");
  });
});

// Pornește serverul HTTP
server.listen(PORT, () => {
  console.log(`Serverul rulează la http://localhost:${PORT}`);
});
