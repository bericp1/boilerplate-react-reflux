var React = require('react'),
  Reflux = require('reflux'),
  Router = require('react-router'),
  Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  Redirect = Router.Redirect,
  RouteHandler = Router.RouteHandler,
  Link = Router.Link;

var Application = React.createClass({
  render: function(){
    return (
      <div>
      <header>
      <h1>Test Page</h1>
      <strong>Examples:</strong>
      <Link to="react">React</Link>
      <Link to="reflux">Reflux</Link>
      </header>
      <RouteHandler />
      </div>
    );
  }
});

var ReactExample = require('./react-example'),
  RefluxExample = require('./reflux-example');

var routes = (
  <Route name="app" path="/" handler={Application}>
    <Route name="react" handler={ReactExample} />
    <Route name="reflux" handler={RefluxExample} />
    <Redirect from="/" to="/react" />
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById('app-root'));
});
