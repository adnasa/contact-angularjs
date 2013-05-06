
var cradle = require('cradle')
  // @TODO: Research on Dependency Injections later.
  // Find resource about it at the least.
  , inspect = inspect = require('eyes').inspector({styles: {all: 'magenta'}});
var db = new(cradle.Connection)().database('contacts');

/**
 * LOAD OF CRAP FOR NOW
var CouchContactDriver = function () {
  this.connection;
}

CouchContactDriver.prototype.init = function() {
  this.exists();
}

CouchContactDriver.prototype.setConnection = function(connectionResponse) {
  this.connection = connectionResponse;
}

CouchContactDriver.prototype.createDB = function() {
  // whatever...
  this.connection = db.create();
}

CouchContactDriver.prototype.exists = function() {
  var _that = this;
  db.exists(function(err, exists) {
    if (err) {
      _that.setConnection(err);
    }
    else if (exists) {
      _that.setConnection(exists);
    }
    else {
      _that.createDB();
    }
  });
}
*/

function prepopulate() {
  // Save a view
  // db.save('_design/contacts', {
  //   views: {
  //     byNameAndNumber: {
  //       map: function (doc) {
  //         if (doc.resource === 'Contact' && doc.name && doc.number) {
  //           var key = [doc.name, doc.number]
  //           emit(key, doc)
  //         }
  //       }
  //     },
  //     byName : {
  //       map: function (doc) {
  //         if (doc.resource === 'Contact' && doc.name) {
  //           var key = doc.name;
  //           emit(key, doc);
  //         }
  //       }
  //     },
  //     byNumber: {
  //       map: function (doc) {
  //         if (doc.resource === 'Contact' && doc.number) {
  //           var key = doc.number;
  //           emit(key, doc);
  //         }
  //       }
  //     }
  //   }
  // });
}

function init(app) {
  db.exists(function(err, exists) {
    if (err) {
      inspect(err);
    }
    else if (exists) {
      console.log(exists);
      prepopulate();
    }
    else {
      db.create();
    }
  });
}

exports.init = init;
