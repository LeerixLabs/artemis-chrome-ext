angular.module('mainApp').factory('connectAuthenticate', function connectAuthenticate($http, $q, commonStorage) {

	function authenticate(octaneURL, userName, password) {
		let index = octaneURL.indexOf('/', octaneURL.indexOf('/') + 2);
		let octaneServerURL = octaneURL.substring(0, index);
		let authenticationUrl = octaneURL.substring(0, index) + '/authentication/sign_in';
		let data = {
			octaneURL: octaneServerURL,
			headers: {
				'Content-Type': 'application/json',
				'HPECLIENTTYPE': 'HPE_MQM_UI'
			},
			cookies: {
				HPSSO_COOKIE_CSRF: ''
			}
		};
		let authenticationReq = {
			method: 'POST',
			url: authenticationUrl,
			headers: data.headers,
			body: {
				'user': userName,
				'password': password
			}
		};
		return $q(function(resolve, reject) {
			$http.post(authenticationReq.url, authenticationReq.body)
			.then(function() {
				let cookieData = {
					url: authenticationReq.url,
					name: Object.keys(data.cookies)[0]
				};
				chrome.cookies.get(cookieData, function (cookie) {
					data.cookies['HPSSO_COOKIE_CSRF'] = cookie.value;
					commonStorage.save('octaneAuthentication', data);
				});
				resolve('Authentication succeeded');
			})
			.catch(function() {
				console.log('Unable to authenticate: ' + authenticationReq.url);
				reject('Authentication failed');
			});
		});
	}

	return {
		authenticate: authenticate
	};
});
