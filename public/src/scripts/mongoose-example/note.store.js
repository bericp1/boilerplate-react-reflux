var Reflux = require('reflux'),
  actions = require('./note.actions'),
  extractError = require('lib/extract-jquery-ajax-error');

var state = {
  notes: [],
  awaiting: [],
  responses: {}
};

module.exports = Reflux.createStore({
  listenables: actions,

  getNotes: function(){
    return state.notes;
  },

  awaiting: function(tag){
    return $.inArray(tag, state.awaiting) != -1;
  },

  responded: function(tag){
    return state.responses.hasOwnProperty(tag);
  },

  claim: function(tag){
    var response = state.responses[tag];
    if(!response){
      return false;
    }else{
      delete state.responses[tag];
      return response;
    }
  },

  advanceTag: function(tag, success, data){
    if(tag){
      if(success)
        state.responses[tag] = {success: true, data: data};
      else
        state.responses[tag] = {success: false, err: data};

      state.awaiting = state.awaiting.filter(function(other){
        return other !== tag;
      });
    }
  },

  setNotes: function(tag){
    return function(notes){
      state.notes = notes;
      this.advanceTag(tag, true, notes);
    }.bind(this);
  },

  deleteNote: function(tag){
    return function(note){
      state.notes = state.notes.filter(function(other){
        return other._id !== note._id;
      });
      this.advanceTag(tag, true, note);
    }.bind(this);
  },

  addNote: function(tag){
    return function(note){
      state.notes.push(note);
      this.advanceTag(tag, true, note);
    }.bind(this);
  },

  handleServerError: function(tag){
    return function(err){
      this.advanceTag(tag, false, extractError(err));
    }.bind(this);
  },

  setupRequest: function(tag){
    if(tag) state.awaiting.push(tag);
    this.trigger(state);
  },

  finishRequest: function(){
    this.trigger(state);
  },

  onReloadNotes: function(tag){
    state.notes = [];
    this.setupRequest(tag);

    $.get('/api/notes')
      .done(this.setNotes(tag))
      .fail(this.handleServerError(tag))
      .always(this.finishRequest);
  },

  onDeleteNote: function(tag, id){
    this.setupRequest(tag);

    $.delete('/api/notes', {id: id})
      .done(this.deleteNote(tag))
      .fail(this.handleServerError(tag))
      .always(this.finishRequest);
  },

  onAddNote: function(tag, title, body){
    this.setupRequest(tag);

    $.post('/api/notes', {title: title, body: body})
      .done(this.addNote(tag))
      .fail(this.handleServerError(tag))
      .always(this.finishRequest);
  }
});