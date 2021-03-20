let uid = localStorage.getItem("self-refresh-user-id");

function injectTheScript() {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // query the active tab, which will be only one tab
    //and inject the script in it
    chrome.tabs.executeScript(tabs[0].id, { file: 'content_script.js' }, function () {
      chrome.tabs.sendMessage(tabs[0].id, uid);
    });

  });
}

$("#self_refresh_login").click(function () {
  $('#self_refresh_login').toggleClass('disabled');
  let email = $('input[name="email"]').val();
  let password = $('input[name="password"]').val();
  let raw = {};
  raw['email'] = email;
  raw['password'] = password;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw)
  };

  fetch("http://127.0.0.1:8000/refresh/logIn", requestOptions)
    .then(response => response.json())
    .then(result => {
      $('#self_refresh_login').toggleClass('disabled');
      if (result['type'] == 'success') {
        uid = result['uid']
        $('#self_refresh_login_form').toggleClass('hidden');
        $('#startTrivia').toggleClass('hidden');
        $('#self_refresh_logout').toggleClass('hidden');
      }
      else {
        $('#self_refresh_login_message').html('<div class="alert alert-danger" role="alert">Invalid Credentials</div>');
      }

      localStorage.setItem("self-refresh-user-id", uid);

    })
    .catch(error => {
      $('#self_refresh_login').toggleClass('disabled');
      $('#self_refresh_login_message').html('<div class="alert alert-danger" role="alert">Error Occured</div>');
      console.log('error', error)
    });

});

$("#self_refresh_logout").click(function () {
  localStorage.removeItem('self-refresh-user-id');
  $('#self_refresh_login_form').toggleClass('hidden');
  $('#startTrivia').toggleClass('hidden');
  $('#self_refresh_logout').toggleClass('hidden');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: 'logout.js' }, function () {
      chrome.tabs.sendMessage(tabs[0].id, 'logout');
    });

  });

});

document.getElementById('startTrivia').addEventListener('click', injectTheScript);

$(document).ready(function () {
  if (uid != null) {
    $('#self_refresh_login_form').toggleClass('hidden');
    $('#startTrivia').toggleClass('hidden');
    $('#self_refresh_logout').toggleClass('hidden');
  }
});


