const helpCommand = require('./commands/helpCommand');
const setCommand = require('./commands/setCommand');
const takeCommand = require('./commands/takeCommand');
const wonCommand = require('./commands/wonCommand');
const cancelCommand = require('./commands/cancelCommand');
const errorCommand = require('./commands/errorCommand');

removeCommand = (text, firstCommand) => {
    return text.replace(text.substring(0, text.indexOf(firstCommand) + firstCommand.length), '').trim();
}

commandController = (text) => {
    const commands = ['--help', 'set', 'take', 'won', 'cancel']
    let lowestNum = null;
    let firstCommand = '';
    let response = '';

    for (let command of commands) {
        let x = command;
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

    text = firstCommand ? removeCommand(text, firstCommand) : text;

    switch (firstCommand) {
        case '--help':
            response = helpCommand();
            break;
        case 'set':
            response = setCommand(text);
            break;
        case 'take':
            response = takeCommand(text);
            break;
        case 'won':
            response = wonCommand(text);
            break;
        case 'cancel':
            response = cancelCommand(text);
            break;
        default:
            response = errorCommand(0);
    }

    return response;
};

module.exports = commandController;