const http = require('http');
const app = require('./app');

const normalizePort = val =>{
	const portNumber = parseInt(val,10);
	if(isNaN(portNumber)) return val;
	if(portNumber >= 0){
		return portNumber;
	}
	return false;
}

//set port number for app
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

//error handler for server
const errorHandler = (error)=>{
	if(error.Syscall !== 'listening'){
		throw error;
	}
	const address = server.address();
	const bind = typeOf address === 'string' ? 'pipe: ' + address : 'port: ' + port;

	switch(error.code){
		case 'EACCESS':
			console.log(bind + " You do not have enough permission to access");
			break;
		case 'EADDRINUSE':
			console.log(bind + " This address is in use");
			break;
		default:
			throw error;
	}
}

//add listener
server.on('error', errorHandler);
server.on('listen', ()=>{
	const address = server.address();
	const bind = typeOf address === 'string' ? 'pipe: ' + address : 'port: ' + port;

	console.log('listening on '+ bind);
});

//start server on given port
server.listen(port);