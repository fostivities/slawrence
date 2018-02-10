const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Bet = require('./Bet');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

getAllBets = (req, res) => {
    Bet.find({}, (err, bets) => {
        if (err) return res.status(500).send('There was a problem finding the users. ' + err);
        res.status(200).send(bets);
    });
}

getLatestBet = (req, res) => {
    Bet.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, latestBet) {
        if (err) return res.status(500).send('There was a problem adding the information the database. ' + err);
        res.status(200).send(latestBet);
    });
}

postBet = (req, res) => {
    let newBet = new Bet(req.body);
    Bet.create(newBet, (err, bet) => {
        if (err) return res.status(500).send('There was a problem adding the information to the database. ' + err);
        res.status(200).send(bet);
    });
}

getBetById = (req, res) => {
    Bet.findById(req.params.id, (err, bet) => {
        if (err) return res.status(500).send('There was a problem finding the user. ' + err);
        if (!bet) return res.status(404).send('No bet found');
        res.status(200).send(bet);
    });
}

updateBetById = (req, res) => {
    Bet.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, bet) => {
        if (err) return res.status(500).send('There was a problem updating the user. ' + err);
        if (!bet) return res.status(404).send('No bet found');
        res.status(200).send(bet);
    });
}

deleteBetById = (req, res) => {
    Bet.findByIdAndRemove(req.params.id, (err, bet) => {
        if (err) return res.status(500).send('There was a problem deleting the user. ' + err);
        if (!bet) return res.status(404).send('No bet found');
        res.status(200).send('bet ' + bet.description + ' was deleted.');
    });
}

router
    .get('/', (req, res) => getAllBets(req, res))
    .get('/latestbet/', (req, res) => getLatestBetID(req, res))
    .post('/', (req, res) => postBet(req, res))
    .get('/:id', (req, res) => getBetById(req, res))
    .put('/:id', (req, res) => updateBetById(req, res))
    .delete('/:id', (req, res) => deleteBetById(req, res));

module.exports = router;