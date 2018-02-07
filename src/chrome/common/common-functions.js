angular.module('mainApp').factory('commonFunctions', function commonFunctions(artemisSettingsDefault) {

	let artemisSettingsItemKey = 'artemisSettings';
	let defaultSettingsJson = JSON.stringify(artemisSettingsDefault, null, 2);

	function getActiveTab(cb) {
		chrome.tabs.query({active: true, currentWindow: true} ,function(tabs){
			if (tabs.length > 0) {
				cb(tabs[0]);
			}
		});
	}

	function loadSettings() {
		return localStorage.getItem(artemisSettingsItemKey) || defaultSettingsJson;
	}

	function saveSettings(settingsJson) {
		localStorage.setItem(artemisSettingsItemKey, settingsJson);
		return settingsJson;
	}

	function getDefaultSettings() {
		return defaultSettingsJson;
	}

	function attach(settingsJson) {
		let settings = settingsJson || loadSettings();
		getActiveTab(function(activeTab) {
			chrome.runtime.sendMessage({
				type: 'artemis-msg-attach-tab-extension-ui',
				msg: {
					tab: {
						id: activeTab.id
					},
					settings: settings
				}
			}, function() {
				window.close();
			});
		});
	}

	function reload() {
		getActiveTab(function(activeTab) {
			chrome.tabs.executeScript(activeTab.id, {code: 'window.location.reload();'});
		});
	}

	return {
		loadSettings: loadSettings,
		saveSettings: saveSettings,
		getDefaultSettings: getDefaultSettings,
		getActiveTab: getActiveTab,
		attach: attach,
		reload: reload
	}
});
