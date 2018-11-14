const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db_connection_collection = require('../config/database_config');
// const db_connection_collection = db_connection.collection('test');

// let obj1 = {'name' : 'xyz'};
// let obj2 = {'name' : 'xyz'};

// let obj_array = [{'name' : 'xyz'}, {'name' : 'xyz'}];

// db_connection_collection.insert(obj1);
// db_connection_collection.insert(obj2, {w : 1}, function(err, result){});
// db_connection_collection.insert(obj_array);


// create a schema
let userRegisterSchema = new Schema({
  email_id: String,
  password: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
let User = mongoose.model('User', userRegisterSchema);

// make this available to our users in our Node applications
module.exports = User;
