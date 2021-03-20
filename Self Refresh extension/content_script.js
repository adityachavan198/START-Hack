var addOverlay = async function () {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'          
      };

      try{
        const response = await fetch("http://127.0.0.1:8000/refresh/fetchtrivia", requestOptions);

        var overlayContent = await response.json();
        
        addOverlayHtml(overlayContent);
        
        // fetch("http://127.0.0.1:8000/refresh/fetchtrivia", requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));

        } catch (error) {
            // do nothing
        }
 }

function addOverlayHtml(overlayContent){

    // console.log(question)
    question = overlayContent["question"];
    option1 = overlayContent["option1"]
    option2 =  overlayContent["option2"]
    option3 = overlayContent["option3"]
    option4 = overlayContent["option4"]
    answer = overlayContent["answer"]

    var htmlStart = `<div class="modal fade" id="overlay-extension" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Quick Refresh</h4>
        </div>
        <div class="modal-body">
          <p>`;
    

    var html1 = `</p>
          <div class="radio">
            <label><input type="radio" name="optradio">`

    var html2 = `</label>
            </div>
            <div class="radio">
            <label><input type="radio" name="optradio">`
    
    var html3 = `</label>
            </div>
            <div class="radio">
            <label><input type="radio" name="optradio">`
    var html4 = 
            `</label>
            </div>
            <div class="radio ">
            <label><input type="radio" name="optradio">`

    var htmlEnd = 
                        `</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Check</button>
                    </div>
                </div>
                
                </div>
            </div>`;
   
    var overlay = htmlStart + question + html1 + option1 + html2 + option2 + html3 + option3 + html4 + option4 + htmlEnd;
    
  $("body").append(overlay);
}


function clickPlanet() {

   addOverlay().then(()=> {
    console.log("here!");

    $("#overlay-extension").on('hide.bs.modal', function(){
       $("#overlay-extension").remove();
     });
    
     $("#overlay-extension").modal();
   });
   
   
      
}



clickPlanet();
