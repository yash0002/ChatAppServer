const service = require('../services/user_service');

exports.login_controller = function(req, res) {
    service.login_service_function(req.body,(err,data)=>{
        if(err){
            res.status(400).send(err)
        }else{
            callback(null, data);
        }
    })
    console.log('Inside Controller');    
}

exports.register_controller = function(req, res) {
    service.register_service_function(req.body,(err,data)=>{
        if(err){
            res.status(400).send(err)
        }else{
            callback(null, data);
        }
    })
    console.log('Inside Controller');    
}