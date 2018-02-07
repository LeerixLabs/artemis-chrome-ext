angular.module('mainApp').directive('learnView', function () {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: '../view-learn/learn-view.html'
	};
});

angular.module('mainApp').controller('learnCtrl', function tryCtrl($scope, commonFunctions) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'Learn',
			titleSecondary: 'Read the documentation about Natural Language Testing'
		}
	};

});
