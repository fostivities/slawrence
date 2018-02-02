// UserController.js
const superAgent = require('superagent');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const handleCommands = require('./components/commandController'); 

const allowedNames = ['@sb ', '@slawrence '];
const groupMeUrl = 'https://api.groupme.com/v3/bots/post';
const response = {
    "bot_id": "4091fd6b5183549c40fd901abc",
    "text": ""
};

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

checkForSB = (text) => {
    return text && (text.indexOf(allowedNames[0]) > -1 || text.indexOf(allowedNames[1]) > -1);
}

removeSBName = (text) => {
    return text.indexOf(allowedNames[0]) > -1
        ? text.replace(allowedNames[0], '')
        : cleanText = text.replace(allowedNames[1], '');
}

handleGroupMePost = (req, res) => {
    let text = req.body.text.toLowerCase();

    if (checkForSB(text)) {
        text = removeSBName(text);

        response.text = handleCommands(text);

        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            res.status(200).send(response);
        } else {
            superAgent.post(groupMeUrl)
                .send(response)
                .then(() => {
                    res.status(200).end();
                })
                .catch((err) => {

                });
        }
    } else {
        res.status(200).send('no sb');
    }
}

router.post('/', (req, res) => handleGroupMePost(req, res));

module.exports = router;