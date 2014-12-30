var React = require('react'),
  Reflux = require('reflux');

var store = require('./store');

var ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Glyphicon = ReactBootstrap.Glyphicon,
  Table = ReactBootstrap.Table;

// We split up the component into parts; let's require those
var RefluxExampleHeading = require('./heading.jsx'),
  Post = require('./post.jsx');

var RefluxExample = React.createClass({
  // Connect this view-controller's state to our store so that when the store
  // triggers, its payload will end up in this.state.store
  mixins: [Reflux.connect(store, 'store')],

  // Pull initial state from store
  getInitialState: function(){
    return {
      store: store.getData()
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
        <Table>
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
        </Table>
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

module.exports = RefluxExample;
