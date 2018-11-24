
/**
 * @description linking database with code
 */
const bcrypt = require('bcrypt');
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

  //Async
  // bcrypt.compare('somePassword', hash, function(err, res) {
  //   if(res) {
  //    // Passwords match
  //   } else {
  //    // Passwords don't match
  //   } 
  // });

  //Synchronus
  // if(bcrypt.compareSync(req.passw, hash)) {
  //   // Passwords match
  //  } else {
  //   // Passwords don't match
  //  }

  // user.findOne({email_id : req.email, password : req.passw},function(err, result) {
  //   if(result == null) {
  //     console.log('error in login ',err);      
  //     return callback(err);
  //   } 
  //   else {
  //     console.log('Login Successful');
  //     console.log(result);      
  //     return callback(null, result);            
  //   }
  // })

  console.log("model login user bcrpt");
  console.log(req.email);
  console.log(req.passw);
  user.findOne({email_id : req.email})
    // .then(function(result) {
    //     return bcrypt.compare(result.password, req.passw);
    // })
    // .then(function(final_result) {
    //     if(!final_result) {
    //         // res.status(403).send();
    //         return callback(null);
    //     }
    //     // res.send();
    //     else {
    //       console.log('final result');
    //       console.log(final_result);
    //       return callback(final_result);
    //     }
    // })
    // .catch(function(error){
    //     console.log("Error authenticating user: ");
    //     console.log(error);
    //     // next();
    //     return callback(error);
    // });


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
 * @description for Peers Chat User Check - Sender
 */
person.prototype.User_Check_peer_chatDb = function(req, callback) {

  user.findOne({email_id : req},function(err, result) {
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


  // bcrypt.hash(req.passw, 3, function(err, hash) {
  //   //store hash in data base
  // });

  let hash = bcrypt.hashSync(req.passw, 10);

  let newUser = new user({
    email_id:req.email,
    password:hash
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