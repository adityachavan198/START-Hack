var addOverlay = async function () {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'          
      };

      try{
        const response = await fetch("http://127.0.0.1:8000/refresh/fetchtrivia", requestOptions);

        var overlayContent = await response.json();
        
        addOverlayHtml(overlayContent);

        } catch (error) {
            
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
          <div id="fetchtrivia_option_1" class="radio">
            <label><input type="radio" name="optradio" value="`+option1+`">`

    var html2 = `</label>
            </div>
            <div id="fetchtrivia_option_2" class="radio">
            <label><input  type="radio" name="optradio"  value="`+option2+`">`
    
    var html3 = `</label>
            </div>
            <div id="fetchtrivia_option_3" class="radio">
            <label><input type="radio" name="optradio" value="`+option3+`">`
    var html4 = 
            `</label>
            </div>
            <div id="fetchtrivia_option_4" class="radio ">
            <label><input type="radio" name="optradio" value="`+option4+`">`

    var htmlEnd = 
                        `</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button id="fetchtrivia-cancel-button" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="fetchtrivia-check-button" type="button" class="btn btn-default" >Check</button>
                    </div>
                </div>
                
                </div>
            </div>`;
   
    var overlay = htmlStart + question + html1 + option1 + html2 + option2 + html3 + option3 + html4 + option4 + htmlEnd;
    
    $("body").append(overlay);

    addOverlayFunction(answer);
}

function addOverlayFunction(answer){
    $("#overlay-extension").on('hide.bs.modal', function(){
        $("#overlay-extension").remove();
    });

    $("#overlay-extension").modal();

    $("#fetchtrivia-check-button").click(function(){

        var $selected_answer = $('input[name="optradio"]:checked');
        if($selected_answer.length > 0){
            var radio_element = $('input[name="optradio"]:checked')[0] ?? $('input[name="optradio"]:checked');
            // if (radio == undefined)
            // {
            //         radio =  $('input[name="optradio"]:checked').parentElement.parentElement.id;
            //     }  
            // else{
            //         radio =  $('input[name="optradio"]:checked')[0].parentElement.parentElement.id;
            // } 
            let radio = radio_element.parentElement.parentElement;
            var radio_id = radio.id[radio.id.length-1]
            

            if( radio_id != answer){
                var radio_element_wrong = $("#fetchtrivia_option_"+radio_id);
                radio_element_wrong.addClass("alert-danger");
            }

            var radio_element_right = $("#fetchtrivia_option_"+answer);
            radio_element_right.addClass("alert-success");
            
        }
    });

}

function clickPlanet() {


    if( $('#overlay-extension').length==0)       
    {
           
        console.log("Called api!");
        addOverlay().then(()=> {
            
            // console.log("popup complete")
            
        });
    }
    else{
        console.log("Pop up already exists");
    }
  
      
}

clickPlanet()


setInterval(function() {
    clickPlanet()

}, 10000);

