const mongoose = require('mongoose');
const { emitWarning } = require('process');

let studentSchema = new mongoose.Schema({
    username: String,
    password: String,
})

let Mouse = mongoose.model('Mouse', studentSchema);
module.exports = {
    Mouse
}