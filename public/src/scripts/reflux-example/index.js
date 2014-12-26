var React = require('react'),
  Reflux = require('reflux');

var store = require('./store'),
  actions = require('./actions');

var ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Glyphicon = ReactBootstrap.Glyphicon;

var RefluxExampleHeading = React.createClass({
  render: function(){
    return (
      <div>
        <Button
          onClick={actions.reloadPosts}
          bsStyle="info"
          className="pull-right">
            <Glyphicon glyph="refresh" /> Reload
        </Button>
        <h2>Basic Reflux Test</h2>
      </div>
    );
  }
});

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
          <Glyphicon glyph="trash" /> delete
        </Button></td>
      </tr>
    );
  }
});

// Create this compnonent's root view-controller and export it.
// Notice the use of displayName. See [react-example](../react-example/index.js)
// for an explanation.
module.exports = React.createClass({
  displayName: 'RefluxExample',

  // Connect this view-controller's state to our store so that when the store
  // triggers, its payload will end up in this.state.store
  mixins: [Reflux.connect(store, 'store')],

  getInitialState: function(){
    return {
      store: store.data
    };
  },

  // Returns a view-controller for showing the table of posts
  renderPosts: function(){
    // We construct a new array of Post view-controllers from
    // the post's meta data
    var posts = this.state.store.posts.map(function(post){
      return (
        <Post key={post.id} {...post} />
      );
    });
    // Then show them in a table with a reload button that calls
    // the reloadAction when clicked
    return (
      <div>
        <RefluxExampleHeading />
        <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts}
        </tbody>
        </table>
      </div>
    );
  },

  // Renders a simple message instead of the posts table
  renderMessage: function(message){
    return (
      <div>
        <RefluxExampleHeading />
        <div className="text-primary text-center"><strong><em>{message}</em></strong></div>
      </div>
    );
  },

  // Render the full component based on the state of the store
  render: function(){
    switch(this.state.store.state){
      case store.STATE_LOADING:
        return this.renderMessage('Posts are loading...');
      case store.STATE_ERR:
        return this.renderMessage('There was an error loading posts: ' +
          this.state.store.error);
      case store.STATE_OK:
        return this.renderPosts();
      default:
        console.error('Improper state on reflux-example/store:', this.state.store.state);
        return this.renderMessage('An unknown error occurred.');
    }
  }
});
