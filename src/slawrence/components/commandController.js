const helpCommand = require('./commands/helpCommand');
const setCommand = require('./commands/setCommand');
const takeCommand = require('./commands/takeCommand');
const wonCommand = require('./commands/wonCommand');
const cancelCommand = require('./commands/cancelCommand');
const errorCommand = require('./commands/errorCommand');

const commandController = (recievedMessage) => {
    switch (recievedMessage.command) {
        case '--help':
            response = helpCommand();
            break;
        case 'set':
            response = setCommand(recievedMessage);
            break;
        case 'take':
            response = takeCommand();
            break;
        case 'won':
            response = wonCommand();
            break;
        case 'cancel':
            response = cancelCommand();
            break;
        default:
            response = errorCommand(0);
    }

    return response;
};

module.exports = commandController;