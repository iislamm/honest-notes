const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservedUsernameSchema = new Schema({
    "username": String
});

const ReservedUsername = mongoose.model('reservedUsername');

module.exports = ReservedUsername;