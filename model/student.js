var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    name : String,
    email : String,
    age : Number
});
var student = mongoose.model('student',studentSchema);
module.exports = student;