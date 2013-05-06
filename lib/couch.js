
var cradle = require('cradle')
  // @TODO: Research on Dependency Injections later.
  // Find resource about it at the least.
  , inspect = inspect = require('eyes').inspector({styles: {all: 'magenta'}});
var db = new(cradle.Connection)().database('contacts');

/**
 * Define a _design of contacts for the database.
 * FOR NOW:
 *   Internal use only.
 *   All I'm basing this on is if there is an existing database, not an existing document.
 */
function _dbSetup(err, exists) {
  if (err) {
    throw Error("You fucked up");
  }
  else if (exists) {
    // Do nothing for now.
  }
  else {

    // Create our views.
    db.save('_design/contacts', {
      views: {
        // @def byNameAndNumber
        // Search:
        // @code
        //   db.view('contacts/byNameAndNumber', { key : [name, number] }, function(err, doc) {
        //     // Handle our doc.
        //     console.log(doc);
        //   });
        byNameAndNumber: {
          map: function (doc) {
            if (doc.resource === 'Contact' && doc.name && doc.number) {
              var key = [doc.name, doc.number]
              emit(key, doc)
            }
          }
        },
        // @def byName
        byName : {
          map: function (doc) {
            if (doc.resource === 'Contact' && doc.name) {
              var key = doc.name;
              emit(key, doc);
            }
          }
        },
        // @def byNumber
        byNumber: {
          map: function (doc) {
            if (doc.resource === 'Contact' && doc.number) {
              var key = doc.number;
              emit(key, doc);
            }
          }
        }
      }
    });
  }
}

function init(app) {
  db.exists(function(err, exists) {
    if (err) {
      inspect(err, 'error');
    }
    else {
      inspect(exists, 'exists');
    }
    _dbSetup(err, exists);
  });

  // LATE NIGHT: Whatever, just return true for now...
  return true;
}

exports.init = init;
