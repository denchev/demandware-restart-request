document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('connect').addEventListener('click', function() {

    var bgPage = chrome.extension.getBackgroundPage();

    var register_name = document.getElementById('restarter-name').value;

    bgPage.register_name = register_name;

    bgPage.connect();

    return false;
    
  }, false);
 
});