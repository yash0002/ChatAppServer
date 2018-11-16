const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/ChatappDb';
mongoose.connect('mongodb://localhost:27017/ChatappDb', { useNewUrlParser: true, useCreateIndex: true } );
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error with MongoDb : '));
db.once('open', function() {
    console.log('Successfully Connected to MongoDb');  
})
module.exports = {db};