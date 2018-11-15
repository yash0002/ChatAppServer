const express = require('express');
const app = express();
const service = require();

exports.register_controller = function(req, res) {
    userServices.service(req.body,(err,data)=>{
        if(err){
            res.status(400).send(err)
        }else{
            
        }
    })
    console.log('Inside Controller');    
}