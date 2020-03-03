const express = require('express');
const path = require('path');
const json = require('../data')
const router = express.Router();

router.get('/', function (req, res, next) {
  console.log(json);
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

module.exports = router;