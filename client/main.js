import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
import './main.html';


Template.body.helpers({
  notes (){
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();
    //get input value
    const target =event.target;
    const text = target.text.value;


    //insert note into collection

    /*
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    */

    Meteor.call('notes.insert', text);

   //clear form
   target.text.value ='';
  }
 });
 // Delete button click
Template.note.events ({
  'click .delete-note': function (){
    event.preventDefault();
    //Notes.remove (this._id)
    Meteor.call('notes.remove', this);
    return false;

  }
});