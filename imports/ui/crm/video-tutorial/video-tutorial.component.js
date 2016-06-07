/**
 * Created by Danpan on 07.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './video-tutorial.view.html';

class VideoTutorial {
}

const moduleName = 'videoTutorial';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/video-tutorial/video-tutorial.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: VideoTutorial
});
