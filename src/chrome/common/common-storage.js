angular.module('mainApp').factory('commonStorage', function commonStorage() {

	function load(storageKey) {
		let str = localStorage.getItem(storageKey);
		return str ? JSON.parse(str) : {};
	}

	function save(storageKey, storageValue) {
		localStorage.setItem(storageKey, JSON.stringify(storageValue));
	}

	return {
		load: load,
		save: save
	}
});
