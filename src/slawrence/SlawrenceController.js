// UserController.js
const superAgent = require('superagent');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Message = require('./models/Message');
const commandController = require('./components/commandController'); 

const allowedNames = ['@sb ', '@slawrence '];
const groupMeUrl = 'https://api.groupme.com/v3/bots/post';
const response = {
    "bot_id": "4091fd6b5183549c40fd901abc",
    "text": ""
};

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

handleGroupMePost = (req, res) => {
    let messageText = req.body.text;
    if (messageText && messageText.indexOf('@sb ') > -1) {
        let message = new Message(req.body);

        response.text = message.isValid ? commandController(message) : message.errorResponse;
        respond(res, response.text);
    }
}

respond = (res, responseMessage) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        res.status(200).send(response);
    } else {
        superAgent.post(groupMeUrl)
            .send(response)
            .catch((err) => {
                res.status(200).end('There was an error in posting. Error: ' + err);
            });
    }
}

router.post('/', (req, res) => handleGroupMePost(req, res));

module.exports = router;