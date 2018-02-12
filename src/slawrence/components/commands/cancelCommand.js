const superAgent = require('superagent');
const errorComannd = require('./errorCommand');

const cancelCommand = (message) => {
    return new Promise((resolve, reject) => {

        if (message.betAmountOrID) {
            superAgent.delete('https://slawrence.herokuapp.com/bets/' + message.betAmountOrID)
                .send()
                .then(() => {
                    resolve('Bet ' + message.betAmountOrID + ' cancelled and deleted from DB.');
                })
                .catch((err) => {
                    resolve('There was an error in deleting this bet.');
                });
        } else {
            resolve(errorCommand(4));
        }
    });
}

module.exports = cancelCommand;