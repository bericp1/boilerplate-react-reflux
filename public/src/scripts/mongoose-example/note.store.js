var Reflux = require('reflux'),
  actions = require('./actions'),
  $ = require('jquery');

var STATE_ERR = 'err',
  STATE_LOADING = 'loading',
  STATE_OK = 'ok';

module.exports = Reflux.createStore({
  STATE_ERR: STATE_ERR,
  STATE_LOADING: STATE_LOADING,
  STATE_OK: STATE_OK,

  listenables: actions,

  init: function(){
    this.reloadNotes();
  },

  updateFromServer: function(){
    $.get('/api/notes')
      .done(function(data){
        this.data = {
          state: STATE_OK,
          notes: data
        };
      }.bind(this))
      .fail(function(err){
        this.data.state = STATE_ERR;
        this.data.error = (err.responseJSON && err.responseJSON.error) ?
          err.responseJSON.error : 'An unknown error occurred.';
        console.error('Failed to fetch notes from server:', err);
      }.bind(this))
      .always(function(){
        this.trigger(this.data)
      }.bind(this));
  },

  reset: function(){
    this.data = {
      state: STATE_LOADING,
      notes: []
    };
    this.trigger(this.data);
  },

  reloadNotes: function(){
    this.reset();
    this.updateFromServer();
  },

  deleteNote: function(id){
    this.reset();
    $.post('/api/notes/delete', {id: id})
      .done(function(data){
        this.data = {
          state: STATE_OK,
          notes: data
        };
      }.bind(this))
      .fail(function(err){
        this.data.state = STATE_ERR;
        this.data.error = (err.responseJSON && err.responseJSON.error) ?
          err.responseJSON.error : 'An unknown error occurred.';
        console.error('Failed to delete note with id ' + id + ' from server:');
        console.error(err);
      }.bind(this))
      .always(function(){
        this.trigger(this.data);
      }.bind(this));
  },

  addNote: function(title, body, cb){
    if(typeof cb !== 'function') cb = function(){};
    this.data.state = STATE_LOADING;
    this.trigger(this.data);
    $.post('/api/notes/add', {title: title, body: body})
      .done(function(note){
        this.data.notes.push(note);
        cb(null, note);
      }.bind(this))
      .fail(function(err){
        console.error('Failed to add note with title "' + title + '" to server:');
        console.error(err);
        cb((err.responseJSON && err.responseJSON.error) ?
          err.responseJSON.error : 'An unknown error occurred.');
      }.bind(this))
      .always(function(){
        this.data.state = STATE_OK;
        this.trigger(this.data);
      }.bind(this));
  }
});