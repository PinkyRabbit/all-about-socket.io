'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T18:46:47+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T19:05:21+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const moment = require('moment');
const socketIO = require('socket.io');

const app = express();
const server = http
  .createServer(app)
  .listen(3000, () => {
    console.log('server is up');
  });

const file = path.join(__dirname, 'index.html');

app.get('*', (req, res) => {
  res.sendFile(file);
});

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Subscriber connected');

  const int = setInterval(() => {
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    socket.emit('seconds.update', { time });
  }, 1000);

  socket.on('disconnected', () => {
    console.log('Subscriber disconnected');
    clearInterval(int);
  });
});
