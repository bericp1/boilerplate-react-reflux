var React = require('react'),
  Reflux = require('reflux');

var NoteItem = require('./note-item.jsx');

var store = require('./note.store'),
  actions = require('./note.actions');

var genTag = require('lib/random-string');

var NoteList = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function(){
    return {
      notes: [],
      tag: genTag(),
      loading: false,
      error: false
    }
  },

  checkResponse: function(payload){
    var state = {loading: store.awaiting(this.state.tag)};

    if(!state.loading && store.responded(this.state.tag)){
      var response = store.claim(this.state.tag);
      if(response.success){
        state.error = false;
      }else{
        state.error = 'Error reloading notes. ' + response.err;
      }
      state.tag = genTag();
    }

    state.notes = payload.notes;

    this.setState(state);
  },

  componentDidMount: function(){
    this.listenTo(store, this.checkResponse);
    actions.reloadNotes(this.state.tag);
  },

  render: function(){
    var notes = this.state.notes.map(function(note){
      return (
        <NoteItem key={note._id} {...note} />
      );
    });

    if(notes.length === 0) notes = false;

    return (
      <div>
        <h2>All Notes</h2>
        <div className="text-center text-danger"><strong>{this.state.error}</strong></div>
        <div className="text-center text-primary"><strong>{this.state.loading ? 'Loading...' : false}</strong></div>
        <div className="note-list">{notes}</div>
      </div>
    );
  }
});

module.exports = NoteList;