// alert('I am here!!');

/* --- for the year selection on new --- */
var start = 1900;
var end = new Date().getFullYear();
var options = "<option selected>Select Year</option>";
for(var year = start ; year <=end; year++){
  options += "<option>"+ year +"</option>";
}
document.getElementById("year").innerHTML = options;



/* --- for research publication items --- */
jQuery(document).ready(function($){
    $('body').on('mouseenter', '.card-body', function(){
        $(this).toggleClass('hoverResearchItem')
    });
});

$('p').on('mouseenter', function(){
    $(this).css('background-color', 'red');
});

$('.card-body').on('click', function(){
    $(this).css('border', 'red solid 2px');
})

/* --- for research publication items --- */
// var cardBody = document.querySelectorAll('.card-body');

// for(var i=0; i<cardBody.length; i++){
//     cardBody[i].addEventListener('mouseover', function(){
//         this.classList.add('hoverResearchItem');
//     });
    
//     cardBody[i].addEventListener('mouseout', function(){
//         this.classList.remove('hoverResearchItem');
//     });
// }
