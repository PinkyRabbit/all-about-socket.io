'use strict';

/**
 * @Author: Mikita Melnikau <pinkyrabbit>
 * @Date:   2019-01-12T20:23:14+03:00
 * @Email:  usesa@yandex.com
 * @Last modified by:   pinkyrabbit
 * @Last modified time: 2019-01-12T20:27:07+03:00
 * @License: MIT
 * @Copyright: Happy Hacking *_*
 */

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: String,
  comment: String,
});

module.exports = mongoose.model('comment', commentSchema);
