const errorCommand = (errorCode) => {
    let response = '';

    const errorCodes = {
        0: 'No command found in message.',
        1: 'There was an error in processing your set command.',
        2: 'There was an error in processing your take command.',
        3: 'There was an error in processing your won command',
        4: 'There was an error in processing your cancel command'
    };

    return errorCodes[errorCode] + ' Please use \'@sb --help\' for reference.'
}

module.exports = errorCommand; 