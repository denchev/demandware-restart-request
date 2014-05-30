document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('request').addEventListener('click', function() {

    var sandbox = document.getElementById('sandbox').value;
    var name = document.getElementById('name').value;

    var socket = io.connect('//cloud.unifato.net:3000');

    console.log('Emit request');

    socket.emit('request', {sandbox : sandbox, name : name});

  }, false);
 
});

function getRestartersCount() {
  
  var socket = io.connect('//cloud.unifato.net:3000');

  socket.emit('request restarters count');
  socket.on('receive restarters count', function(data) {
    $('#restarters-count').html(data.count);
  });

  socket.emit('request restarters list');
  socket.on('receive restarters list', function(data) {
    console.log('Receive restarters name');
    document.getElementById('restarters').innerHTML = '';
    for(var i in data.restarters) {
      document.getElementById('restarters').innerHTML += '<li><input type="checkbox" value="">' + data.restarters[i] + '</li>';
    }
  });
}

getRestartersCount();