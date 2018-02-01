// UserController.js
var superAgent = require('superagent');
var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('../schemas/User');

// // creates a new user
// router.post('/', (req, res) => {
//     var reqBody = req.body;

//     if (reqBody.text) {
//         postMessage();
//     }

//     // User.create(
//     //     {
//     //         name: req.body.name,
//     //         email: req.body.email,
//     //         password: req.body.password
//     //     },
//     //     (err, user) => {
//     //         if (err) return res.status(500).send("There was a problem adding the information to the database.");
//     //         res.status(200).send(user);
//     //     });
// });

function temp (req, res) {
    let reqBody = req.body;

    if (reqBody.text) {
        // let options = {
        //     hostname: 'api.groupme.com',
        //     path: '/v3/bots/post',
        //     method: 'POST'
        // }

        let temp = {
            "bot_id": "4091fd6b5183549c40fd901abc",
            "text": "Hello World"
        }

        superAgent.post('https://api.groupme.com/v3/bots/post')
            .send(temp)
            .end(function(err, res) {
                //TODO
            });

        res.status(200).send(temp);
    }
}

router.post('/', (req, res) => temp(req, res));

function postMessage() {
    var botResponse, options, body, botReq;

    botResponse = "Hello World!";

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    }

    body = {
        "bot_id" : 12,
        "text" : botResponse
    }

    var botReq = http.request(options, function(res) {
        if (res.statusCode === 202 || res.statusCode === 302) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });
    
    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });
    
    botReq.end(JSON.stringify(body));
}

module.exports = router;