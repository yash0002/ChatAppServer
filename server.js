/**
 * @description Server Side (complete node js structure & database schema based connection)
 * @author Yash
 * @version 21.1.2
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
 * @description Parsing the request get by client
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
server = app.listen(3001, () => {
  let db_url = db_connect.url;
  startMongo(db_url);
  console.log('server is up and running');
});
/**
 * @description Database Connection
 */

/**
 * @description cheking database connectivity
 * @param {String} db_url 
 */
function startMongo(db_url) {
  mongoose.connect(db_url, { useCreateIndex: true, useNewUrlParser: true });
  mongoose.connection.on('error', (error) => { console.log('Connection error with MongoDb'); });
  mongoose.connection.on('open', () => { console.log('Successfully Connected to MongoDb on port  :' + db_url); });
}
/**
 * making socket connecion ready & ready to listen on port
 */
const socket_io = require('socket.io')(server);
const controller_of_chat = require('./controller/chat_controller');
/**
 * @description when client connected to socket, this below code runs
 */
socket_io.on('connection', function (socket) {
  console.log('Client Connected on Server Side');
  /**
   * @description 'socket.on' will be used only when we have to show how many are login to all users except the person login and seeing
   * socket.on('join', function(email_id) {}
   * ---------------------------------------------------
   * 'socket_io' will be used only when we have to show all users including the one currently login & seeing
   * socket_io('join', function(email_id)) {}
   */
  socket.on('chat_message', function (request) {
    console.log('request on server side ', request);
    server_socket_launch(request);
    function server_socket_launch(request) {
      controller_of_chat.chat_controller(request, (err, data) => {
        if (err) {
          // data = {
          //   "message": err,
          //   "success": false,
          //   "data": [] 
          // };
          socket.emit('response_message', data);
        }
        else {
          // data = {
          //   "message": "Something bad happened",
          //   "success": true,
          //   "data": data 
          // };
          socket_io.broadcast.emit('response_message', data);
          // socket.emit('response_message', data);    
        }
      })
    }
  })

  /**
   * @description This on connection is for peer messages
   */
  socket.on('chat_peer_message', function (request) {
    // console.log('Request on server page -- peer');
    // console.log(request_message);

    server_socket_launch(request);
    function server_socket_launch(request) {
      // console.log(request_message); 
      controller_of_chat.chat_peer_controller(request, (err, data) => {
        if (err) {
          socket.emit('response_peer_message', err);
        }
        else {
          socket_io.broadcast.emit('response_peer_message', data);
          // socket.emit('response_peer_message', data);    
        }
      })
    }
  })

  /**
   * @description to emit all messages to login_user
   */
  server_socket_launch();
  function server_socket_launch() {
    controller_of_chat.chat_fetch_controller((err, data) => {
      if (err) {
        socket.emit('response_message', err);
      }
      else {
        // socket.emit('response_message', data);    
        socket.broadcast.emit('response_message', data);
      }
    })
  }

  /**
   * @description to emit all messages to login_user
   */
  server_socket_launch_peer();
  function server_socket_launch_peer() {
    controller_of_chat.chat_peer_fetch_controller((err, data) => {
      if (err) {
        socket.emit('response_peer_message', err);
      }
      else {
        // socket.emit('response_peer_message', data);    
        socket.broadcast.emit('response_peer_message', data);
      }
    })
  }
})
/**
 * cheking socket connection on port is listening or not
 */
socket_io.on('disconnect', function () {
  console.log('Client Disconnected on Server Side');
  //socket.broadcast.emit( "userdisconnect" ,' user has left')  
})

app.get("/", function (req, res) {
  throw new Error("BROKEN"); // Express will catch this on its own.
});

app.use(function (err, req, res, next) {
  // console.error(err.stack)
  console.log(err);  
  res.status(500).send('Something broke ! Internal Server Error')
})

/**
 * Displaying get request on server side webpage
 */
// app.get('/', function(req,res) {
//   res.json({message: 'welcome to ChatApp'});
// });

/**
 * @description setting port for server
 * ------------------------------------
 */
// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}`));
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