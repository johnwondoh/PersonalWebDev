// document.addEventListener('DOMContentLoaded', init, false);
// function init(){
//   function message () {
//     alert("Hello!");
//   }
//   var button = document.getElementsByClassName('container');
//   button.addEventListener('click', message, true);
// }

// var body = document.querySelector('body');
// body.addEventListener('mouseover', function(){
//     if(event.target.tagName.toLowerCase() === 'input'){
//         this.style.backgroundColor = "red";
//     }
// });

// var publications = document.getElementsByClassName('publications');
// publications.addEventListener('mouseover', function(){
//     publications.style.backgroundColor = "green";
// });

// document.querySelector('body').addEventListener('click', function(event) {
//     console.log('Clicked body');
//     if (event.target.className.toLowerCase() === 'card-body') {
//         console.log('Clicked card-body');
//         // do your action on your 'li' or whatever it is you're listening for
//         event.target.classList.add('hoverResearchItem');
//     }
//     event.stopPropagation();
// });




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



// body.addEventListener('mouseover', function(){
//     this.style.backgroundColor = "red";
// });



// document.querySelector('body').addEventListener('click', function(event) {
//   if (event.target.className === 'food') {
//     event.target.classList.add('rice');
//   }
//   event.stopPropagation();
// });
