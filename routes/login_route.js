const db_connection_collection = require('../config/database_config');

exports.login = function(req, res) {
    console.log("req : ", req.body);
    let email = req.body.email;
    let password = req.body.password;

    db_connection_collection.find().toArray(function(err, results) {
        if(err)
        {
            res.send({
                "code" : 404,
                "failed" : "error occured"
            })
        }
        else
        {
            if(results.length > 0)
            {
                if(results[0].password == password) {
                    res.send({
                        "code" : 200,
                        "success" : "login successfull"
                    });
                }
                else
                {
                    res.send({
                        "code" : 204,
                        "success" : "Email & Password does not match"
                    })
                }
            }
            else
            {
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });          
            }
        }
    });
    
}