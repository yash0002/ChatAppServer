
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
  password: { type: String, required: true },
});

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
    db.find({email_id : req.data.email},function(err, user) {
        if(err) throw err;

        console.log(db);
        callback(null, db);
        
    })
}
/**
 * @description saving data inside database
 */
exports.registerDb = function(req, res) {
    // console.log('in model before goining in');
    // console.log("request : ------------------");
    // console.log(req.body.email);
    // console.log(req.body.passw);
    
    let newUser = new user(req.body);
    newUser.save(function (err, newUser) {
      if(err) return console.log(err);
      else {
        console.log('Registration Successfully Done');
        callback(null, newUser);
      }
      
    })
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
}