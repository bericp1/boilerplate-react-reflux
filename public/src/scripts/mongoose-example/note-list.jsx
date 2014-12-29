var React = require('react'),
  Reflux = require('reflux');

var NoteItem = require('./note-item.jsx');

var store = require('./note.store');

var NoteList = React.createClass({
  mixins: [Reflux.connect(store, 'store')],
  getInitialState: function(){
    return {
      store: store.data
    };
  },
  render: function(){
    var content;
    switch(this.state.store.state){
      case store.STATE_OK:
        var items = this.state.store.notes.map(function(note){
          return (
            <NoteItem key={note._id} {...note} />
          );
        });
        content = (
          <div className="note-list">
          {items}
          </div>
        );
        break;
      case store.STATE_ERR:
        content = (
          <div className="text-center text-danger">
            Something went wrong: <strong>{this.state.store.error}</strong>
          </div>
        );
        break;
      default:
      case store.STATE_LOADING:
        content = (
          <div className="text-center text-info">
            <strong>Loading...</strong>
          </div>
        );
        break;
    }

    return (
      <div>
        <h2>All Notes</h2>
        {content}
      </div>
    );
  }
});

module.exports = NoteList;