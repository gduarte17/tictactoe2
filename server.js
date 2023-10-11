// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Um jogador conectou.');

  socket.on('makeMove', (index) => {
    // Lógica para processar o movimento do jogador e notificar o outro jogador
    // ...

    io.emit('updateBoard', board); // Atualize o tabuleiro para todos os jogadores
  });

  socket.on('disconnect', () => {
    console.log('Um jogador desconectou.');
    // Lógica para lidar com a desconexão do jogador
    // ...
  });
});

server.listen(3000, () => {
  console.log('Servidor Socket.IO rodando em http://localhost:3000');
});
