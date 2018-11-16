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
    console.log('Inside Controller register');    
    service.register_service_function(req,(err,data)=>{
        if(err){
            res.status(400).send(err)
        }else{
            console.log("data=\n",data)
            res.status(200).send(data);
        }
        console.log('return complete from services');
        
    })
}