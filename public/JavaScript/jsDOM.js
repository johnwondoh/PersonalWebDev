// alert('I am here!!');





/* --- for research publication items --- */
jQuery(document).ready(function($){
    
    var navItems = document.querySelectorAll('.nav-item');
    
    console.log(navItems.length);
    navItems.forEach(function(navItem){
        navItem.classList.remove('active');
        
        var itemPath = navItem.getAttribute("href");
        var currentPath = window.location.pathname;
        
        if(itemPath == currentPath){
            navItem.classList.add('active');
        }
        
        // console.log(navItem.getAttribute("href"));
        // console.log(window.location.pathname)
    });
    
    // This works now, thank you //
    // console.log('lkjsdlkfjaldf akdjf');
    // $('body').on('mouseenter', '.card-body', function(){
    //     $(this).toggleClass('hoverResearchItem');
    // });
    
    
    /* --- for the year selection on new --- */
    var start = 1900;
    var end = new Date().getFullYear();
    var options = "<option selected>Select Year</option>";
    for(var year = start ; year <=end; year++){
      options += "<option>"+ year +"</option>";
    }
    document.getElementById("year").innerHTML = options;
});

// $('p').on('mouseenter', function(){
//     $(this).css('background-color', 'red');
// });

// $('.card-body').on('click', function(){
//     $(this).css('border', 'red solid 2px');
// })

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