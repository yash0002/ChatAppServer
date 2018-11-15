
/**
 * @description linking database with code
 */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
var db = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
exports.loginDb = function(req, res) {
    db.find({email_id : req.data.email},function(err, user) {
        if(err) throw err;

        console.log(db);
        callback(null, db);
        
    })
}

exports.registerDb = function(req, res) {
    let newUser = db({
        email_id : req.data.email,
        password : req.data.passw
    })

    newUser.save(function(err) {
        if(err) throw err;
        console.log('User Created');        
    })
    callback(null,newUser);
}