class ReceivedMessage {
    constructor(message) {
        this.isValid = false;
        this.id = message.sender_id;
        this.name = message.name;
        this.createdAt = message.created_at;
        this.text = cleanAndValidateText(message.text);
    }

    const commands = ['--help', 'set', 'take', 'won', 'cancel']

    cleanAndValidateText (text) {
        text = text.toLowerCase();

        if (checkForSB(text)) {
            this.isValid = true;
            return removeSBName(text);
        } else {
            return text;
        }
    }

    checkForSB() {
        return this.text && (this.text.indexOf(allowedNames[0]) > -1 || this.text.indexOf(allowedNames[1]) > -1);
    }

    removeSBName = () => {
        let text = this.text;
        return text.indexOf(allowedNames[0]) > -1
            ? text.replace(allowedNames[0], '')
            : cleanText = text.replace(allowedNames[1], '');
    }

    setCommand = (text) => {
        const commands = ['--help', 'set', 'take', 'won', 'cancel'];
        let lowestIndex = null;
        let firstCommand = '';
        let response = '';

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
    }
}

module.exports = ReceivedMessage;