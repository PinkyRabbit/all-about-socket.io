'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-11T23:19:34+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-11T23:43:59+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const io = require('socket.io')(3000);

const sockets = [];
io.on('connection', (socket) => {
  console.log('Subscriber connected');
  sockets.push(socket);

  socket.on('message', (message) => {
    for (let i = 0; i < sockets.length; i += 1) {
      sockets[i].send(message);
    }
  });

  socket.on('disconnect', () => {
    const index = sockets.indexOf(socket);
    sockets.splice(index, 1);
    console.log('Subscriber disconnected');
  });
});
