const mongoose = require('mongoose');
const assert = require('assert');

mongoose.Promise = global.Promise;

const URI = 'mongodb://localhost:27017/node-command-line-lab';
const db = mongoose.connect(URI, { useMongoClient: true });

function toLower(val) {
    return val.toLowerCase();
}

const contactSchema = mongoose.Schema({
    firstName: { type: 'String', set: toLower },
    lastName : { type: 'String', set: toLower },
    phone    : { type: 'String', set: toLower },
    email    : { type: 'String', set: toLower },
});

const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact) => {
    Contact.create(contact, (err) => {
        if(err) throw new Error(err);
        console.info('New contact added');
        db.close();
    });
};

const getContact = (name) => {
    const search = new RegExp(name, 'i');

    Contact.find({ $or: [{ firstName: search }, { lastName: search }] })
        .exec((err, contact) => {
            if(err) throw new Error(err);
            console.info(contact);
            console.info(`${ contact.length } matches`);
            db.close();
        });
};

module.exports = { addContact, getContact };