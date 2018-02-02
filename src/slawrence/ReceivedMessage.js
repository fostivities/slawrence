class ReceivedMessage {
    constructor(message) {
        this.isValid = false;
        this.id = message.sender_id;
        this.name = message.name;
        this.createdAt = message.created_at;
        this.text = cleanAndValidateText(message.text);
    }

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
}

module.exports = ReceivedMessage;