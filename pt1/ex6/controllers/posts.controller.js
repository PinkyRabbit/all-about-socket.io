'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T20:28:49+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T21:44:08+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const Post = require('../models/post');

module.exports = (socket) => {
  let count = 0;

  const stream = Post.find({}).stream();

  stream.on('data', (post) => {
    socket.emit('post.add', post);
    socket.emit('posts.count', { count: count + 1 });
    count += 1;
  });
};
