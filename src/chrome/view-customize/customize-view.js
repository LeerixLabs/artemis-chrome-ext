angular.module('mainApp').directive('customizeView', function () {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: '../view-customize/customize-view.html'
	};
});

angular.module('mainApp').controller('customizeCtrl', function customizeCtrl($scope, commonFunctions) {

	$scope.model = {
		persistedSettings: commonFunctions.loadSettings(),
		settingsJson: commonFunctions.loadSettings(),
		uiStrings: {
			titlePrimary: 'Customize',
			titleSecondary: 'Update or reset the NLT library settings',
			resetButtonText: 'Reset',
			resetButtonTooltip: 'Reset settings',
			updateButtonText: 'Update',
			updateButtonTooltip: 'Update settings'
		}
	};

	function applySettings(settings) {
		try {
			JSON.parse(settings);
			$scope.model.settingsJson = settings;
			commonFunctions.saveSettings(settings);
			$scope.model.persistedSettings = settings;
			commonFunctions.attach(settings);
			commonFunctions.reload();
		} catch(err) {
			alert(err.message);
		}
	}

	$scope.canReset = function canReset() {
		return $scope.model.settingsJson !== commonFunctions.getDefaultSettings();
	};

	$scope.canUpdate = function canUpdate() {
		return $scope.model.settingsJson !== $scope.model.persistedSettings;
	};

	$scope.reset = function reset() {
		applySettings(commonFunctions.getDefaultSettings());
	};

	$scope.update = function update() {
		applySettings($scope.model.settingsJson);
	};

});
