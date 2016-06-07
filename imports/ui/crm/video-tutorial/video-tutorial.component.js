/**
 * Created by Danpan on 07.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './video-tutorial.view.html';

class VideoTutorial {
  constructor(){

  }
  hideSlides(){
    console.log('hide');
    this.isVideoTutorial = !this.isVideoTutorial;
  }
}

const moduleName = 'videoTutorial';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/video-tutorial/video-tutorial.view.html',
  bindings: {
    isVideoTutorial : '='
  },
  controllerAs: moduleName,
  controller: VideoTutorial
});
