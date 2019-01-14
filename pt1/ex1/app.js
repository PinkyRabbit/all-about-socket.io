'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-11T22:21:00+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-11T22:38:45+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./index.html', (err, data) => {
    if (err) throw err;
    res.writeHead(200);
    res.end(data);
  });
}).listen(3000, () => {
  console.log('Server is up');
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Subscriber connected');

  socket.emit('hello-server', { greeting: 'Hello!' });

  socket.on('hello-client', (message) => {
    console.log(message.greeting);
  });
});
