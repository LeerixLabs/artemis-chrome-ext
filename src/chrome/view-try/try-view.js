angular.module('mainApp').directive('tryView', function () {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: '../view-try/try-view.html'
	};
});

angular.module('mainApp').controller('tryCtrl', function tryCtrl($scope, commonFunctions) {

	$scope.model = {
		sentence: 'find link',
		uiStrings: {
			titlePrimary: 'Try',
			titleSecondary: 'Execute a single Artemis command on the current active browser tab',
			findButtonText: 'Find',
			findButtonTooltip: 'Find element',
			runButtonText: 'Run',
			runButtonTooltip: 'Run command'
		}
	};

	$scope.canFind = function canFind() {
		return !!$scope.model.sentence.trim();
	};

	$scope.canRun = function canRun() {
		return !!$scope.model.sentence.trim();
	};

	$scope.find = function run() {
		commonFunctions.getActiveTab(function() {
			chrome.runtime.sendMessage({
				type: 'artemis-msg-execute-commands-extension-ui',
				msg: JSON.stringify([
					{
						command: 'debug',
						data: $scope.model.sentence.trim()
					}
				], null, 2),
			}, function() {
				//window.close();
			});
		});
	};

	$scope.run = function run() {
		commonFunctions.getActiveTab(function() {
			chrome.runtime.sendMessage({
				type: 'artemis-msg-execute-commands-extension-ui',
				msg: JSON.stringify([
					{
						command: 'run',
						data: $scope.model.sentence.trim()
					}
				], null, 2),
			}, function() {
				//window.close();
			});
		});
	};

});
