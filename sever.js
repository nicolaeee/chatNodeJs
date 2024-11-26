const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servirea fișierelor statice
app.use(express.static(path.join(__dirname, 'public')));

// Gestionare conexiuni WebSocket
io.on('connection', (socket) => {
    console.log('Un utilizator s-a conectat:', socket.id);

    socket.on('sendMessage', (message) => {
        io.emit('broadcastMessage', message); // Retransmitere tuturor
    });

    socket.on('disconnect', () => {
        console.log('Un utilizator s-a deconectat:', socket.id);
    });
});

// Pornirea serverului
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
