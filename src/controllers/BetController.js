const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Bet = require('../schemas/Bet');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function getAllBets (req, res) {
    Bet.find({}, (err, bets) => {
        if (err) return res.status(500).send('There was a problem finding the users.');
        res.status(200).send(bets);
    });
}

function postBet (req, res) {
    let newBet = new Bet(req.body);
    Bet.create(newBet, (err, bet) => {
        if (err) return res.status(500).send('There was a problem adding the information to the database.');
        res.status(200).send(bet);
    });
}

function getBetById (req, res) {
    Bet.findById(req.params.id, (err, bet) => {
        if (err) return res.status(500).send('There was a problem finding the user.');
        if (!bet) return res.status(404).send('No bet found');
        res.status(200).send(bet);
    });
}

function updateBetById (req, res) {
    Bet.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, bet) => {
        if (err) return res.status(500).send('There was a problem updating the user.');
        if (!bet) return res.status(404).send('No bet found');
        res.status(200).send(bet);
    });
}

function deleteBetById (req, res) {
    Bet.findByIdAndRemove(req.params.id, (err, bet) => {
        if (err) return res.status(500).send('There was a problem deleting the user.');
        if (!bet) return res.status(404).send('No bet found');
        res.status(200).send('bet ' + bet.description + ' was deleted.');
    });
}

router
    .get('/', (req, res) => getAllBets(req, res))
    .post('/', (req, res) => postBet(req, res))
    .get('/:id', (req, res) => getBetById(req, res))
    .put('/:id', (req, res) => updateBetById(req, res))
    .delete('/:id', (req, res) => deleteBetById(req, res));

module.exports = router;