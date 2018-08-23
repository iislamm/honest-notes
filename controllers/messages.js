const User = require('../models/user');
const Message = require('../models/message');

const minCharcters = 3;

let lengthChecker = (msg) => {
    if (msg.length < minCharcters) {
        return false;
    }
    return true;
}

let urlify = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
}

let matchSender = (req) => {
    if (req.user._id == req.body.sender) {
        return true;
    } else {
        return false;
    }
}

module.exports.matchSender = matchSender;

module.exports.newMessage = (req, res, next) => {
    // Get the sent data from the request body
    let { sender, reciever, content } = req.body;
    
    //Check if the message contains enough content
    if ( !lengthChecker(content) ) {
        return res.status(401).send({ message: `Message should have at least ${minCharcters} characters` });
    } else if ( !matchSender(req) ) {
        return res.status(403).send({ message: "Sender is not logged in" });
    }

    // parse urls from the message and replace it with the 
    content = urlify(content);

    // Save the message
    let newMessage = new Message({
        sender,
        reciever,
        content
    }).save().then(message => {
        res.status(201).send({message: "Message sent"});
    }).catch(err => {
        res.status(500).send({message: "Couldn't save message => " + err});
    });

}

module.exports.getUserInbox = (req, res, next) => {
    Message.find({reciever: req.user._id}).sort({sendDate: -1}).select("-sender").then(messages => {
        res.status(200).send({messages: messages});
    }).catch(err => {
        res.status(500).send({message: "couldn't find messages"});
    })
}

module.exports.getUserSentbox = (req, res, next) => {
    Message.find({sender: req.user._id}).sort({sendDate: -1}).then(messages => {
        res.status(200).send({messages: messages});
    }).catch(err => {
        res.status(500).send({message: "couldn't find messages"});
    })
}

module.exports.getUnseen = (req, res, next) => {
    Message.find({reciever: req.user._id, seen: false}).sort({sendDate: -1}).then(messages => {
        return res.status(200).send({unseen: messages.length});
    }).catch(err => {
        return res.status(500).send({message: "Couldn't get unseen messages"});
    })
}

module.exports.setSeen = (req, res, next) => {

    Message.updateMany({reciever: req.user._id, seen:false}, {seen: true, seenDate: new Date}).then(messages => {
        res.status(200).send({message: "Seen set"}); 
    })
}