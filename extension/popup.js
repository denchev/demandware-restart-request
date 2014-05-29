document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('request').addEventListener('click', function() {

    var sandbox = document.getElementById('sandbox').value;

    var socket = io.connect('//cloud.unifato.net:3000');

    console.log('Emit request');

    socket.emit('request', {sandbox : sandbox});

  }, false);

  document.getElementById('connect').addEventListener('click', function() {

    var bgPage = chrome.extension.getBackgroundPage();

    var register_name = document.getElementById('restarter-name').value;

    bgPage.register_name = register_name;

    bgPage.connect();

    return;
    
    //var socket = io.connect('//cloud.unifato.net:3000');

    socket.on('restart_requested', function() {
       
       chrome.notifications.create('restert_wanted', {
        title : "Restart requested",
        message : "Restart requested",
        type : "basic",
        iconUrl : "icon.png"
      }, function() {
      });

    });
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
      document.getElementById('restarters').innerHTML += '<li>' + data.restarters[i] + '</li>';
    }
  });
}

getRestartersCount();