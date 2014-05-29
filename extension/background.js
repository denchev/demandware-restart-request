var socket = null;

var register_name = '';

window.connect = function() {
  console.log('Try to connect.');
  if(true) {
    console.log('Socket connection OK'); 
    socket = io.connect('//cloud.unifato.net:3000');

    socket.emit('register_restarter', {name : window.register_name});
  }
}