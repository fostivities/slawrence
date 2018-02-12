const helpCommand = () => {
    return (
        'Slawrence\'s help section:\n'
        + 'Use @sb or @slawrence for commands (case doesn\'t matter)\n\n'

        + 'Definitions\n'
        + 'setter:\n'
        + 'person who made the bet.\n'
        + 'taker:\n'
        + 'person who accepted the bet\n\n'

        + 'Commands:\n'
        + 'Use @sb +\n'
        + 'bet [bet amount] [bet description]\n'
        + 'take [betID]\n'
        + 'won [betID] [setter/taker name]\n'
        + 'cancel [betID]\n\n'

        + 'Once a bet is created using \'set\' a [betID] will be returned for use\n\n'

        + 'Notes:\n'
        + '1. Cancelling the bet will remove the bet entirely.\n\n'
        + '2. Commands are based on the user that issued them. For example, user 3 cannot cancel a bet between user 1 and user 2.\n\n'
        + '3. Currently only supports one vs. one betting.\n\n'

        + 'To view bet statistics, visit: \n'
        + 'https://fostivities.github.io/fostco/slawrence'
    );
}

module.exports = helpCommand;