var Reflux = require('reflux');

var note = {
  title: '',
  body: ''
};

module.exports = Reflux.createStore({
  listenables: [require('./note-form.actions'), require('./actions')],

  setNote: function(title, body){
    note.title = title;
    note.body = body;
  },

  onSave: function(title, body){
    this.setNote(title, body);
    this.trigger(note);
  }
});