var React = require('react');

// Simple unrecommended way to save state between route changes.
// A Reflux store should be used instead for the sake of expandability
// and convention but this is just a simple demo for React.
var name = 'friend';

// Export a react view-controller
module.exports = React.createClass({
  // Its necessary to include a displayName or create the React class on a
  // named variable and then export that variable. Otherwise, the view-
  // controller will be identified as `exports` which will likely cause
  // cause conflicts with other classes if you forget to do this for them.
  displayName: 'ReactExample',
  // Called whenever the route is changed to the one associated with this
  // view-controller. We'll load the variable-stored name into the state.
  getInitialState: function(){
    return {
      name: name
    };
  },
  // Updates the state and the variable to the value of the nested input
  updateName: function(){
    name = this.refs.name.getDOMNode().value.trim();
    this.setState({
      name: name
    });
  },
  // Render a title, the output portion, and the input portion.
  // This is a very simple demo and akin to the one on the React homepage
  render: function(){
    return (
      <div>
        <h2>Basic React Test</h2>
        <div>
          <strong>Hello</strong>, <em>{this.state.name}</em>!
        </div>
        <div>
          <input type="text" placeholder="Enter name here" ref="name" onKeyUp={this.updateName} defaultValue={name} />
        </div>
      </div>
    );
  }
});
