const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const request = require('request');

const ReportsSchema = new Schema({
    "sender": String,
    "content": String,
    "reportKey": String,
    "sendDate": Date,
    "senderMetadata": Object,
}, {runSettersOnQuery: true});

ReportsSchema.pre('save', function (next) {
    console.log("connected");
    request('http://ip-api.com/json',
        (err, response, body) => {
            if (body) {
                let metadata = JSON.parse(body);
                console.log(typeof metadata);
                this.senderMetadata = metadata;
                this.sendDate = new Date();          
                next();
            }else {
                console.log("Couldn't connect");
                next();
            }
        }
    );
});

const Report = mongoose.model('report', ReportsSchema);

module.exports = Report;