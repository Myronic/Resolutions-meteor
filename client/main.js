import {Resolutions} from './../mongodb.js'
import { Template } from 'meteor/templating';
import './main.html';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

Template.body.helpers({
  resolutions: function(){

    if(Session.get('hideFinished'))
      return Resolutions.find({checked: {$ne:true}});
    else
      return Resolutions.find();
  },

  //to sync main checkbox with list items
  hideFinished: ()=> Session.get('hideFinished')
})

Template.body.events({
  'submit .new-resolution': function(event){
    var title = event.target.title.value;
    var i = event.target.month.value;
    var month = months[parseInt(i)]
    Resolutions.insert({
      rank : i,
      title: title,
      month: month,
    });

    event.target.title.value="";
    return false;
  },


  'change .hide-finished': function(event){
    Session.set('hideFinished', event.target.checked);
    console.log(Session);
  },

  'click .allclear': function(){
    Resolutions.remove({});
    // Resolutions.drop();
    // Resolutions.deleteMany({});
  }
});


Template.resolution.events({
  'click .toggle-checked': function(){
    Resolutions.update(this._id, {$set: {checked: !this.checked} })
  },

  'click .remove': function(){
    Resolutions.remove(this._id);
  }
});


Template.clearAll.events({
  // 'click .allclear': function(){
  //   Resolutions.remove({});
  //   // Resolutions.drop();
  //   // Resolutions.deleteMany({});
  // }
});

