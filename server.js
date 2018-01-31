const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

const UserController = require('./src/controllers/UserController');
const BetController = require('./src/controllers/BetController');

mongoose.connect('mongodb://yukon11:drtsao11@ds115758.mlab.com:15758/slawrence-db');

app.use('/users', UserController);
app.use('/bets', BetController);

var server = app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});