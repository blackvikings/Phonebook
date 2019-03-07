const joi = require('joi');
const bcryptjs = require('bcryptjs');
const passport = require('passport');


const Contact = require('../model/PhonebookModel.js');
const User = require('../model/User.js');
const upload = require("../multer/storage");


module.exports.postdata = function(req, res) {

  var contact = new Contact();
  upload(req, res, function (err) {
    contact.image = req.body.image;
  });

    contact.name = req.body.name ? req.body.name : contact.name;
    contact.number = req.body.number;
   
    contact.save(function (err, contact){
      if(err){
        console.log(err);
      }
      else{
        console.log(ensureAuthenticated);
        res.render('dashboard', { 'contacts': contact, "message":"Your Contact is Save", ensureAuthenticated:ensureAuthenticated });
      }
    });
}


module.exports.getcontacts = function (req, res){
  Contact.get(function(err, contacts){
    if(err){
      res.send('404 Not Found');
    }
    else{
          // console.log(contacts);
          res.render('all-contacts', { cont: contacts });
    }
  });

}

module.exports.edit = function (req, res) {
  Contact.findById(req.params.id, function(err, contact){
    if(err){
        res.send('Data Not Found');
    }
    else {
      res.render('edit-page', { contacts: contact });
    }
  })
}

module.exports.update = function (req, res) {
  Contact.findById(req.params.id, function(err, contact){
    if(err){
      res.send('Data Not Update Sucessfully');
    }
    else{
      
      contact.name = req.body.name;
      contact.number = req.body.number;

      contact.save(function (err) {
        if (err) {
          res.send('data not update');
        }
        else {
           res.send('data update sucessfully');
        }

      });

    }
  })
  
}

module.exports.delete = function (req, res) {
  Contact.remove({
    _id:req.params.id
  }, function(err, contact){
    if(err){
      res.send('Data not deleted.');
    }
    else{
      res.send('Data deleted successfully.');
    }
  });
}
