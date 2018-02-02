// UserController.js
const superAgent = require('superagent');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const groupMeUrl = 'https://api.groupme.com/v3/bots/post';
const allowedNames = ['@sb', '@slawrence'];
const response = {
    "bot_id": "4091fd6b5183549c40fd901abc",
    "text": ""
};

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

checkForSB = (text) => {
    return text && (text.indexOf(allowedNames[0]) > -1 || text.indexOf(allowedNames[1]) > -1);
}

checkForHelpText = (text) => {
    return text.indexOf('--help') > -1;
}

setHelpResponse = () => {
    let title =             'Slawrence\'s help section:\n';
    let nameUse =           'Use @sb or @slawrence for commands (case doesn\'t matter)\n\n';

    let definitions =       'Definitions\n'
                            + 'setter:\n'
                            + 'person who made the bet.\n'
                            + 'taker\n'
                            + 'person who accepted the bet\n\n';

    let commands =          'Commands:\n'
                            + 'Use @sb +\n'
                            + 'set [betID]/[bet description]\n'
                            + 'take [betID]\n'
                            + 'won [betID] [setter/taker]\n'
                            + 'cancel [betID]\n\n';

    let extra =             'Once a bet is created using \'set\''
                            + ' a [betID] will be returned for use\n\n'

    // For more info on commands use 
    // '@sb --help [command]'
    
    // let setBet =            'Set Bet:\n'
    //                         + '\'@sb <bet amount>/<bet description>\'\n\n';

    // let setBetResponse =    'Set bet bot response:\n'
    //                         + 'Bet made, ID is <betID>\n'
    //                         + 'Use \'@sb <betID> take\' to set bet\n\n';

    // let acceptBet =         'Accept bet:\n'
    //                         + '\'@sb <betID> take\'\n\n';

    // let acceptBetResponse = 'Accept bet bot response:\n'
    //                         + '\'Bet <betID> set for\n'
    //                         + '<user1> and <user2>\'\n\n';
    
    // let winBet =            'Win bet:\n'
    //                         + '\'@sb <betID> won by <setter/taker>\'\n\n';

    // let winBetResponse =    'Win bet bot response:\n'
    //                         + '\'Win confirmed for <betID>\'\n\n';

    // let cancelBet =       'Cancel bet:\n'
    //                         + '\'@sb <betID> cancel\'\n\n';

    let notes =             'Notes:\n'
                            + '1 .Cancelling the bet will remove the '
                            + 'bet entirely.\n\n'
                            + '2. Commands are based on the user that '
                            + 'issued them. For example, user 3 '
                            + 'cannot cancel a bet between user 1 '
                            + 'and user 2.\n\n'
                            + '3. Currently only supports one vs. one '
                            + 'betting.\n\n';

    let visit =             'visit: https://fostivities.github.io/fostco/slawrence'
                            + ' to view bet statistics.';

    return title 
            + nameUse
            + definitions
            + commands
            + extra
            // + setBet
            // + setBetResponse
            // + acceptBet
            // + acceptBetResponse
            // + winBet
            // + cancelBet
            + notes
            + visit;
}

handleGroupMePost = (req, res) => {
    let body = req.body;
    let text = body.text;

    if (checkForSB(text)) {

        response.text = text.indexOf('--help') > -1 ? setHelpResponse() : setBetResponse();

        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            res.status(200).send(response);
        } else {
            superAgent.post(groupMeUrl)
                .send(response)
                .end((err, res) => {
                    //TODO
                });
        }
    }
}

router.post('/', (req, res) => handleGroupMePost(req, res));

module.exports = router;