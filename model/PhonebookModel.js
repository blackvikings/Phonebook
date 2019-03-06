var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type:Number,
        required: true
    }
});

var Contact = module.exports = mongoose.model('contact', contactSchema);

module.exports.get = function(callback, limit){
    Contact.find(callback).limit(limit);
}