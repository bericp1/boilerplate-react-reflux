var express = require('express'),
  Router = express.Router,

  mongoose = require('mongoose'),
  Note = require('../models/note-example.model');

var router = Router();

var getAll = function(req, res){
  Note.find(function(err, notes){
    if(err){
      res.status(500).send({error: 'There was an error with the database.'});
      console.error(err);
    }else{
      res.send(notes);
    }
  });
};

var deleteOne = function(req, res){
  //setTimeout(function(){res.status(500).send({error: 'Testing.'})},2000);
  if(!req.body || !req.body.id){
    res.status(400).send({error: 'A note must be specified to be deleted.'});
  }else{
    Note.findByIdAndRemove(req.body.id, function(err, note){
      if(err){
        res.status(500).send({error: 'There was an error with the database.'});
        console.error(err);
      }else{
        res.send(note);
      }
    });
  }
};

var addOne = function(req, res){
  if(!req.body || !req.body.title || !req.body.body){
    res.status(400).send({error: 'New notes must have a title and a body'});
  }else{
    var newNote = new Note({title: req.body.title, body: req.body.body});
    newNote.save(function(err, note){
      if(err){
        res.status(500).send({error: 'There was an error with the database.'});
        console.error(error);
      }else{
        res.send(note);
      }
    });
  }
};

router.get('/', getAll);
router.get('/all', getAll);
router.delete('/', deleteOne);
router.post('/', addOne);

module.exports = router;