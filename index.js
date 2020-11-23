var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('login', function(data){
        console.log('a user ' + data.userId + ' connected');

        users[socket.id] = data.userId;
    });
    socket.on('disconnect', function() {
        console.log('user ' + users[socket.id] + ' disconnected');

        delete users[socket.id];
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});