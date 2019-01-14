'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T20:23:58+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T20:26:16+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
  title: String,
  article: String,
});

module.exports = mongoose.model('post', postsSchema);
