/**
 * @description linking database with code
 * @author Yash
 * @version 11.1
 * @since 12/11/2018
 * @module Server
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
var chatSchema = new Schema({
  message: { type: String, required: true },
  email_id: { type: String, required: true }
// name: { type: String, required: true },
// user: {type:Object, reference: 'users'}
});

var personSchema = new Schema({
  _id : Schema.Types.ObjectId,
  email_id : String,
})
/**
 * the schema is useless so far
 * we need to create a model to use it
 * instances of these Models are documents
 * passing modelName - 'users' & schema - 'userSchema' in mongoose.model
 */
var chats = mongoose.model('chats', chatSchema);
/**
 * @description Model created & now functions built below to perform different task on database via model having schema in it
 * --------------------------------------------------------------------------------------------------------------------------
 */
/**
 * @description prototype based accessing functionality
 */
function chatFunction() {

}
 /**
 * @description saving data inside database
 */
 chatFunction.prototype.chatsDb = function(req, callback) {
  let newUser = new chats({
    message : req.message,
    email_id : req.email_id,
  });

  newUser.save(function (err, result) {
    if(err) 
    {
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
chatFunction.prototype.chatsDb_fetch = function(callback) {

  chats.find(function (err, result) {
    if(err) 
    {
      console.log(err);
      return callback(err);
    }
    else {
      let chats_format = [];
      result.forEach(function(x) {
        chats_format.push({
          message : x.message,
          email_id : x.email_id
        })
      })
      return callback(null, chats_format);
    }
  })
}

/**
 * @exports exporting function
 */
module.exports = new chatFunction;