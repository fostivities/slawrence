const errorCommand = require('./errorCommand');
const Bet = require('../../../bet/Bet');
const superAgent = require('superagent');

const takeCommand = (message) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(message.text)) {
            var updateBet = {
                status: "in progress",
                takerName: message.name
            };
            console.log('URL: https://slawrence.herokuapp.com/bets/' + message.text);

            superAgent.put('https://slawrence.herokuapp.com/bets/' + message.text)
                    .type('form')
                    .send(updateBet)
                    .then(() => {
                        resolve('Bet: ' + message.text + ' taken by ' + message.name + '! Use \'@sb won [betID] [winner name]\' to determine winner.');
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