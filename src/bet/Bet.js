const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema(
    {
        _id: { type: Number, deafult: 0 },
        betIndex: { type: Number },
        nameOfMaker: { type: String, require: true },
        amount: { type: Number, require: true },
        description: { type: String, require: true },
        createdAt: { type: Date, default: Date.now },
        isBetTaken: { type: Boolean, default: false },
        nameOfTaker: { type: String },
        nameOfWinner: { type: String },
        betResolvedAt: { type: Date }
    },
    {
        versionKey: false
    }
);

var temp = mongoose.model('Bet', BetSchema);

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
        temp.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, newestBet) {
            if (err) return res.status(500).send('There was a problem adding the information the database.');
            thisBet._id = newestBet && newestBet._id ? newestBet._id + 1 : 0;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('Bet', BetSchema);