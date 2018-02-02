errorCommand = (errorCode) => {
    let response = '';

    const errorCodes = {
        0: 'No command found in message.',
        1: 'There was an error in processing your set command.'
    };

    return errorCodes[errorCode] + ' Please use \'@sb --help\' for reference.'
}

module.exports = errorCommand;