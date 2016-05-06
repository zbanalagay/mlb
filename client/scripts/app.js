;(function(){
  'use strict';

  mlb.getJSON("http://gdx.mlb.com/components/game/mlb/year_2016/month_04/day_29/master_scoreboard.json", responseIsReturned);

  function responseIsReturned(err, response){
    if(err !== null){
      console.error(err);
    } else{
      populateContainer(response);
    }
  }

  function populateContainer(response){
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

      for(var j = 0; j<gamesArray.length; j++){
        var element = document.createElement("img");
        element.setAttribute("src", gamesArray[j].videoThumbnails[0].content);
        element.setAttribute("height", gamesArray[j].videoThumbnails[0].height);
        element.setAttribute("width", gamesArray[j].videoThumbnails[0].width);
        element.setAttribute("alt", gamesArray[j].homeTeamName + ' vs ' + gamesArray[j].awayTeamName);
        mlb.container.appendChild(element);
      }

      document.addEventListener('keydown', doKeyEvent, true);
      document.addEventListener('keyup' , doKeyUp, true);

      function doKeyEvent(event){
        console.log('clicky happened');
        var x = event.offsetX;
        var y = event.offsetY;
        event = event || window.event;
        if(event.keyCode ===37){
          console.log('left arrow');
          // console.log(mlb.canvas.getBoundingClientRect(), 'canvas left key')

          console.log(x, y, 'offsets')
          //go backwards
        } else if (event.keyCode === 39){
          console.log('right arrow ');
            // console.log(mlb.canvas.getBoundingClientRect(), 'canvas right key')
          //go forwards
          console.log(x, y, 'offsets')
        }
      }
      function doKeyUp(){
        console.log( 'keyup');
        // stop scrolling
      }

  }
})();

//TODO refactor without canvas to make it work first
//TODO make images selectable
//TODO scroll through images
  //center img starts big, when scrolling, whatever img is there, becomes big --> need selected variable?

//TODO onload attribute
//TODO after this all works make the load faster
//TODO optimize this/or make it neater
// TODO try webgl context later
//TODO research if the context & canvas should be in here or before getting JSON
