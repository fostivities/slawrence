const superAgent = require('superagent');
const Bet = require('../../../bet/Bet');
const errorCommand = require('./errorCommand');

const betCommand = (message) => {
    return new Promise((resolve, reject) => {

        if (message.betAmountOrID && message.betDescriptionOrWinnerName) {
            Bet.findOne({}, {}, { sort: { 'createdAt': -1 } }, (err, latestBet) => {
                if (err) return "There was an error setting the ID.";

                let newBetID = latestBet._id + 1;
                let newBet = new Bet({
                    setterName: message.name,
                    amount: message.betAmountOrID,
                    description: message.betDescriptionOrWinnerName,
                    createdAt: message.createdAt,
                    status: 'open'
                });

                superAgent.post('https://slawrence.herokuapp.com/bets/')
                    .send(newBet)
                    .then(() => {
                        resolve(
                            'Bet '+ newBetID + ': $' + message.betAmountOrID + ' on ' 
                            + message.betDescriptionOrWinnerName + ' set! Use \'@sb take ' 
                            + newBetID + '\' to accept the bet.'
                        );
                    })
                    .catch((err) => {
                        resolve('There was an error in saving this bet. ' + err.stack);
                    });
            });
        } else {
            resolve(errorCommand(1));
        }
    });
}

module.exports = betCommand;