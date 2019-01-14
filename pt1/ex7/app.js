'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T22:02:00+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T22:12:26+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
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

let count = 0;
io.on('connection', (socket) => {
  console.log('Subscriber connected');
  count += 1;
  io.emit('users.count', count);

  socket.on('disconnect', () => {
    console.log('Subscriber disconnect');
    count -= 1;
    io.emit('users.count', count);
  });
});
