const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect('mongodb://localhost:27017/student')
    .then((res) => {
        console.log('Connecting to the Database');
    }).catch((err) => {
        throw new Error('Error connecting to the database: ' + err);
    })
}

module.exports = {
    connectToDatabase
}

