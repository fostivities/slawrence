const express = require('express');
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

const SlawrenceController = require('./src/slawrence/SlawrenceController');
const BetController = require('./src/bet/BetController');

mongoose.connect('mongodb://yukon11:drtsao11@ds115758.mlab.com:15758/slawrence-db');

app.use(cors());
app.use('/sb', SlawrenceController);
app.use('/bets', BetController);

var server = app.listen(port, (req, res) => {
    console.log('Express server listening on port ' + port);
});