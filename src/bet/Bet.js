const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        setterName: { type: String, require: true },
        amount: { type: Number, require: true },
        description: { type: String, require: true },
        createdAt: { type: Date, default: Date.now },
        status: { type: String, default: 'open' },
        takerName: { type: String },
        winnerName: { type: String },
        betResolvedAt: { type: Date }
    },
    {
        versionKey: false
    }
);

var betModel = mongoose.model('Bet', BetSchema);

BetSchema.pre('save', function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

BetSchema.pre('save', function (next) {
    let thisBet = this;

    if (!this.betIndex) {
        betModel.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, newestBet) {
            if (err) return res.status(500).send('There was a problem adding the information the database. ' + err);
            thisBet._id = newestBet && newestBet._id !== null && newestBet._id !== undefined ? newestBet._id + 1 : 0;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('Bet', BetSchema);