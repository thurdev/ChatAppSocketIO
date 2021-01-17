const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    if(!socket.user){
        socket.emit('login', socket.conn.id);
    }

    socket.on('newMessage', (message) => {
        messages.push(message);
        // Emit for who send the message
        socket.emit('updateMessage', messages)
        // Emit for who is connected
        socket.broadcast.emit('updateMessage', messages);
    })

    socket.on('registerUser', (user) => {
        io.sockets.sockets.forEach((socket) => {
            if(socket.client.id == user.id){
                socket.user = user;
                socket.emit('auth', messages);
                socket.broadcast.emit('newUser', user);
            }else{
                // if(socket.user){
                //     socket.broadcast('newUser', user);
                // }
            }
        })
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/');
})


http.listen(port, function() {
   console.log(`listening *:${port}`);
});