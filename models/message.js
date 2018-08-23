const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;
const request = require('request');

const MessagesSchema = new Schema({
    "sender": String,
    "reciever": String,
    "recieverName": String,
    "content": String,
    "sendDate": Date,
    "senderMetadata": Object,
    "recieverMetadata": Object,
    "seen": {type: Boolean, default: false},
    "seenDate": Date
}, {runSettersOnQuery: true});

MessagesSchema.pre('save', function (next) {
    this.sendDate = new Date();

    User.findById(this.reciever).select('fullname').then(user => {
        this.recieverName = user.fullname;
    })

    request('http://ip-api.com/json', 
        (err, response, body) => {
            if (err) {
                next();
            } else {
                let metadata = JSON.parse(body);
                console.log(typeof metadata);
                this.senderMetadata = metadata;
                next();
            }
            
        }
    );
});

const Message = mongoose.model('message', MessagesSchema);

module.exports = Message;