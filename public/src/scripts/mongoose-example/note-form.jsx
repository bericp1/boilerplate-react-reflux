var React = require('react'),
  Reflux = require('reflux'),
  Input = require('react-bootstrap').Input;

var noteStore = require('./note.store'),
  noteFormStore = require('./note-form.store'),
  noteActions = require('./note.actions'),
  noteFormActions = require('./note-form.actions');

var genTag = require('lib/random-string');

var NoteForm = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(noteFormStore)],

  getInitialState: function(){
    return {
      title: noteFormStore.getTitle(),
      body: noteFormStore.getBody(),
      tag: genTag(),
      error: false,
      message: false,
      loading: false
    }
  },

  componentWillUnmount: function(){
    noteFormActions.save(
      this.refs.title.getValue(),
      this.refs.body.getValue()
    );
  },

  checkResponse: function(){
    var state = {loading: noteStore.awaiting(this.state.tag)};

    if(!state.loading && noteStore.responded(this.state.tag)){
      var response = noteStore.claim(this.state.tag);
      if(response.success){
        state.title = '';
        state.body = '';
        state.error = false;
        state.message = 'Successfully added note: "' + response.data.title + '"';
      }else{
        state.message = false;
        state.error = 'Error adding note. ' + response.err;
      }
      state.tag = genTag();
    }

    this.setState(state);
  },

  componentDidMount: function(){
    this.listenTo(noteStore, this.checkResponse);
  },

  handleSubmit: function(event){
    event.preventDefault();
    if(this.state.loading) return;
    noteActions.addNote(
      this.state.tag,
      this.refs.title.getValue(),
      this.refs.body.getValue()
    );
  },


  handleChange: function(){
    this.setState({
      message: false,
      error: false,
      title: this.refs.title.getValue(),
      body: this.refs.body.getValue()
    });
  },

  render: function(){
    return (
      <div>
        <h2>Add a Note</h2>
        <div className="text-center text-danger">
          <strong>{this.state.error}</strong>
        </div>
        <div className="text-center text-success">
          <strong>{this.state.message}</strong>
        </div>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            label="Title"
            placeholder="Title"
            ref="title"
            disabled={this.state.loading}
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Input
            type="textarea"
            label="Body"
            placeholder="This is the body."
            ref="body"
            disabled={this.state.loading}
            value={this.state.body}
            onChange={this.handleChange}
          />
          <Input type="submit"
            value={this.state.loading ? 'Adding...' : 'Add'}
            disabled={this.state.loading}
            bsStyle="info"
            block
          />
        </form>
      </div>
    );
  }
});

module.exports = NoteForm;