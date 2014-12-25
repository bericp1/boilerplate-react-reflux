var React = require('react'),
  Reflux = require('reflux');

var store = require('./store'),
  actions = require('./actions');

var Post = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    body: React.PropTypes.string
  },
  handleDelete: function(){
    actions.deletePost(this.props.id);
  },
  render: function(){
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.body}</td>
        <td><button onClick={this.handleDelete}>delete</button></td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  displayName: 'RefluxExample',
  mixins: [Reflux.connect(store, 'store')],
  getInitialState: function(){
    return {
      store: store.data
    };
  },
  render: function(){
    console.log(this, 'rendering');
    var posts = this.state.store.posts.map(function(post){
      return (
        <Post key={post.id} {...post} />
      );
    });
    return (
      <div>
        <h2>Basic Reflux Test</h2>
        <button onClick={actions.reloadPosts}>Reload</button>
        <table>
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
  }
});
