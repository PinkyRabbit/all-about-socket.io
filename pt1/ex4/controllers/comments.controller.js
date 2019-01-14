'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T00:53:12+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T14:51:01+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const comments = [
  {
    author: 'Jhon Doe',
    comment: "Awww, bitch!",
  },
  {
    author: 'Max Frie',
    comment: "You ask alotta questions Morty, not very charismatic of you.",
  },
  {
    author: 'Somebody Else',
    comment: "Life is effort and I'll stop when I die!",
  },
];

module.exports = (socket) => {
  // for (let i = 0; i < comment.length; i += 1) {
  //   socket.emit('comment.add', comments[i]);
  //   socket.emit('comment.count', { count: i + 1 });
  // }
  let i = 0;
  const myInt = setInterval(() => {
    if (comments[i]) {
      socket.emit('comment.add', comments[i]);
      socket.emit('comments.count', { count: i + 1 });
    } else {
      clearInterval(myInt);
    }
    i += 1;
  }, 5000);
};
