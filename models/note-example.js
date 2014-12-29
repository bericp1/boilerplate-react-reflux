var mongoose = require('mongoose');

var NoteExampleSchema = mongoose.Schema({
    title: String,
    body: String,
    created: {type: Number, default: Date.now}
});

module.exports = mongoose.model('Note', NoteExampleSchema);