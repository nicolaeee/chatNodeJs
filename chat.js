const socket = io();

document.getElementById('sendMessage').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    socket.emit('sendMessage', message);
    document.getElementById('messageInput').value = '';
});

socket.on('broadcastMessage', (message) => {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    messagesDiv.appendChild(newMessage);
});
