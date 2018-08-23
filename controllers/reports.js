const Report = require('../models/report');
const shortid = require('shortid');

const matchSender = require('./messages').matchSender;

const minChars = 10;

const reportKey = shortid.generate();

module.exports.newReport = (req, res, next) => {

    upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
        //   return res.status(403).send({message: "File has to be an image"});
        }
        let { sender, content } = req.body;
        if (content.length < minChars) {
            return res.status(403).send({message: `A report has to be at least ${minChars} characters`});
        }

        if ( !matchSender(req) ) {
            return res.status(401).send({message: "User not logged in"});
        }

        newReport = new Report({
            sender,
            content,
            reportKey
        }).save().then(report => {
            return res.status(201).send({message: "Report successfully sent"});
        }).catch(err => {
            return res.status(500).send({message: "Couldn't send report => " + err});
        })
    })
}