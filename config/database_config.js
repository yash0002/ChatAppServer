const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ChatappDb', () => {
    console.log('Database Connected Successfully');    
});
module.exports = {mongoose};