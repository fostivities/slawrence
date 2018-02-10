const helpCommand = require('./commands/helpCommand');
const betCommand = require('./commands/betCommand');
const takeCommand = require('./commands/takeCommand');
const wonCommand = require('./commands/wonCommand');
const cancelCommand = require('./commands/cancelCommand');
const errorCommand = require('./commands/errorCommand');

const commandController = (recievedMessage) => {
    return new Promise((resolve, reject) => {
        switch (recievedMessage.command) {
            case '--help':
                resolve(helpCommand());
                break;
            case 'bet':
                resolve(betCommand(recievedMessage));
                break;
            case 'take':
                resolve(takeCommand());
                break;
            case 'won':
                resolve(wonCommand());
                break;
            case 'cancel':
                resolve(cancelCommand());
                break;
            default:
                resolve(errorCommand(0));
        }
    });
};

module.exports = commandController;