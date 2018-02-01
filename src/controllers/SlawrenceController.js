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
    return (
        'Slawrence\'s help section:\n'
        + 'To set a bet: Use \'@sb <bet amount in number form>/<bet description>\'\n'
        + 'Example: \'@sb 4/hawks win the championship\'\n\n'
        + 'Once a bet is set, a unique ID will be returned for people to accept the bet.\n'
        + 'Example: \'From Slawrence - Bet Set - Use \'@sb take 112\' to accept\'\n\n'
        + 'To accept a bet: Use \'@sb take <bet id>\''
        + 'Example: \'@sb take 112\''
    );
}

handleGroupMePost = (req, res) => {
    let body = req.body;
    let text = body.text;

    if (checkForSB(text)) {

        response.text = text.indexOf('--help') ? setHelpResponse() : setBetResponse();

        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            res.status(200).send(response);
        } else {
            superAgent.post(groupMeUrl)
                .send(response)
                .end((err, res) => {
                    //TODO
                });
        }
    } else {
        res.status(200).send('No @sb');
    }
}

router.post('/', (req, res) => handleGroupMePost(req, res));

module.exports = router;