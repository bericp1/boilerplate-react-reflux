var React = require('react');

var ReactBootstrap = require('react-bootstrap'),
  Input = ReactBootstrap.Input,
  Well = ReactBootstrap.Well;

// Simple unrecommended way to save state between route changes.
// A Reflux store should be used instead for the sake of expandability
// and convention but this is just a simple demo for React.
var name = 'friend';

// Create a react view-controller
var ReactExample = React.createClass({
  // Called whenever the route is changed to the one associated with this
  // view-controller. We'll load the variable-stored name into the state.
  getInitialState: function(){
    return {
      name: name
    };
  },
  // Updates the state and the variable to the value of the nested input
  updateName: function(){
    name = this.refs.name.getValue().trim();
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
        <Well>
          <strong>Hello</strong>, <em>{this.state.name}</em>!
        </Well>
        <div>
          <Input
            label="Name"
            type="text"
            ref="name"
            onKeyUp={this.updateName}
            defaultValue={name} />
        </div>
      </div>
    );
  }
});

// Export ot
module.exports = ReactExample;
