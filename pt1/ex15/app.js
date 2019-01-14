'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T23:20:19+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-14T01:54:10+03:00
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
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Subscriber connected');
  socket.emit('room.joined', socket.id + ' joined the notifications room');

  let i = 0;
  var int = setInterval(() => {
    io.to('notifications').emit('notify', 'This is notification number ' + i);
    i += 1;
  }, 2000);

  socket.on('notifications.join', () => {
    socket.join('notifications');
  });

  socket.on('notifications.leave', () => {
    socket.leave('notifications');
  });

  socket.on('disconnect', () => {
    clearInterval(int);
    console.log('Subscriber disconnected');
  });
});
