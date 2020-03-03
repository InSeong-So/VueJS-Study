let express = require('express');
let router = express.Router();
let expenses = require('../data');
router.get('/', function (req, res, next) {
    res.send(expenses)
});

module.exports = router;