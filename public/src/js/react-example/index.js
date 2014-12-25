var React = require('react');

// Simple unrecommended way to save state between route changes.
// A Reflux store should be used instead for the sake of expandability
// and convention but this is just a simple demo for react.
var name = 'friend';

module.exports = React.createClass({
  displayName: 'ReactExample',
  getInitialState: function(){
    return {
      name: name
    };
  },
  updateName: function(){
    name = this.refs.name.getDOMNode().value.trim();
    this.setState({
      name: name
    });
  },
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
