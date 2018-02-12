const superAgent = require('superagent');
const errorCommand = require('./errorCommand');

const takeCommand = (message) => {
    return new Promise((resolve, reject) => {
        
        if (message.betAmountOrID) {
            var updateBet = {
                status: "in progress",
                takerName: message.name
            };

            superAgent.put('https://slawrence.herokuapp.com/bets/' + message.betAmountOrID)
                    .send(updateBet)
                    .then(() => {
                        resolve(
                            'Bet ' + message.betAmountOrID + ' taken by ' + message.name
                            + '! Use \'@sb won ' + message.betAmountOrID + ' [winner name]\' to determine winner.'
                        );
                    })
                    .catch((err) => {
                        resolve('There was an error in saving this bet.');
                    });

        } else {
            resolve(errorCommand(2));
        }
    });
}

module.exports = takeCommand;