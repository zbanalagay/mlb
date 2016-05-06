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

      gameObj.videoThumbnails = response.data.games.game[i].video_thumbnails.thumbnail[0];
      gameObj.awayTeamName = response.data.games.game[i].away_team_name;
      gameObj.homeTeamName = response.data.games.game[i].home_team_name;
      gameObj.venue = response.data.games.game[i].venue;
      gameObj.date = response.data.games.game[i].original_date;
      gamesArray.push(gameObj);

      var element = document.createElement("img");
      element.className = 'baseball'
      element.setAttribute("src", response.data.games.game[i].video_thumbnails.thumbnail[0].content);
      element.setAttribute("height", response.data.games.game[i].video_thumbnails.thumbnail[0].height);
      element.setAttribute("width", response.data.games.game[i].video_thumbnails.thumbnail[0].width);
      element.setAttribute("alt", response.data.games.game[i].home_team_name + ' vs ' + response.data.games.game[i].away_team_name);
      mlb.container.appendChild(element);

    }
    console.log(gamesArray);
    var count = 0;
      document.addEventListener('keydown', doKeyEvent, true);
      document.addEventListener('keyup' , doKeyUp, true);

      //TODO get it to cycle
      //TODO make it cleaner
      //TODO possibly find away to not have to empty but just shift

      function doKeyEvent(event){
        console.log('clicky happened');
        var k;
        event = event || window.event;
        if(event.keyCode ===37){
          //go backwards
          console.log('left arrow', count);
          document.getElementById("container").innerHTML = " ";
          for(k = count-1; k<gamesArray.length; k++){
            var element = document.createElement("img");
            element.className = 'baseball'
            element.setAttribute("src", gamesArray[k].videoThumbnails.content);
            element.setAttribute("height", gamesArray[k].videoThumbnails.height);
            element.setAttribute("width", gamesArray[k].videoThumbnails.width);
            element.setAttribute("alt", gamesArray[k].homeTeamName + ' vs ' + gamesArray[k].awayTeamName);
            mlb.container.appendChild(element);
          }
          count--
        } else if (event.keyCode === 39){
          //go forwards
          console.log('right arrow ', count);
          document.getElementById("container").innerHTML = " ";
          for(k = count+1; k<gamesArray.length; k++){
            var element = document.createElement("img");
            element.className = 'baseball'
            element.setAttribute("src", gamesArray[k].videoThumbnails.content);
            element.setAttribute("height", gamesArray[k].videoThumbnails.height);
            element.setAttribute("width", gamesArray[k].videoThumbnails.width);
            element.setAttribute("alt", gamesArray[k].homeTeamName + ' vs ' + gamesArray[k].awayTeamName);
            mlb.container.appendChild(element);
          }
          count++
        }
      }
      function doKeyUp(){
        console.log( 'keyup');
        // stop scrolling
      }

      // function imageShift(dir){
      //   var img = document.getElementById("imgClickAndChange");
      //           img.src = imgs[imgs.indexOf(img.src) + (dir || 1)] || imgs[dir ? imgs.length - 1 : 0];
      //   }
      // }

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
