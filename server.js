/**
 * @description Server Side (complete node js structure & database schema based connection)
 * @author Yash
 * @version 11.1
 * @module Server
 * @since 12/11/2018
 */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db_connect = require('./config/database_config');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
/**
 * @description setting port for server
 */
// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}`));
/**
 * @description Parsing the request get by client
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/', routes);
server = app.listen(3001,()=>{
  console.log('server is up and running');
});
/**
 * @description Database Connection
 */
let db_url = db_connect.url;
startMongo(db_url);
/**
 * @description cheking database connectivity
 * @param {String} db_url 
 */
function startMongo(db_url)
{
  mongoose.connect(db_url, {useCreateIndex: true, useNewUrlParser: true});
  mongoose.connection.on('error', (error) => { console.log('Connection error with MongoDb');  });
  mongoose.connection.on('open', () => { console.log('Successfully Connected to MongoDb');  });
}

/**
 * making socket connecion ready & ready to listen on port
 */
const socket_io = require('socket.io')(server);
/**
 * @description when client connected to socket, this below code runs
 */
socket_io.on('connection', function(socket) {
  console.log('Client Connected on Server Side');
  /**
   * @description 'socket.on' will be used only when we have to show how many are login to all users except the person login and seeing
   * socket.on('join', function(email_id) {}
   * ---------------------------------------------------
   * 'socket_io' will be used only when we have to show all users including the one currently login & seeing
   * socket_io('join', function(email_id)) {}
   */
  const controller_of_chat = require('./controller/chat_controller');
  socket.on('chat_message', function(user_email_id, user_sent_message) {
    
    console.log('server page chat app receiving------');   
    console.log(user_email_id+" logged in  : message sent is : " +user_sent_message);
    let request_object = { 
      email_id : user_email_id,
      message : user_sent_message
    }
    console.log('request_object ------------server side');    
    console.log(request_object);    
    //create a message object
    // let  message = {"message":messageContent, "sender":sender}  
    // send the message to the client side  
    // socket_io.emit('response_message', message)
    server_socket_launch(request_object);
    function server_socket_launch(request_object) {
    
      console.log('inside server calling controllerr');
      
      controller_of_chat.chat_controller(request_object, (err, data) => {
        if(err) socket.emit('response_message', err);
        else socket.emit('response_message', data);    
      })
    }  
  })

  /**
   * @description to emit all messages to login_user
   */
  socket.on('to_fetch_chats', function() {
    
    console.log('server page chat app fetching chats started------');   
    server_socket_launch();
    function server_socket_launch() {
      console.log('inside server calling controllerr');
      
      controller_of_chat.chat_fetch_controller((err, data) => {
        if(err) socket.emit('response_message', err);
        else socket.emit('response_message', data);    
      })
    }
  })
})
/**
 * cheking socket connection on port is listening or not
 */
socket_io.on('disconnect', function () {
  console.log('Client Disconnected on Server Side');
  //socket.broadcast.emit( "userdisconnect" ,' user has left')  
})

/**
 * Displaying get request on server side webpage
 */
// app.get('/', function(req,res) {
//   res.json({message: 'welcome to ChatApp'});
// });
//we donot use http because we are using our own server
// http.listen(3001, function() {
//   console.log('socket listening on 3001');
// })

// app.use( session ({
//   secret : 'fraggle-rock', //random string
//   resave : false,
//   saveUninitialized : false
// }))

// create a GET route
// app.get('/express_backend', (req, res) => {
  // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });