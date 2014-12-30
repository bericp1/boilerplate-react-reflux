var React = require('react'),
  ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Glyphicon = ReactBootstrap.Glyphicon;

var actions = require('./actions');

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

module.exports = RefluxExampleHeading;