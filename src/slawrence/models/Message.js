const noTextError = 'is missing the required text'

class Message {
    constructor(message) {
        this.isValid = false;
        this.id = message.sender_id || '';
        this.name = message.name.split(' ')[0].toLowerCase() || '';
        this.createdAt = Date.now();
        this.command = '';
        this.betAmountOrID = '';
        this.betDescriptionOrWinnerName = '';

        this.cleanValidateSetText(message.text);

        this.isAdmin = this.name === 'jordan' ? true : false;
        this.errorResponse = this.isValid ? 'No error' : 'This message is missing required information or is formatted incorrectly. use \'@sb --help\' for reference.';
    }

    cleanValidateSetText (messageText) {
        messageText = messageText.toLowerCase().replace('@sb ', '');
        this.command = this.setCommand(messageText);

        if (this.command.length > 0) {
            messageText = messageText.replace(this.command, '').trim();
            this.parseText(messageText);
        }
    }

    parseText (messageText) {
        if (this.command === '--help') {
            this.isValid = true;
        } else {
            let textParts = messageText.split(' ');
            this.betAmountOrID = textParts.splice(0, 1)[0];

            if (!isNaN(this.betAmountOrID)) {
                if ((this.command === 'bet' || this.command === 'won')) {
                    this.betDescriptionOrWinnerName = this.command === 'bet' ? textParts.join(' ') : textParts.join(' ').toLowerCase();
                    this.isValid = this.betDescriptionOrWinnerName.length > 0 ? true : false;
                } else {
                    this.isValid = true;
                }
            }
        }
    }

    setCommand (text) {
        const commands = ['--help', 'bet', 'take', 'won', 'cancel', 'push'];
        let lowestIndex = null;
        let firstCommand = '';

        for (let command of commands) {
            let commandIndex = text.indexOf(command);

            if (commandIndex > -1) {
                if (lowestIndex === null) {
                    lowestIndex = commandIndex;
                    firstCommand = command;
                } else if (commandIndex <= lowestIndex) {
                    lowestIndex = commandIndex;
                    firstCommand = command;
                }
            }
        }

        return firstCommand;
    }
}

module.exports = Message;