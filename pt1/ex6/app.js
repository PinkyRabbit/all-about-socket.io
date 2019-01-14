'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T19:56:58+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T21:46:13+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const fake = require('./fake');

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

const controllers = [
  'comments',
  'posts',
];

const io = socketIO(server);
io.on('connection', async(socket) => {
  console.log('Subscriber connected');

  try {
    await fake();
  } catch (err) {
    throw (err);
  }

  for (let i = 0; i < controllers.length; i += 1) {
    require(`./controllers/${controllers[i]}.controller`)(socket);
  }

  socket.on('disconnect', () => {
    console.log('Subscriber disconnected');
  });
});
