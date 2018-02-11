const errorCommand = require('./errorCommand');
const superAgent = require('superagent');
const Bet = require('../../../bet/Bet');

const betCommand = (message) => {
    return new Promise((resolve, reject) => {
        let betParts = message.text.split(' ');

        if (betParts.length >= 2 && !isNaN(betParts[0])) {
            let betAmount = betParts.splice(0, 1)[0];
            let betDescription = betParts.join(' ');

            Bet.findOne({}, {}, { sort: { 'createdAt': -1 } }, (err, latestBet) => {
                if (err) return "There was an error setting the ID.";

                let newBetID = latestBet._id + 1;
                let newBet = new Bet({
                    setterName: message.name,
                    amount: betAmount,
                    description: betDescription,
                    createdAt: message.createdAt,
                    status: 'open'
                });

                superAgent.post('https://slawrence.herokuapp.com/bets/')
                    .type('form')
                    .send(newBet)
                    .then(() => {
                        resolve('Bet set! Bet ID: ' + newBetID + ', Bet: ' + '$' + betAmount + ', ' + betDescription);
                    })
                    .catch((err) => {
                        resolve('There was an error in saving this bet. ' + err);
                    });
            });
        } else {
            resolve(errorCommand(1));
        }
    });
}

module.exports = betCommand;