var React = require('react');

module.exports = React.createClass({
  displayName: 'ReactExample',
  getInitialState: function(){
    return {
      name: "friend"
    };
  },
  updateName: function(){
    this.setState({
      name: this.refs.name.getDOMNode().value.trim()
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
          <input type="text" placeholder="Enter name here" ref="name" onKeyUp={this.updateName} defaultValue="friend" />
        </div>
      </div>
    );
  }
});
