;(function(){
  'use strict';

  mlb.getJSON('/api/mlb/getJSON', responseIsReturned);

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
      gamesArray.push(gameObj);
    }
    makeImgTags(gamesArray);
    document.addEventListener('keydown', doKeyEvent, true);

    function doKeyEvent(event){
      var temp;
      event = event || window.event;
      mlb.imageContainer.innerHTML = ' ';
      if(event.keyCode ===37){
          //go backwards
        temp = gamesArray.shift();
        gamesArray.push(temp)
        // makeImgTags(gamesArray);
      } else if(event.keyCode === 39){
          //go forwards
        temp = gamesArray.pop();
        gamesArray.unshift(temp);
      }
      makeImgTags(gamesArray);
    }

    function makeImgTags(gamesArray){
        for(var k = 0; k<gamesArray.length; k++){
          var element = document.createElement('img');
          element.setAttribute('src', gamesArray[k].videoThumbnails.content);
          element.setAttribute('height', gamesArray[k].videoThumbnails.height);
          element.setAttribute('width', gamesArray[k].videoThumbnails.width);
          element.setAttribute('alt', gamesArray[k].homeTeamName + ' vs ' + gamesArray[k].awayTeamName);
          if(k === 4){
            var activeContainer = document.createElement('div');
            var headline = document.createElement('h2');
            var subtitle = document.createElement('h4');
            activeContainer.className = 'active';
            headline.className = 'active';
            subtitle.className = 'active';
            element.className = 'active';
            headline.innerHTML = gamesArray[k].homeTeamName + ' vs ' + gamesArray[k].awayTeamName;
            subtitle.innerHTML = '@ '+ gamesArray[k].venue;
            activeContainer.appendChild(headline);
            activeContainer.appendChild(subtitle);
            activeContainer.appendChild(element);
            mlb.imageContainer.appendChild(activeContainer);
          } else{
              mlb.imageContainer.appendChild(element);
          }
        }
    }

  }
})();
