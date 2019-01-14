'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T21:20:22+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T21:52:02+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const mongoose = require('./db');
const Post = require('./models/post');
const Comment = require('./models/comment');

module.exports = () => {
  const comments = [
    new Comment({
      user: 'Jhon Doe',
      comment: "Awww, bitch!",
    }).save(),
    new Comment({
      user: 'Max Frie',
      comment: "You ask alotta questions Morty, not very charismatic of you.",
    }).save(),
    new Comment({
      user: 'Somebody Else',
      comment: "Life is effort and I'll stop when I die!",
    }).save(),
  ];

  const posts = [
    new Post({
      title: "Whoa, spoilers! I'm a whole season behind",
      article: 'I am not putting my father in a home! He just came back into my life, and you want to, grab him and, stuff him under a mattress like last months Victorias Secret?!',
    }).save(),
    new Post({
      title: 'I do not have discolored butthole flaps.',
      article: 'You want to see my first boner, or should we go straight to the moment I discovered interdimensional travel?',
    }).save(),
  ];

  return Promise.all([...comments, ...posts]);
};
