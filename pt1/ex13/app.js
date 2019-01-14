'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-13T21:20:36+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-14T00:11:12+03:00
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

const index = path.join(__dirname, 'index.html');
app.get('*', (req, res) => {
  res.sendFile(index);
});

const io = socketIO(server);

function createRoom(i) {
  const group = io.of('group-' + i);
  group.on('connection', (socket) => {
    console.log('Subscriber connected to group-' + i);

    socket.on('message.send', (data) => {
      group.emit('message.sent', data);
    });

    socket.on('disconnect', () => {
      console.log('Subscriber disconnected from group-' + i);
    })
  });
}

for (let i = 0; i < 2; i += 1) {
  createRoom(i);
}
