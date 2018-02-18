const superAgent = require('superagent');
const errorCommand = require('./errorCommand');

const pushCommand = (message) => {
    return new Promise((resolve, reject) => {

        if (message.betAmountOrID) {
            var updateBet = {
                status: 'pushed',
                betResolvedAt: message.createdAt
            };

            superAgent.put('https://slawrence.herokuapp.com/bets/' + message.betAmountOrID)
                .send(updateBet)
                .then(() => {
                    resolve('Bet ' + message.betAmountOrID + ' tied. Bet ' + message.betAmountOrID + ' closed.');
                })
                .catch((err) => {
                    resolve('There was an error in saving this bet.');
                });
        } else {
            resolve(errorCommand(3));
        }
    });
}

module.exports = pushCommand;