'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T23:20:19+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-14T01:22:09+03:00
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
  socket.emit('room.joined', socket.id + ' joined the hallway');
  // rooms.set(socket.id, ['hallway']);

  socket.on('room.join', (room) => {
    // socket.join(room);
    // const oldRooms = rooms.get(socket.id);
    // if (oldRooms.indexOf(room) === -1) {
    //   oldRooms.push(room);
    //   rooms.set(socket.id, oldRooms);
    //   io.to(room).emit('room.joined', socket.id + ' joined the ' + room);
    // }
    socket.join(room);
    io.to(room).emit('room.joined', socket.id + ' joined the ' + room);
  });

  socket.on('message.send', (data) => {
    // const listOfRooms = rooms.get(socket.id);
    // for (let i = 0; i < listOfRooms.length; i += 1) {
    //   io.to(listOfRooms[i]).emit('message.sent', data);
    // }
    io.emit('message.sent', data);
  });

  socket.on('disconnect', () => {
    console.log('Subscriber disconnected');
  });
});
