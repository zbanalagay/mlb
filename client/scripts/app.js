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
      // gameObj.date = response.data.games.game[i].original_date;
      gamesArray.push(gameObj);
    }
    makeImgTags(gamesArray);
    document.addEventListener('keydown', doKeyEvent, true);

      //TODO make it cleaner
      //TODO possibly find away to not have to empty but just shift
    function makeImgTags(gamesArray){

        for(var k = 0; k<gamesArray.length; k++){
          var element = document.createElement("img");
          element.setAttribute("src", gamesArray[k].videoThumbnails.content);
          element.setAttribute("height", gamesArray[k].videoThumbnails.height);
          element.setAttribute("width", gamesArray[k].videoThumbnails.width);
          element.setAttribute("alt", gamesArray[k].homeTeamName + ' vs ' + gamesArray[k].awayTeamName);
          if(k === 4){
            var activeContainer = document.createElement("div");
            activeContainer.className = "active";
            var headline = document.createElement("h2");
            headline.className = "active";
            var subtitle = document.createElement("h4");
            subtitle.className = "active";

            headline.innerHTML = gamesArray[k].homeTeamName + ' vs ' + gamesArray[k].awayTeamName;
            subtitle.innerHTML = '@ '+ gamesArray[k].venue;
            activeContainer.appendChild(headline);
            activeContainer.appendChild(element);
            activeContainer.appendChild(subtitle);
            mlb.imageContainer.appendChild(activeContainer);
          }else{
              mlb.imageContainer.appendChild(element);
          }
        }
    }
    function doKeyEvent(event){
      var k;
      var temp;
      event = event || window.event;
      if(event.keyCode ===37){
          //go backwards
        mlb.imageContainer.innerHTML = " ";
        temp= gamesArray.shift();
        gamesArray.push(temp)
        makeImgTags(gamesArray);
      } else if (event.keyCode === 39){
          //go forwards
        mlb.imageContainer.innerHTML = " ";
        temp = gamesArray.pop();
        gamesArray.unshift(temp);
        makeImgTags(gamesArray);
      }
    }
  }
})();

//TODO refactor back to Canvas because it doesnt actually attach to the DOM
//TODO make images selectable
//TODO scroll through images
  //center img starts big, when scrolling, whatever img is there, becomes big --> need selected variable?

//TODO onload attribute
//TODO after this all works make the load faster
//TODO optimize this/or make it neater
// TODO try webgl context later
//TODO research if the context & canvas should be in here or before getting JSON
