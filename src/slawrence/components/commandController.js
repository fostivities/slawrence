const helpCommand = require('./commands/helpCommand');
const setCommand = require('./commands/setCommand');
const takeCommand = require('./commands/takeCommand');
const wonCommand = require('./commands/wonCommand');
const cancelCommand = require('./commands/cancelCommand');
const errorCommand = require('./commands/errorCommand');

commandController = (text) => {
    const commands = ['--help', 'set', 'take', 'won', 'cancel']
    let lowestNum = null;
    let firstCommand = '';
    let response = '';

    for (let command of commands) {
        let commandIndex = text.indexOf(command);

        if (commandIndex > -1) {
            if (lowestNum === null) {
                lowestNum = commandIndex;
                firstCommand = command;
            } else {
                lowestNum = commandIndex <= lowestNum ? commandIndex : lowestNum;
                if (commandIndex <= lowestNum) {
                    lowestNum = commandIndex;
                    firstCommand = command;
                }
            }
        }
    }

    switch (firstCommand) {
        case '--help':
            response = helpCommand();
            break;
        case 'set':
            response = setCommand();
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
            response = errorCommand();
    }

    return response;
};

module.exports = commandController;