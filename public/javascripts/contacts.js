

var app = angular.module('contactApp', []);

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

  /**
   * Old code */
  $scope.editSubmit = function(arg) {
    $scope.editContactName = $scope.contacts[arg].name;
    $scope.editContactNumber = $scope.contacts[arg].number;
    $scope.editContactWeight = arg;
  }
  
  /**
   * Saving a contact 
   */
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
