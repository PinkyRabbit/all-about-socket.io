'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T00:57:28+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T14:41:51+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const posts = [
  {
    title: "Whoa, spoilers! I'm a whole season behind",
    text: 'I am not putting my father in a home! He just came back into my life, and you want to, grab him and, stuff him under a mattress like last months Victorias Secret?!',
  },
  {
    title: 'I do not have discolored butthole flaps.',
    text: 'You want to see my first boner, or should we go straight to the moment I discovered interdimensional travel?',
  },
];

module.exports = (socket) => {
  for (let i = 0; i < posts.length; i += 1) {
    socket.emit('post.add', posts[i]);
    socket.emit('posts.count', { count: i + 1 });
  }
};
