import ATV from 'atvjs';
// templates
import listTemplate from './templates/list.jade';

let myPageStyles = `
.text-bold {
    font-weight: bold;
}
.text-white {
    color: rgb(255, 255, 255);
}
`;

App.onLaunch = function (options) {
    var demoPage = ATV.Page.create({
        name: 'demo',
        style: myPageStyles,
        template: listTemplate,
        data: {
          title: 'Demo',
          results: [
            {
              id: 1,
              style: '',
              title: 'First item',
              preview: {
                url: '',
                style: '',
                title:'First Preview'
              }
            }
          ]
        }
    });
    // create menu page
    ATV.Menu.create({
        // any attributes that you want to set on the root level menuBar element of TVML
        attributes: {},
        // array of menu item configurations
        items: [{
            id: 'top',
            name: 'Top'
        }, {
            id: 'demo',
            name: 'Demo',
            page: demoPage
        }]
    });
    ATV.Navigation.navigateToMenuPage();
};


App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {

}

App.onDidBecomeActive = function() {

}

App.onWillTerminate = function() {

}
