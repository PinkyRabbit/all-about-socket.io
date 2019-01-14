'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T20:27:54+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T21:50:04+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const Comment = require('../models/comment');

module.exports = (socket) => {
  let count = 0;

  const stream = Comment.find({}).stream();

  stream.on('data', (comment) => {
    socket.emit('comment.add', comment);
    socket.emit('comments.count', { count: count + 1 });
    count += 1;
  });
};
