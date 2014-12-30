var React = require('react'),
  ReactBootstrap = require('react-bootstrap'),
  Panel = ReactBootstrap.Panel,
  Glyphicon = ReactBootstrap.Glyphicon,
  Button = ReactBootstrap.Button;

var actions = require('./actions');

var NoteItem = React.createClass({
  propTypes: {
    _id: React.PropTypes.string,
    title: React.PropTypes.string,
    created: React.PropTypes.number,
    body: React.PropTypes.string
  },

  handleDelete: function(){
    actions.deleteNote(this.props._id);
  },

  render: function(){
    this.created = new Date(this.props.created).toString();

    return (
      <Panel header={this.props.title + ' (' + this.props._id + ')'} className="note">
        <div className="note-created">{this.created}</div>
        <div className="note-body">{this.props.body}</div>
        <Button onClick={this.handleDelete} bsStyle="danger" block>
          <Glyphicon glyph="trash" /> Delete
        </Button>
      </Panel>
    );
  }
});

module.exports = NoteItem;