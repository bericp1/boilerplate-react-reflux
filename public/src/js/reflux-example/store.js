var Reflux = require('reflux'),
  actions = require('./actions');

module.exports = Reflux.createStore({
  STATE_LOADING: 'loading',
  STATE_OK: 'ok',
  STATE_ERR: 'err',

  listenables: actions,

  updateFromServer: function(){
    $.get('/assets/posts.json')
      .done(function(data){
        this.data = {
          state: this.STATE_OK,
          posts: data
        };
      }.bind(this))
      .fail(function(){
        this.data.state = this.STATE_ERR;
        this.data.error = 'Could not fetch posts from server.';
      }.bind(this))
      .always(function(){
        this.trigger(this.data);
      }.bind(this));
  },
  init: function(){
    this.data = {
      state: this.STATE_LOADING,
      posts: []
    };
    this.trigger(this.data);
    this.updateFromServer();
  },
  deletePost: function(postId){
    this.data.posts = this.data.posts.filter(function(post){
      return post.id !== postId;
    });
    this.trigger(this.data);
  },
  reloadPosts: function(){
    this.updateFromServer();
  }
});
