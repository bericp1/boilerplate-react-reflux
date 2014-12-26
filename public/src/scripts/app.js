// Require libraries
var React = require('react'),
  Reflux = require('reflux'),
  Router = require('react-router'),
  Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  Redirect = Router.Redirect,
  RouteHandler = Router.RouteHandler,
  Link = Router.Link,

  ReactBootstrap = require('react-bootstrap'),
  Nav = ReactBootstrap.Nav,

  ReactRouterBootstrap = require('react-router-bootstrap'),
  NavItemLink = ReactRouterBootstrap.NavItemLink,
  ButtonLink = ReactRouterBootstrap.ButtonLink;

// Build the root applicatino React view-controller
var Application = React.createClass({
  render: function(){
    return (
      <div className="container main-container">
        <header>
          <Nav bsStyle="pills" className="pull-right">
            <NavItemLink to="react">React</NavItemLink>
            <NavItemLink to="reflux">Reflux</NavItemLink>
          </Nav>
          <h1 className="text-muted">Test Page</h1>
        </header>
        <RouteHandler />
      </div>
    );
  }
});

// Require individual app components
var ReactExample = require('./react-example'),
  RefluxExample = require('./reflux-example');

// Define react-router routes
var routes = (
  <Route name="app" path="/" handler={Application}>
    <Route name="react" handler={ReactExample} />
    <Route name="reflux" handler={RefluxExample} />
    <Redirect from="/" to="/react" />
  </Route>
);

// Run the router
Router.run(routes, function(Handler){
  // Render the root app view-controller
  React.render(<Handler />, $('#app-root')[0]);
});
