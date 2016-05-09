var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + './../client'));

  var mlbRouter = express.Router();

  app.use('/api/mlb', mlbRouter);

  require('./routes/mlbRoutes.js')(mlbRouter);
}
