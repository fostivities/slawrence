const errorCommand = require('./errorCommand');

const setCommand = (message) => {
    let setResponse = '';
    let text = message.text;
    let betParts = text.split(' ');

    if (betParts.length >= 2 && !isNaN(betParts[0])) {
        let betAmount = betParts.splice(0, 1);
        let betDescription = '';
        
        for (let betPart of betParts) {
            betDescription += betPart;
        }

        setResponse = betAmount + ' ' + betDescription;

        setResponse = '$' + betAmount + ' ' + betDescription;
    } else {
        setResponse = errorCommand(1);
    }

    return setResponse;
}

module.exports = setCommand;