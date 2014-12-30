var React = require('react'),
  ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Glyphicon = ReactBootstrap.Glyphicon;

var actions = require('./actions');

// Define a view-controller for a single post (row in a table)
var Post = React.createClass({
  // Enforce certain types for props of a post
  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    body: React.PropTypes.string
  },

  // Event handler for the deletion of this post
  handleDelete: function(){
    // Call the deletePost action with this posts ID
    actions.deletePost(this.props.id);
  },

  // Render out a table row (`<tr>`)
  render: function(){
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.body}</td>
        <td><Button onClick={this.handleDelete} bsStyle="danger">
          <Glyphicon glyph="trash" /> Delete
        </Button></td>
      </tr>
    );
  }
});

module.exports = Post;