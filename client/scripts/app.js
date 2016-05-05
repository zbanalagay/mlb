;(function(){
  'use strict';

  mlb.canvas.width = window.innerWidth;
  mlb.getJSON("http://gdx.mlb.com/components/game/mlb/year_2016/month_04/day_29/master_scoreboard.json", responseIsReturned);


  function responseIsReturned(err, response){
    if(err !== null){
      console.error(err);
    } else{
      var gamesArray = [];

      for(var i = 0; i<response.data.games.game.length; i++){
        var gameObj = {};

        gameObj.videoThumbnails = response.data.games.game[i].video_thumbnails.thumbnail;
        gameObj.awayTeamName = response.data.games.game[i].away_team_name;
        gameObj.homeTeamName = response.data.games.game[i].home_team_name;
        gameObj.venue = response.data.games.game[i].venue;
        gameObj.date = response.data.games.game[i].original_date;
        gamesArray.push(gameObj);
      }
      console.log(gamesArray);

      if(mlb.canvas.getContext){
        var context = mlb.canvas.getContext('2d');

        for(var j = 0; j<gamesArray.length; j++){
          var img = new Image();
          img.src = gamesArray[j].videoThumbnails[0].content;
          img.width = gamesArray[j].videoThumbnails[0].width;
          img.height = gamesArray[j].videoThumbnails[0].height;
          img.onload = (function(img,j){
              return function(){
                context.drawImage(img, j * img.width, img.height/2);
              }
          })(img,j);
        }
      }


      //test
      document.onkeydown = checkKey;

      function checkKey(e){
        e = e || window.event;
        console.log('Sookie')
        if(e.keyCode === 37){
          console.log('left arrow');
          //go backwards
        } else if (e.keyCode === 39){
          console.log('right arrow');
          //go forwards
        }
      }
    }
  }

})();


//TODO make images selectable
//TODO scroll through images

//TODO onload attribute
//TODO after this all works make the load faster
//TODO optimize this/or make it neater
// TODO try webgl context later
//TODO research if the context & canvas should be in here or before getting JSON
