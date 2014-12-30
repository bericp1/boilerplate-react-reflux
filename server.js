module.exports = function(app){

  // Custom routing can now be attached here

  // Uncomment to simulate error
  // app.use('/assets/posts.json', function(req, res, next){
  //   res.status(500).send({error: 'This is a serverside error.'});
  // });

  // Attach the example router
  app.use('/api/notes', require('./routes/api.notes-example'));

};