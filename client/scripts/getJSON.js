;(function(){
  'use strict';

  mlb.getJSON = function(url){
    var request = new XMLHttpRequest();
    request.open("get", url, true);
    request.responseType = "json";
    request.onreadystatechange = function(){
      if(request.readyState === 4){
        var status = request.status;
        if(status === 200){
          console.log(request.response);
        } else{
          console.error(request.statusText);
        }
      }
    };
    request.onerror = function(error){
      console.error(request.statusText);
    };
    request.send();
  }
})();
