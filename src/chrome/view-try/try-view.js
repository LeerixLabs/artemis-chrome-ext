angular.module('mainApp').directive('tryView', function () {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: '../view-try/try-view.html'
	};
});

angular.module('mainApp').controller('tryCtrl', function tryCtrl($scope, $timeout, commonFunctions) {

	let promise = null;

	$scope.model = {
		sentence: 'find link',
		uiStrings: {
			titlePrimary: 'Try',
			titleSecondary: 'Execute a single Artemis command on the current active browser tab',
			sentenceInputTooltip: 'Try an Artemis command',
			findButtonText: 'Find',
			findButtonTooltip: 'Find element',
			runButtonText: 'Run',
			runButtonTooltip: 'Run command'
		}
	};

	$scope.onChanged = function() {
		if (promise) {
			$timeout.cancel(promise);
		}
		promise = $timeout(() => {
			if ($scope.canFind()) {
				$scope.find();
			}
		}, 1000);
	};

	$scope.onKeyPressed = function($event) {
		let keyCode = $event.which || $event.keyCode;
		if (keyCode === 13 && $scope.canRun()) {
			$scope.run();
		}
	};

	$scope.canFind = function canFind() {
		return !!$scope.model.sentence.trim();
	};

	$scope.canRun = function canRun() {
		return !!$scope.model.sentence.trim();
	};

	$scope.find = function find() {
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
