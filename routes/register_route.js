const db_connection_collection = require('../config/database_config');

exports.register = function(req, res) {
    console.log("req : ", req.body);
    const today = new Date();
    let users = {
        "email_id" : req.body.email_id,
        "password" : req.body.password
    }

    db_connection_collection.insert(users, {w:1}, function(err, result) {
        if(!err)
        {
            console.log('Solution : ', result);
            res.send({
                "code" : 200,
                "failed" : "user registered successfully"
            })
        }
        else
        {
            res.send({
                "code" : 400,
                "failed" : "error occured"
            })
        }
    });
    
}