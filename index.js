var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    io.emit('chat message', 'a user connected');
      socket.on('disconnect', () => {
        io.emit('chat message', 'user disconnected')
      })
    
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log("message: " + msg)
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});