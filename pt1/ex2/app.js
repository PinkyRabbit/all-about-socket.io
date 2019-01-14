'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-11T22:43:35+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-11T22:51:30+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http
  .createServer(app)
  .listen(3000);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Subscriber connected');

  socket.emit('hello-server', { greeting: 'Hello!' });

  socket.on('hello-client', (message) => {
    console.log(message.greeting);
  });
});
