
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , emitter = require('events').EventEmitter
  , fileSystem = require('fs')
  , inspect = require('eyes').inspector({styles: {all: 'magenta'}});


var app = express(),
    Handler = new emitter;

function Main() {
  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);
  app.get('/users', user.list);

  http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
    Handler.emit('serverLoaded');
  });
}

var MainExtendables_ = {
  loadConfigurations : function() {
    fileSystem.readFile('config/db.json', function(error, data) {
      if (error) {
        // throw new Error(error);
      }
      else {
        client_CONFIG = JSON.parse(data);
        client_SET = require(client_CONFIG.client);
        client_SET.init(app);
      }
    });
  }
}

Main.prototype = MainExtendables_;

Handler.on('serverLoaded', function() {
  main.loadConfigurations();  
});

var main = new Main();
