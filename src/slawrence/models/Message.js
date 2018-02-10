const noTextError = 'is missing the required text'

class Message {
    constructor(message) {
        this.isValid = false;
        this.id = message.sender_id || '';
        this.name = message.name.split(' ')[0] || '';
        this.createdAt = message.created_at || Date.now();
        this.text = '';
        this.command = '';

        this.cleanAndValidateText(message.text);

        this.errorResponse = this.isValid ? 'No error' : 'This message is missing required information or if formatted incorrectly. use \'@sb --help\' for reference.';

        this.tempText = {
            isValid: this.isValid,
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            text: this.text,
            command: this.command
        };
    }

    cleanAndValidateText (messageText) {
        messageText = messageText.toLowerCase();

        this.text = messageText.replace('@sb ', '');
        this.command = this.setCommand(this.text);

        if (this.command.length > 0) {
            this.text = this.text.replace(this.command, '').trim();
            this.isValid = this.text.length > 0 || this.command === '--help' ? true : false;
        }
    }

    setCommand (text) {
        const commands = ['--help', 'set', 'take', 'won', 'cancel'];
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