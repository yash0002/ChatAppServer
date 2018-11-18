
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
    message: { type: String, required: true },
    email_id: { type: String, required: true }
})

/**
 * the schema is useless so far
 * we need to create a model to use it
 * instances of these Models are documents
 * passing modelName - 'users' & schema - 'userSchema' in mongoose.model
 */
var chats = mongoose.model('chats', userSchema);
/**
 * @description Model created & now functions built below to perform different task on database via model having schema in it
 */

/**
 * @description saving data inside database
 */
exports.chatsDb = function(req, callback) {

  let newUser = new chats({
    message : req.message,
    email_id : req.email_id,
  });

  newUser.save(function (err, result) {
    if(err) 
    {
      console.log(err);
      return callback(err);
    }
    else {
      console.log('Message Inserted Successfully Done');
      return callback(null, result);
    }
  })
}

/**
 * @description saving data inside database
 */
exports.chatsDb_fetch = function(callback) {

  chats.find(function (err, result) {
    if(err) 
    {
      console.log(err);
      return callback(err);
    }
    else {
      console.log('Message fetched Successfully Done');
      console.log('result from db -------------------------------------------');
      console.log(result);      
      return callback(null, result);
    }
  })
}

//   user.findOne({email_id : req.body.email, password : req.body.passw},function(err, result) {
//     if(err) {

//       console.log(err);      
//       return callback(err);
//     } 
//     else {
//       console.log('Login Successful');
//       console.log('result of find-----------');
//       console.log(result);     
//       return callback(null, result);            
//     }
//   })
// }
