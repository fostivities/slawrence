const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

const SlawrenceController = require('./src/controllers/SlawrenceController');
const UserController = require('./src/controllers/UserController');
const BetController = require('./src/controllers/BetController');

mongoose.connect('mongodb://yukon11:drtsao11@ds115758.mlab.com:15758/slawrence-db');

app.use('/sb', SlawrenceController);
app.use('/users', UserController);
app.use('/bets', BetController);

var server = app.listen(port, (req, res) => {
    // req.chunks = [];
    // req.on('data', function (chunk) {
    //     req.chunks.push(chunk.toString());
    // });
    console.log('Express server listening on port ' + port);
});