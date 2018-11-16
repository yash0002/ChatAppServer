
/**
 * @description linking database with code
 */

// grab the things we need
var mongoose = require('mongoose');
/**
 * @description Everything in mongoose start with schema
 */
var userSchema =new mongoose.Schema({
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});;

/**
 * Every schema maps to MongoDB collection & define schemas shape within collection
 * creating new schema
 */
// var userSchema = new Schema

/**
 * the schema is useless so far
 * we need to create a model to use it
 * instances of these Models are documents
 * passing modelName - 'users' & schema - 'userSchema' in mongoose.model
 */
var user = mongoose.model('users', userSchema);
/**
 * @description Model created & now functions built below to perform different task on database via model having schema in it
 */

 /**
  * @description Finding data inside database
  * make this available to our users in our Node applications
  */
exports.loginDb = function(req, res) {
    user.findOne({email_id : req.data.email, password : req.body.passw},function(err, user) {
        if(err) callback(err);
        console.log(user);
        callback(null, user);
    })
}

/**
 * @description saving data inside database
 */
exports.registerDb = function(req,callback) {
    // console.log('in model before goining in');
    // console.log("request : ------------------");
    // console.log(req.body.email);
    // console.log(req.body.passw);
    let newUser = new user({
          email_id:req.body.email,
          password:req.body.passw
    });
    newUser.save(function (err, result) {
      if(err) 
      console.log(err);
      else {
        console.log('Registration Successfully Done');
        console.log("result=",result);
        
        return callback(null, result);
      }
    })
    // .then(item => {
    //   res.send("item saved to database");
    // })
    // .catch(err => {
    //   res.status(400).send("unable to save to database");
    // });
}