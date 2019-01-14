'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T23:20:19+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-14T02:58:32+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http
  .createServer(app)
  .listen(3000, () => {
    console.log('Server is up');
  });

const index = path.join(__dirname, './index.html');
app.get('*', (req, res) => {
  res.sendFile(index);
});

// const rooms = new Map();
const rooms = [
  'red',
  'blue',
  'green',
  'yellow',
];

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Subscriber connected');
  socket.emit('room.joined', socket.id + ' joined the hallway');

  for (let i = 0; i < rooms.length; i += 1) {
    socket.join(rooms[i]);
    socket.emit('room.joined', socket.id + ' joined the ' + rooms[i]);
  }

  socket.on('list.rooms', () => {
    socket.emit('list.rooms.response', Object.keys(socket.rooms));
  });

  socket.on('room.join', (room) => {
    socket.join(room);
    io.to(room).emit('room.joined', socket.id + ' joined the ' + room);
  });

  socket.on('room.leave', (room) => {
    socket.leave(room);
    io.emit('room.left', socket.id + ' left the ' + room);
  });

  socket.on('message.send', (data) => {
    io.emit('message.sent', data);
  });

  socket.on('disconnect', () => {
    console.log('Subscriber disconnected');
  });
});
