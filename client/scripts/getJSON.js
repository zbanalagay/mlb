;(function(){
  'use strict';

  mlb.getJSON = function(url, callback){
    var request = new XMLHttpRequest();
    request.open("get", url, true);
    request.responseType = "json";
    request.onreadystatechange = function(){
      if(request.readyState === 4){
        var status = request.status;
        if(status === 200){
          callback(null, request.response)
        } else{
          callback(status)
        }
      }
    };
    request.onerror = function(error){
      console.error(request.statusText);
    };
    request.send();
  }

  mlb.canvas = document.getElementById('display');

  mlb.resize = function(){
    if(mlb.canvas.width !== window.innerWidth){
      mlb.canvas.width = window.innerWidth;
    }
    if(mlb.canvas.height !== (window.innerHeight/5)){
      mlb.canvas.height = (window.innerHeight/5)
    }
  }
})();
