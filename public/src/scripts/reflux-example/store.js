var Reflux = require('reflux'),
  actions = require('./actions'),
  $ = require('jquery');

// Export a new Reflux store
module.exports = Reflux.createStore({
  // Constants for marking state of store
  STATE_LOADING: 'loading',
  STATE_OK: 'ok',
  STATE_ERR: 'err',

  // Hook up the store to the actions in `actions.js`
  listenables: actions,

  // Pull posts from server and trigger to let listeners know
  // posts changed
  updateFromServer: function(){
    $.get('/assets/posts.json')
      .done(function(data){
        this.data = {
          state: this.STATE_OK,
          posts: data
        };
      }.bind(this))
      .fail(function(err){
        this.data.state = this.STATE_ERR;
        this.data.error = 'Could not fetch posts from server';
        if(err.responseJSON && err.responseJSON.error){
          this.data.error += ': ' + err.responseJSON.error;
        }else{
          this.data.error += '.';
        }
      }.bind(this))
      .always(function(){
        this.trigger(this.data);
      }.bind(this));
  },
  // Simply reload posts on init
  init: function(){
    this.reloadPosts();
  },
  // Delete a post based on ID.
  // TODO Handle ID not found; currently does nothing
  deletePost: function(postId){
    this.data.posts = this.data.posts.filter(function(post){
      return post.id !== postId;
    });
    this.trigger(this.data);
  },
  // Set default data, put into loading state, kick off posts fetch from
  // server, and let listeners know
  reloadPosts: function(){
    this.data = {
      state: this.STATE_LOADING,
      posts: []
    };
    this.trigger(this.data);
    this.updateFromServer();
  }
});
