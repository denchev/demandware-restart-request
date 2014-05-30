document.addEventListener('DOMContentLoaded', function () {

  var bgPage = chrome.extension.getBackgroundPage();

  var connectBtn = document.getElementById('connect');
  var connectionStatus = bgPage.getStatus();

  console.log('Connection status: ', connectionStatus);

  connectBtn.value = connectionStatus == 'connect' ? 'Disconnect' : 'Connect';

  connectBtn.addEventListener('click', function() {

    if(connectionStatus == 'connect') {

      console.log(bgPage);
      bgPage.disconnect();

      this.value = 'Connect';
    } else {

      var register_name = document.getElementById('restarter-name').value;

      bgPage.register_name = register_name;

      bgPage.connect();

      this.value = 'Disconnect';
    }

    return false;

  }, false);
 
});