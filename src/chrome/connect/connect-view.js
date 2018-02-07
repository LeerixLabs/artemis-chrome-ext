angular.module('mainApp').directive('connectView', function() {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: '../connect/connect-view.html'
	};
});

angular.module('mainApp').controller('connectCtrl', function connectCtrl($scope, $sce, commonStorage, connectAuthenticate) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'ALM Octane Connection',
			titleSecondary: 'Login to ALM Octane',
			octaneUrlLabel: 'Octane URL:',
			octaneUrlPlaceholder: 'https://...',
			usernameLabel: 'Username:',
			usernamePlaceholder: '',
			passwordLabel: 'Password:',
			passwordPlaceholder: '',
			loginSuccess: 'Authentication succeeded',
			loginFailure: 'Authentication failed'
		},
		octaneURL: '',
		usernameInput: '',
		passwordInput: '',
		loginInProgress: false,
		loginStatus: '',
		loginSucceeded: false
	};

	$scope.canLogin = function canLogin() {
		return $scope.model.usernameInput && $scope.model.passwordInput && $scope.model.octaneURL && !$scope.loginInProgress;
	};

	$scope.onLoginClick = function onLoginClick() {
		$scope.loginInProgress = true;
		$scope.model.loginStatus = '';
		authenticate();
	};

	function authenticate() {
		connectAuthenticate.authenticate($scope.model.octaneURL, $scope.model.usernameInput, $scope.model.passwordInput)
		.then(function() {
			$scope.model.loginSucceeded = true;
		})
		.catch(function() {
			$scope.model.loginSucceeded = false;
		})
		.finally(function() {
			$scope.model.loginStatus = $scope.model.loginSucceeded ? $scope.model.uiStrings.loginSuccess : $scope.model.uiStrings.loginFailure;
			$scope.loginInProgress = false;
		});
	}

});
