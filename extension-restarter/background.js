var socket = null;

var register_name = '';

window.connect = function() {
  console.log('Try to connect.');
  

  console.log('Socket connection OK'); 
    socket = io.connect('//cloud.unifato.net:3000');

    socket.emit('register_restarter', {name : window.register_name});

    socket.on('restart_requested', function(data) {
       
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