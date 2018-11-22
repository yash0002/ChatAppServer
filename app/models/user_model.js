
/**
 * @description linking database with code
 */

// grab the things we need
var mongoose = require('mongoose');
/**
 * @description Everything in mongoose start with schema
 */
var Schema = mongoose.Schema;

/**
 * Every schema maps to MongoDB collection & define schemas shape within collection
 * creating new schema
 */
var userSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

/**
 * the schema is useless so far
 * we need to create a model to use it
 * instances of these Models are documents
 * passing modelName - 'users' & schema - 'userSchema' in mongoose.model
 */
var user = mongoose.model('user', userSchema);
/**
 * @description Model created & now functions built below to perform different task on database via model having schema in it
 */

/**
 * @description to create prototype
 */
function person () {

}

 /**
  * @description Finding data inside database
  * make this available to our users in our Node applications
  */

person.prototype.loginDb = function(req, callback) {

  user.findOne({email_id : req.body.email, password : req.body.passw},function(err, result) {
    if(result == null) {
      console.log('error in login ',err);      
      return callback(err);
    } 
    else {
      console.log('Login Successful');
      console.log(result);      
      return callback(null, result);            
    }
  })
}

/**
 * @description for Chat User Check
 */
person.prototype.User_Chjeck_chatDb = function(req, callback) {

  user.findOne({email_id : req.email_id},function(err, result) {
    if(result == null) {
      console.log('error in checking ',err);      
      return callback(err);
    } 
    else {
      console.log('Login Successful');
      console.log(result);      
      return callback(null, result);            
    }
  })
}

/**
 * @description saving data inside database
 */
person.prototype.registerDb = function(req, callback) {

  let newUser = new user({
    email_id:req.body.email,
    password:req.body.passw
  });
  
  newUser.save(function (err, result) {
    if(err) 
    {
      console.log(err);
      return callback(err);
    }
    else {
      console.log('Registration Successfully Done');
      return callback(null, result);
    }
  })
}

 /**
  * @description Finding data inside database
  * make this available to our users in our Node applications
  */
 person.prototype.logoutDb = function(req, callback) {

  user.findOne({email_id : req.body.log_user_email_id},function(err, result) {
    if(err) {

      console.log(err);      
      return callback(err);
    } 
    else {
      console.log('Logout Successful');
      return callback(null, result);            
    }
  })
}

module.exports = new person;