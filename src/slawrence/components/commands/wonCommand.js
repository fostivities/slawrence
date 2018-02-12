const superAgent = require('superagent');
const errorCommand = require('./errorCommand');

const wonCommand = (message) => {
    return new Promise((resolve, reject) => {

        if (message.betAmountOrID && message.betDescriptionOrWinnerName) {
            var updateBet = {
                status: 'won',
                winnerName: message.betDescriptionOrWinnerName,
                betResolvedAt: message.createdAt
            };

            superAgent.put('https://slawrence.herokuapp.com/bets/' + message.betAmountOrID)
                .send(updateBet)
                .then(() => {
                    resolve(
                        'Bet ' + message.betAmountOrID + ' won by ' 
                        + message.betDescriptionOrWinnerName + '. Bet ' 
                        + message.betAmountOrID + ' closed.'
                    );
                })
                .catch((err) => {
                    resolve('There was an error in saving this bet.');
                });
        } else {
            resolve(errorCommand(3));
        }
    });
}

module.exports = wonCommand;