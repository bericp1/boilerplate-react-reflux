var React = require('react'),
  Reflux = require('reflux'),
  ReactBootstrap = require('react-bootstrap'),
  Panel = ReactBootstrap.Panel,
  Glyphicon = ReactBootstrap.Glyphicon,
  Button = ReactBootstrap.Button;

var store = require('./note.store'),
  actions = require('./note.actions');

var genTag = require('lib/random-string');

var NoteItem = React.createClass({
  propTypes: {
    _id: React.PropTypes.string,
    title: React.PropTypes.string,
    created: React.PropTypes.number,
    body: React.PropTypes.string
  },

  mixins: [Reflux.ListenerMixin],

  getInitialState: function(){
    return {
      loading: false,
      tag: genTag(),
      error: false
    };
  },

  checkResponse: function(){
    var state = {loading: store.awaiting(this.state.tag)};

    if(!state.loading && store.responded(this.state.tag)){
      var response = store.claim(this.state.tag);
      if(!response.success){
        state.error = 'Error deleting this note. ' + response.err;
        state.tag = genTag();
      }
    }

    if(this.isMounted()) this.setState(state);
  },

  componentDidMount: function(){
    this.listenTo(store, this.checkResponse);
  },

  handleDelete: function(){
    actions.deleteNote(this.state.tag, this.props._id);
  },

  getClassName: function(){
    classes = ['note'];
    if(this.state.loading) classes.push('note-loading');
    return classes.join(' ');
  },

  render: function(){
    this.created = new Date(this.props.created).toString();

    return (
      <Panel header={this.props.title + ' (' + this.props._id + ')'}
        className={this.getClassName()}>
        <div className="note-created">{this.created}</div>
        <div className="note-body">{this.props.body}</div>
        <Button onClick={this.handleDelete} bsStyle="danger" block>
          <Glyphicon glyph="trash" /> Delete
        </Button>
        <div className="text-danger">{this.state.error}</div>
      </Panel>
    );
  }
});

module.exports = NoteItem;