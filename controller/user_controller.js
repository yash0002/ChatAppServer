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
    console.log('in controller before goining in');
    console.log('req body email', req.body.email);
    service.register_service_function(req,(err,data)=>{
        if(err){
            res.status(400).send(err)
        }else{
            console.log('data in controller');            
            callback(null, data);
        }
    })
    console.log('Inside Controller');    
}