  /* --- for the year selection on new --- */
    var start = 2014;
    var end = new Date().getFullYear();
    var options = "<option selected>Select Year</option>";
    for(var year = start ; year <=end; year++){
      options += "<option>"+ year +"</option>";
    }
    document.getElementById("year").innerHTML = options;