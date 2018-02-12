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
    'bot_id': '',
    'text': ''
};

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const handleGroupMePost = (req, res) => {
    response.bot_id = req.body.group_id === '20928092' ? '3d5d13cef07f7e01d614b510d9' : '4091fd6b5183549c40fd901abc';

    if (req.body.sender_type !== 'bot' && req.body.text && req.body.text.indexOf('@sb ') > -1) {
        let message = new Message(req.body);

        if (!message.isValid) {
            response.text = message.errorResponse;
            respond(res);
        } else {
            commandController(message)
                .then((commandResponse) => {
                    response.text = commandResponse;
                    respond(res);
                })
        }
    }

    res.status(200).send();
}

const respond = (res) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        res.status(200).send(response);
    } else {
        superAgent.post(groupMeUrl)
            .send(response)
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                res.status(200).end('There was an error in posting. Error: ' + err);
            });
    }
}

router.post('/', (req, res) => handleGroupMePost(req, res));

module.exports = router;