'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-13T00:03:44+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-13T00:06:18+03:00
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

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log(`Subscriber ${socket.id} connected`);
  io.emit('user.add', socket.id);

  socket.on('disconnect', () => {
    io.emit('user.remove', socket.id);
    console.log(`Subscriber ${socket.id} disconnected`);
  });
});
