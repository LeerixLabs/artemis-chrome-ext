angular.module('mainApp').directive('enableView', function () {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: '../view-enable/enable-view.html'
	};
});

angular.module('mainApp').controller('enableCtrl', function enableCtrl($scope, commonFunctions) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'Enable',
			titleSecondary: 'Attach the NLT library to the current active browser tab',
			enableButtonText: 'Enable',
			enableButtonTooltip: 'Enable for current tab'
		}
	};

	$scope.enable = function enable(){
		commonFunctions.attach();
	};

});
