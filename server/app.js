
const express = require('express'); // Link to Express.js
const app = express();

const http = require('http').Server(app); 

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000; // Ports are where servers listen for information.
const path = require('path'); // Path module.
// Add static files on client/ to our path.
app.use(express.static(path.join(__dirname, '../public')));

// Listen on port 3000, then use callback function to notify.
var server = app.listen(port, ()=>console.log(`Example app listening on port ${port}`));
const io = require('socket.io').listen(server);

var userList = [];


// Routes. 
app.get('/', (req, res)=>{
    
    // Use built in path module to serve html.
    res.sendFile(path.join(__dirname, '../public/main.html'));

});

// Socket.io stuff. 
io.on('connection', (socket)=> {
    console.log('a user connected');
    socket.broadcast.emit('hi');

    // On message receive. 
    socket.on('chat message', (msg) => {
        // Send message to everyone connected to socket. 
        // 'chat message' could be called anything...
        // Here we want to keep the same name as we did when we emit from client.
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('new user', (name) => {
        // We let the server handle checking for existing usernames.
        if (userList.indexOf(name) != -1) {
            // Ask user to enter new name. 
            console.log('user exists');
            socket.emit('existing user', 'user already exists');
            return;
        }
        
        // Otherwise add user and notify sender.
        userList.push(name);
        console.log(`UserList:${userList}`);
        socket.emit('user added', name);
    });


    // Remove username from our list of users when the user disconnects. 
    socket.on('disconnect', ()=> {
        // R
    });
});


