var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

var restarters = {};
var restarter_id = 1;
var restarters_count = 0;

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
	console.log('connection active');

	socket.on('register_restarter', function(data) {

		socket.restarter_id = restarter_id;
		socket.restarter_name = data.name;

		restarters[restarter_id] = socket;

		console.log('Register restarers with ID: ', restarter_id, ' and name: ', data.name);

		io.sockets.emit('restarter_online', {});

		restarter_id++;
		restarters_count++;
	});

	socket.on('disconnect', function() {
		console.log('Somebody is out');

		if(this.restarter_id) {
			console.log('That somebody is: ', this.restarter_name);
			for(var i in restarters) {
				if(restarters[i].restarter_id == this.restarter_id) {
					delete restarters[i];
				}
			}
			restarters_count--;
		}
	});

	socket.on('request restarters count', function() {

		io.sockets.emit('receive restarters count', {count : restarters_count})
	});

	socket.on('request restarters list', function() {

		var names = [];
		console.log(restarters);
		for(var i in restarters) {
			names.push(restarters[i].restarter_name);
		}

		io.sockets.emit('receive restarters list', {restarters : names});
	});
});

app.listen(3000);