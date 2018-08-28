const request = require('request');
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportsSchema = new Schema({
    "content": {
        type: String,
        required: true
    },
    "time": Date
});

const LoginSchema = new Schema({
    time: Date,
    metaData: Object
});

const passwordReset = new Schema({
    key: String,
    expiresIn: Date
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatarPath: String,
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bio: String,
    country: String,
    timezone: String,
    registerDate: Date,
    activationCode: String,
    activationStatus: {
        type: Boolean,
        default: false
    },
    privilleges: {
        type: Number,
        comment: "0 = Normal User, 1 = Admin",
        default: 0
    },
    reports: [ReportsSchema],
    loginHistory: [LoginSchema],
    passwordReset: passwordReset

}, {runSettersOnQuery: true});

UserSchema.pre('save', function ( next ) {
    let metaData;

    this.registerDate = new Date();
    console.log("Register date set");

    // Activation code
    var activationCode = shortid.generate();
    this.activationCode = activationCode;
    console.log("Activation code set");

    request('http://ip-api.com/json', 
        (err, response, body) => {
            if ( ! err )  {
                metaData = JSON.parse(body);
                this.country = metaData.country
                this.timezone = metaData.timezone;
                next();
            } else {
                console.log("Error with the geoloaction api");
                next();
            }
        }
    );

    

});

const User = mongoose.model('users', UserSchema);

module.exports = User;