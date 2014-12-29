var React = require('react');

var NoteForm = require('./note-form.jsx'),
  NoteList = require('./note-list.jsx');

var NoteRoot = React.createClass({
    render: function(){
        return (
            <div>
                <NoteForm></NoteForm>
                <NoteList></NoteList>
            </div>
        );
    }
});

module.exports = NoteRoot;