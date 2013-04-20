
function Contacts($scope) {
  
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
  $scope.editContact = [];
  $scope.editSubmit = function(arg) {
    $scope.editContactName = $scope.contacts[arg].name;
    $scope.editContactNumber = $scope.contacts[arg].number;
    $scope.editContactWeight = arg;
  }
  
  $scope.saveContact = function(weight) {
    try {
      $scope.contacts[weight].name = this.editContactName;
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
    this.editContactWeight = null;
  }

}

