var express = require('express');
var router = express.Router();
const request = require('request');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport')

const User = require('../models/user');

var recordLogin = (username) => {
    //Get the geodata of the user
    request('http://ip-api.com/json', 
        (err, response, body) => {
            let metaData = JSON.parse(body);
            // Log the user's login in the login history
            User.findOneAndUpdate(
                {username: username},
                {
                    $push: {"loginHistory": {time: new Date(), metaData: metaData}},
                    country: metaData.country
                },
                ( err, data ) => {
                    if ( err || ! data ) {
                        console.log("Couldn't log the user's login!", new Date());
                    } else {
                        console.log("User login successfully logged");
                    }
                }
            );
        }
    );
}

module.exports.emailLogin = (req, res, next) => {
    let { username, password } = req.body;
    
    User.findOne({$or: [ {username: username}, {email: username} ]})
        .then(data => {
            if ( !data ) {
                // Couldn't find the user usernam or email
                return res.status(401).send({success: false, message: "Invalid credentials"});
            } else {
                // Check the password
                bcrypt.compare(password, data.password, (err, passwordCheck) => {
                    if ( passwordCheck ) {
                        // Recocrd the user's login
                        recordLogin(username); 

                        // generate the token
                        const token = jwt.sign(data.toJSON(), config.secret, { expiresIn: 7 * 24 * 60 * 60 * 1000 });
                        
                        // All ok, send the token to the client
                        return res.status(200).send({
                            token: 'Bearer ' + token,
                            user: {
                                _id: data._id,
                                username: data.username,
                                fullname: data.fullname,
                                email: data.email,
                                avatarPath: data.avatarPath,
                                birthDate: data.birthDate,
                                gender: data.gender,
                                country: data.country,
                                timezone: data.timezone,
                                activationStatus: data.activationStatus,
                                loginHistory: data.loginHistory,
                                bio: data.bio
                            }
                        });
    
                    } else {
                        // Invalid password
                        return res.status(401).send({success: false, message: "Invalid credentials"});
                    }
                });
            }
        }).catch(err => {
            return res.status(500).send({success: false, message: "Server Error"});
        })
}


module.exports.userAuth = (req, res, next) => {
    // By reaching this method in routers/users.js, that means that the token sent from the client is right
    res.status(200).send({
        user: {
            id: req.user._id,
            username: req.user.username,
            fullname: req.user.fullname,
            email: req.user.email,
            avatarPath: req.user.avatarPath,
            birthDate: req.user.birthDate,
            gender: req.user.gender,
            country: req.user.country,
            timezone: req.user.timezone,
            activationStatus: req.user.activationStatus
        }
    })
}