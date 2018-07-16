let mainApp = angular.module('mainApp', [], function() {
});

angular.module('mainApp').controller('mainCtrl', function mainCtrl($scope, commonStorage) {

    $scope.model = {
        title: 'Artemis Natural Language Web UI Locator',
        tabs: [
			{title: 'Enable', id: 'enable'},
			{title: 'Learn', id: 'learn'},
            {title: 'Try', id: 'try'},
			{title: 'Customize', id: 'customize'}
        ]
    };

    function loadSettingsFromLocalStorage() {
        let data = commonStorage.load('almOctaneNltChromeExtSettings');
        if (Object.keys(data).length !== 0) {
            if (data.currentTab) {
                $scope.model.activeTabId = data.currentTab;
            }
        } else {
            $scope.model.activeTabId = $scope.model.tabs[0].id;
        }
    }

    $scope.onTabClick = function onTabClick(id) {
        $scope.model.activeTabId = id;
        let data = {currentTab: $scope.model.activeTabId};
        commonStorage.save('almOctaneNltChromeExtSettings', data);
    };

    $scope.onCloseClick = function onCloseClick() {
        window.close();
    };

    loadSettingsFromLocalStorage();

});