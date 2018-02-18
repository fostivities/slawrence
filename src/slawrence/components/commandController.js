const Bet = require('../../bet/Bet');
const betCommand = require('./commands/betCommand');
const cancelCommand = require('./commands/cancelCommand');
const errorCommand = require('./commands/errorCommand');
const helpCommand = require('./commands/helpCommand');
const pushCommand = require('./commands/pushCommand');
const takeCommand = require('./commands/takeCommand');
const wonCommand = require('./commands/wonCommand');

const commandController = (message) => {
    return new Promise((resolve, reject) => {
        switch (message.command) {
            case '--help':
                resolve(helpCommand());
                break;
            case 'bet':
                resolve(betCommand(message));
                break;
            case 'take':
            case 'won':
            case 'cancel':
            case 'push':
                resolve(advancedCommand(message));
                break;
            default:
                resolve(errorCommand(0));
        }
    });
};

const advancedCommand = (message) => {
    return new Promise((resolve, reject) => {
        if (message.betAmountOrID) {
            Bet.findById(message.betAmountOrID, (err, bet) => {
                if (err) resolve('There was a problem finding the user.');
                if (!bet) {
                    resolve('There is no bet associated with the ID provided.');
                } else {
                    switch (message.command) {
                        case 'take':
                            resolve(advancedTakeCommand(bet, message));
                            break;
                        case 'won':
                            resolve(advancedWonCommand(bet, message));
                            break;
                        case 'push':
                            resolve(advancedPushCommand(bet, message));
                        case 'cancel':
                            resolve(advancedCancelCommand(bet, message));
                            break;
                        default:
                            resolve('Unknown error');
                    }
                }
            });
        } else {
            resolve('Bet ID is missing from your message or was in an incorrect spot.')
        }
    });
}

const advancedTakeCommand = (bet, message) => {
    if (bet.status !== 'open') {
        return 'You cannot take a bet that has already been set between two people or is already won.';
    } else if (!message.isAdmin && bet.setterName === message.name) {
        return "You are not allowed to make a bet with yourself, dummy.";
    } else {
        return takeCommand(message);
    }
}

const advancedPushCommand = (bet, message) => {
    if (bet.status !== 'in progress') {
        return 'A bet must be set between two people before beign able to push.';
    } else {
        if (message.isAdmin || bet.setterName === message.name || bet.takerName === message.name) {
            return pushCommand(message);
        } else {
            return 'You cannot push a bet you are not a part of.'
        }
    }
}

const advancedWonCommand = (bet, message) => {
    if (bet.status !== 'in progress') {
        return 'A bet must be set between two people before being able to win.';
    } else {
        if ((bet.setterName === message.betDescriptionOrWinnerName || bet.takerName === message.betDescriptionOrWinnerName)
            && (message.isAdmin || bet.setterName === message.name || bet.takerName === message.name)) {
                return wonCommand(message);
            } else {
                return 'You cannot win a bet you are not a part of and the winner must be either the setter or taker.';
            }
    }
}

const advancedCancelCommand = (bet, message) => {
    if (!message.isAdmin && bet.setterName !== message.name) {
        return 'You cannot cancel a bet that you did not make. Have the bet setter cancel the bet.';
    } else if (bet.status === 'in progress') {
        return 'You cannot cancel a bet if it has been taken by someone else and has not been won yet.';
    } else {
        return cancelCommand(message);
    }
}

module.exports = commandController;