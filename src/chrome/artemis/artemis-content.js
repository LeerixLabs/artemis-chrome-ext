(function(){

	//Receive message from Octane and send it to the background page
	window.addEventListener('message', function(request /*, sender*/) {
		if (request.source === window) {
			if (request.data && request.data.type === 'artemis-msg-execute-commands-alm-octane') {
				chrome.runtime.sendMessage({
					type: 'artemis-msg-execute-commands-content-script',
					msg: request.data.msg
				}, function (response) {
				});
			} else if (request.data && request.data.type === 'artemis-msg-find-result-artemis-core') {
				chrome.runtime.sendMessage({type: 'artemis-msg-find-result-content-script', msg: request.data.msg}, function(response) {
				});
			}
		}
	});

	//Receive message from the background page and execute it on the AUT page
	chrome.runtime.onMessage.addListener(function(request /*, sender, sendResponse*/) {
		if (request['type'] === 'artemis-msg-execute-commands-background-page') {
			artemisCore.execute(JSON.parse(request.msg));
		}
	});

})();
