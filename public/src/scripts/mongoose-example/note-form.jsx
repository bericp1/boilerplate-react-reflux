var React = require('react'),
  Reflux = require('reflux'),
  Input = require('react-bootstrap').Input;

var store = require('./note.store'),
  actions = require('./actions');

var NoteForm = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount: function(){
    this.listenTo(store, function(payload){
      this.setState({
        loading: (payload.state === store.STATE_LOADING)
      });
    });
  },

  getInitialState: function(){
    return {
      error: '',
      loading: false
    }
  },

  reset: function(){
    this.refs.title.getInputDOMNode().value = '';
    this.refs.body.getInputDOMNode().value = '';
    this.setState({
      error: ''
    });
  },

  handleSubmit: function(event){
    event.preventDefault();
    if(this.state.loading) return;
    actions.addNote(
      this.refs.title.getValue(),
      this.refs.body.getValue(),
      function(err){
        if(err){
          this.setState({error: err});
        }else{
          this.reset();
        }
      }.bind(this)
    );
  },
  render: function(){
    return (
      <div>
        <h2>Add a Note</h2>
        <div className="text-center text-danger"><strong>{this.state.error}</strong></div>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            label="Title"
            placeholder="Title"
            ref="title"
            disabled={this.state.loading}
          />
          <Input
            type="textarea"
            label="Body"
            placeholder="This is the body."
            ref="body"
            disabled={this.state.loading}
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