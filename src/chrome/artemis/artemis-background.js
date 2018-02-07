(function () {
    let artemisAttachedTabs = [];

    function sendMessageToAllArtemisAttachedTabs(msg) {
		chrome.browserAction.setBadgeText({text: ''});
        artemisAttachedTabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, {'type': 'artemis-msg-execute-commands-background-page', 'msg': msg}, function (res) {
            });
        });
    }

	//Receive message from the content script or extension ui and distribute it to all the attached tabs
    chrome.runtime.onMessage.addListener(function (request /*, sender, sendResponse*/) {
        if (request.type === 'artemis-msg-attach-tab-extension-ui') {
            let tab = request.msg.tab;
            let filtered = artemisAttachedTabs.filter(function (t) {
                return t.id === tab.id;
            });
            if (filtered.length === 0) {
                artemisAttachedTabs.push(tab);
            }
            sendMessageToAllArtemisAttachedTabs(
                JSON.stringify([{
                    command: 'reset',
                    data: request.msg.settings
                }])
            );
        } else if (request.type === 'artemis-msg-execute-commands-content-script' || request.type === 'artemis-msg-execute-commands-extension-ui') {
            sendMessageToAllArtemisAttachedTabs(request.msg);
        } else if (request.type === 'artemis-msg-find-result-content-script') {
        	//let tabId = sender.tab.id;
        	if (!request.msg) {
				chrome.browserAction.setBadgeText({text: ''});
			} else if (request.msg === '0') {
				chrome.browserAction.setBadgeText({text: '0'});
				chrome.browserAction.setBadgeBackgroundColor({color: '#AAAAAA'});
			} else if (request.msg === '1') {
				chrome.browserAction.setBadgeText({text: '1'});
				chrome.browserAction.setBadgeBackgroundColor({color: '#669966'});
			} else {
				chrome.browserAction.setBadgeText({text: request.msg});
				chrome.browserAction.setBadgeBackgroundColor({color: '#BB7766'});
            }
        }
    });
})();


