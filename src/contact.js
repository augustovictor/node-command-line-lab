#!/usr/bin/env node

const commander = require('commander');
const { prompt } = require('inquirer');

const { addContact, getContact } = require('./logic');

const questions = [{
        type: 'input',
        name: 'firstName',
        message: 'Enter firstname ...'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter lastname ...'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter phone number ...'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address ...'
    }
];


commander
    .version('0.0.1')
    .description('Contacts management sys');

commander
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
        prompt(questions).then(addContact);
    });

commander
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name));

commander.parse(process.argv);