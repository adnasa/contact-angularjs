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
      $scope.contacts[weight].name = this.editContactName;
      $scope.contacts[weight].number = this.editContactNumber;
    }
    catch(e) {
      if (!weight) {
        $scope.contacts.push({
          name: this.editContactName,
          number : this.editContactNumber
        });
      }
    }
    $scope.reloadContacts();
    this.editContactName = '';
    this.editContactNumber = '';
    this.editContactWeight = null;
  }
}]);
