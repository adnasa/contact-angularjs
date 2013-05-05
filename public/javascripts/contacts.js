/**
 * @file Contacts
 * Add and edit contacts
 */

// Define our app
// No dependencies for now.
var app = angular.module('contactApp', []);

/**
 * ContactsController
 */
app.controller('Contacts', ['$scope', function($scope) {
  $scope.contacts = [
    {
      name: 'adnasa',
      number : 12345
    }
  ];  
  
  $scope.reloadContacts = function() {
    for (var i = 0; i < $scope.contacts.length; i++) {
      $scope.contacts[i].weight = i;
    };
  }

  $scope.saveContact = function(weight) {
    try {
      if (!weight) {
        $scope.contacts.push({
          name: this.editContactName,
          number : this.editContactNumber
        });
      }
    }
    catch(e) {
      // Just log this baby
      console.dir('Saving errorException:', [e]);
    }
    $scope.reloadContacts();
    this.editContactName = '';
    this.editContactNumber = '';
    this.editContactWeight = null;
  }
}]);
