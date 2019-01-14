'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T23:20:19+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-14T03:52:05+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const md5 = require('md5');

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

// It is the md5 hash of "pass123"
const privatePassword = '32250170a0dca92d53ec9624f336ca24';

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Subscriber connected');

  socket.on('join.group', function (data) {
    if (md5(data.password) !== privatePassword) {
      return socket.emit('message.posted', {
        type: 'danger',
        message: 'Invalid password'
      });
    }

    socket.join('secret group');
    socket.emit('join.group.success', data.username);
  });

  socket.on('message.send', (data) => {
    io.to('secret group').emit('message.sent', data);
  });

  socket.on('disconnect', () => {
    console.log('Subscriber disconnected');
  });
});
