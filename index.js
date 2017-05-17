var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var onlineusers=[];
io.on('connection', function(socket){
  console.log('a user connected');

//online offline event
socket.on("online",function(userid){
if(!onlineusers.indexOf(userid)){
	onlineusers.push(userid)
}else{
	onlineusers.splice(userid,1);
	onlineusers.push(userid);
}
})

//event to brodcast message
//data ={"from_id":from_id,"message":message}
socket.on("sendMessage",function(data){
	io.emit("receiveMessage",data)
})

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});