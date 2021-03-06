var uid = localStorage.getItem("self-refresh-user-id");
clearInterval(triviaLoop);
localStorage.removeItem('self-refresh-counter');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  uid = message
  localStorage.setItem("self-refresh-user-id", uid);

});

var addOverlay = async function () {

  var raw = {};
  raw["uid"] = Number(localStorage.getItem("self-refresh-user-id")) ?? -1;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw)
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/refresh/fetchtrivia", requestOptions);

    var overlayContent = await response.json();

    addOverlayHtml(overlayContent);

  } catch (error) {

  }
}

function addOverlayHtml(overlayContent) {

  // console.log(question)
  tid = overlayContent["tid"];
  question = overlayContent["question"];
  option1 = overlayContent["option1"]
  option2 = overlayContent["option2"]
  option3 = overlayContent["option3"]
  option4 = overlayContent["option4"]
<<<<<<< HEAD
  option4 = overlayContent["question"]
=======
  points = overlayContent["points"]
>>>>>>> 9947af92d5909ed0fbb4467c55b681785e61017d
  answer = overlayContent["answer"]

  var htmlStart = `<div class="modal fade" id="overlay-extension" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Quick Refresh</h4>
          <span class="pull-right">Total Score: `+ points + `</span>
        </div>

        <span class="hidden" id="fetchtrivia_tid">`+ tid + `</span>
        <div class="modal-body">
          <p>`;


  var html1 = `</p>
          <div id="fetchtrivia_option_1" class="radio">
            <label><input type="radio" name="optradio" value="`+ option1 + `">`

  var html2 = `</label>
            </div>
            <div id="fetchtrivia_option_2" class="radio">
            <label><input  type="radio" name="optradio"  value="`+ option2 + `">`

  var html3 = `</label>
            </div>
            <div id="fetchtrivia_option_3" class="radio">
            <label><input type="radio" name="optradio" value="`+ option3 + `">`
  var html4 =
    `</label>
            </div>
            <div id="fetchtrivia_option_4" class="radio ">
            <label><input type="radio" name="optradio" value="`+ option4 + `">`

  var htmlEnd =
    `</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <div id="fetchtrivia_like" class="radio-inline ">
                            <label><input type="radio" name="optradio_like_dislike" value="1">Like</label>
<<<<<<< HEAD
                        </div>
                        <div id="fetchtrivia_dislike" class="radio ">
=======
                        </div>                        
                        <div id="fetchtrivia_dislike" class="radio-inline ">
>>>>>>> 9947af92d5909ed0fbb4467c55b681785e61017d
                            <label><input type="radio" name="optradio_like_dislike" value="0">Dislike</label>
                        </div>
                        <br><br>
                    <button id="fetchtrivia-stop-button" type="button" class="btn btn-default" data-dismiss="modal">Stop Trivia</button>
                    <button id="fetchtrivia-check-button" type="button" class="btn btn-default">Check</button>
                    </div>
                </div>

                </div>
            </div>`;

  var overlay = htmlStart + question + html1 + option1 + html2 + option2 + html3 + option3 + html4 + option4 + htmlEnd;

  $("body").append(overlay);

  addOverlayFunction(answer);
}

function addOverlayFunction(answer) {
  $("#overlay-extension").on('hide.bs.modal', function () {
    $("#overlay-extension").remove();
  });

  $("#overlay-extension").modal();

  $("#fetchtrivia-check-button").click(function () {

    var $selected_answer = $('input[name="optradio"]:checked');
    if ($selected_answer.length > 0) {
      var radio_element = $('input[name="optradio"]:checked')[0] ?? $('input[name="optradio"]:checked');

      let radio = radio_element.parentElement.parentElement;
      var radio_id = radio.id[radio.id.length - 1]
      var raw = {};

      if (radio_id != answer) {
        var radio_element_wrong = $("#fetchtrivia_option_" + radio_id);
        radio_element_wrong.addClass("alert-danger");
        raw["answer"] = false;
      }
      else {
        raw["answer"] = true;
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");


      raw["uid"] = Number(localStorage.getItem("self-refresh-user-id"))
      raw["tid"] = $("#fetchtrivia_tid").html();;
      raw["like"] = $('input[name="optradio_like_dislike"]:checked').val() ?? -1;

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
      };

      fetch("http://127.0.0.1:8000/refresh/saveresponse", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      var radio_element_right = $("#fetchtrivia_option_" + answer);
      radio_element_right.addClass("alert-success");

    }
  });

  $("#fetchtrivia-stop-button").click(function () {
    clearInterval(triviaLoop);
    localStorage.removeItem('self-refresh-counter');
  });

}

function clickPlanet() {

  if ($('#overlay-extension').length == 0) {

    console.log("Called api!");
    addOverlay().then(() => {

      // console.log("popup complete")

    });
  }
  else {
    console.log("Pop up already exists");
  }


}

clickPlanet();

if (localStorage.getItem("self-refresh-counter") == null) {
  localStorage.setItem("self-refresh-counter", 1);
}
else {
  let counter = Number(localStorage.getItem("self-refresh-counter"));
  console.log('counter:', counter);
  counter += 1
  localStorage.setItem("self-refresh-counter", counter);
}


if (Number(localStorage.getItem("self-refresh-counter")) == 1) {
  var triviaLoop = setInterval(function () {
    clickPlanet();

  }, 10000);
}
