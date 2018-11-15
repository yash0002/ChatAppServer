
/**
 * @author Yash
 * @description file to form schema and then perform database task on user inputs
 * @since 13/11/2018
 * @version 1.1
 */

/**
 * @description requiring config file of database connection
 */
const mongoose = require('mongoose');
const db_connection = require('../config/database_config');
const Schema = mongoose.Schema;

// create a schema
let userRegisterSchema = new Schema({
  email_id: String,
  password: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
let User = mongoose.model('User', userRegisterSchema);

/**
 * @description as complete schema is not exported, hence we are taking function to export it
 */

// make this available to our users in our Node applications
function f1()
{
  console.log('logiing');
  
}
module.exports = {User, f1};


