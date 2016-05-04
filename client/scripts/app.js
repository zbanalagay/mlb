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
      //TODO research if the context & canvas should be in here or before getting JSON

      if(mlb.canvas.getContext){
        var context = mlb.canvas.getContext('2d');


        // TODO try webgl context later

      }
    }
  }

})();


//TODO onload attribute
//TODO after this all works make the load faster
