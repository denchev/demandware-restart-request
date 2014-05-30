var socket = null;

var register_name = '';

window.getStatus = function() {
	return socket === null ? 'disconnect' : 'connect';
}

window.connect = function() {

  console.log('Try to connect.');
  
  if(null === socket) {

    socket = io.connect('//cloud.unifato.net:3000');
    console.log('Socket connection OK'); 

    console.log('Socket emit: register_restarter');
    socket.emit('register_restarter', {name : window.register_name});

    socket.on('restart_requested', function(data) {
       
       console.log('Socket event: restart_requested');
       var rand = parseInt(Math.random() * 10000000);

       chrome.notifications.create('restert_wanted_' + rand, {
        title : "Restart requested from: " + data.name,
        message : "Sandbox: " + data.sandbox,
        type : "basic",
        iconUrl : "icon.png"
      }, function() {
      });

   	});

	}
}

window.disconnect = function() {

	console.log('Socket disconnect');
	socket.disconnect();
	socket = null;
}