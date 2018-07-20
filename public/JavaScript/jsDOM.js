// alert('I am here!!');





/* --- for research publication items --- */
jQuery(document).ready(function($){
    
    var navItems = document.querySelectorAll('.nav-item');
    
    // console.log(navItems.length);
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
    
    // showing the add profile image form
    var profilePicButton = document.querySelector("#edit-profile-pic");
    var profilePicForm = document.querySelector(".edit-profile-pic-form");
    
    profilePicButton.addEventListener('click', function(){
        profilePicForm.classList.toggle("edit-profile-pic-form");
    });
    
    // This works now, thank you //
    // console.log('lkjsdlkfjaldf akdjf');
    // $('body').on('mouseenter', '.card-body', function(){
    //     $(this).toggleClass('hoverResearchItem');
    // });
    
    
  
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
