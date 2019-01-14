'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-13T01:00:59+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-13T02:38:07+03:00
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

const index = path.join(__dirname, 'index.html');
app.get('*', (req, res) => {
  res.sendFile(index);
});

const users = new Map();
const sockets = new Map();
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Subscriber connected');

  // show all users
  users.forEach((value) => {
    socket.emit('user.add', value );
  });

  // add a new User
  socket.on('username.create', (data) => {
    const newUser = {
      username: data,
      id: socket.id,
    };
    users.set(socket.id, newUser);
    sockets.set(socket.id, socket);
    io.emit('user.add', newUser);
  });

  // hug user
  socket.on('user.hug', (id) => {
    const user = users.get(socket.id);
    sockets.get(id).emit('user.hugged', 'You hugged by ' + user.username);
  });

  // remove User
  socket.on('disconnect', () => {
    console.log('Subscriber disconnected');
    users.delete(socket.id);
    sockets.delete(socket.id);
    io.emit('user.remove', socket.id);
  });
});
