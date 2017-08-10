//carga modulo de express
var express = require('express');

// llamada a express
var app = express();

//cargar servidor
var server = require('http').Server(app);

// paso de server a socket
var io = require('socket.io')(server);

//vista estatica con middleware de express
app.use(express.static('client'));

//crear una ruta
app.get('/hola-mundo', function(req, res){
	res.status(200).send('Hola mundo');
});

// array JSON para almacenar msgs
var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado de Socket.io y NodeJS de Daniel',
	nickname: 'Bot - DanielIniguez'
}];

//Abrir conexion a socket
io.on('connection', function(socket) {
	//detecta cuando el cliente se conecte
	console.log("El nodo con IP: " + socket.handshake.address+" se ha conectado");

	//emitir el mensaje
	socket.emit('messages', messages);

	//recoger mensaje
	socket.on('add-message',function(data) {
		messages.push(data);

		io.sockets.emit('messages',messages);
	});



});

//crear server y eschucar
server.listen(6677, function() {
	console.log('servidor funcionando');
});