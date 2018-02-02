const errorCommand = require('./errorCommand');

setValidation = (betParts) => {
    // Check if there is a '/' in the message
    // Check if the first piece is a number
    return betParts.length >= 2 && !isNaN(betParts[0]);
}

setCommand = (text) => {
    let setResponse = '';
    let betParts = text.split("/");

    if (setValidation(betParts)) {

    } else {
        setResponse = errorCommand(1);
    }

    return setResponse;
}

module.exports = setCommand;