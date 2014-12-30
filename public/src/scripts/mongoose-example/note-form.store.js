var Reflux = require('reflux');

var noteFormActions = require('./note-form.actions');

var note = {
  title: '',
  body: ''
};

module.exports = Reflux.createStore({
  listenables: [noteFormActions],

  setNote: function(title, body){
    note.title = title;
    note.body = body;
  },

  onSave: function(title, body){
    this.setNote(title, body);
    this.trigger(note);
  },

  onLoad: function(){
    this.trigger(note);
  }
});