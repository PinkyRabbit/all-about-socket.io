'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T00:38:43+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T14:41:27+03:00
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
  .listen(3000);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const io = socketIO(server);

const controllers = ['comments', 'posts'];
io.on('connection', (socket) => {
  console.log('Subscriber connected');
  for (let i = 0; i < controllers.length; i += 1) {
    require(`./controllers/${controllers[i]}.controller`)(socket);
  }
  socket.on('disconnect', () => {
    console.log('Subscriber disconnected');
  });
});
