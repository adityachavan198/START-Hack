/**
 * Add Download Button To Single Songs on the Screen
 */

 var addOverlay = function () {
   var overlay = `<div class="modal fade" id="overlay-extension" role="dialog">
   <div class="modal-dialog">
   
     <!-- Modal content-->
     <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="close" data-dismiss="modal">&times;</button>
         <h4 class="modal-title">Quick Refresh</h4>
       </div>
       <div class="modal-body">
         <p>Who is the current CEO of Accenture Company?</p>
         <div class="radio">
           <label><input type="radio" name="optradio">David P Rowland</label>
           </div>
           <div class="radio">
           <label><input type="radio" name="optradio">Patrick Roland</label>
           </div>
           <div class="radio">
           <label><input type="radio" name="optradio">John Rowland</label>
           </div>
           <div class="radio ">
           <label><input type="radio" name="optradio">Rowland Mackenzie</label>
           </div>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
         <button type="button" class="btn btn-default" data-dismiss="modal">Check</button>
       </div>
     </div>
     
   </div>
 </div>`;
  
 $("body").append(overlay);

}


$(document).ready(function () {
   alert("works here")
   addOverlay();
   
   $("#overlay-extension").on('hide.bs.modal', function(){
      $("#overlay-extension").remove();
    });
   

});
