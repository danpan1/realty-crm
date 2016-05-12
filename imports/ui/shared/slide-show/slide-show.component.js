import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './slide-show.view.html';

class SlideShow {
  constructor($scope, $reactive, $timeout) {
    'ngInject';
    $reactive(this).attach($scope);
    this.slideMargin = 0;
    this.sliderMaxWidth = 0;
    this.slideCount = 0;
    this.slideInnerStyle = {};
  }

  showSlides() {
    // init and count slider width
    this.sliderMaxWidth = this.slidesList.length * 1030 ;
    this.slideInnerStyle = {'margin-left': this.slideMargin + 'px', 'width': this.sliderMaxWidth + 'px'};
  }

  hideSlides() {
    this.isshown = false;
  }

  nextSlide(boo, max) {
    max = this.slidesList.length;
    if (boo) { // if next
      if (this.slideCount + 1 >= max) {
        this.slideCount = 0;
        this.slideMargin = 0;
      }
      else {
        this.slideCount++;
        this.slideMargin = -this.slideCount * 1030;
      }
      ;
    } else { // if previous
      if (this.slideCount - 1 < 0) {
        this.slideCount = max - 1;
        this.slideMargin = -(max - 1) * 1030;
      }
      else {
        this.slideCount--;
        this.slideMargin = -this.slideCount * 1030;
      }
      ;
    }
    // move slider
    this.slideInnerStyle = {'margin-left': this.slideMargin + 'px', 'width': this.sliderMaxWidth + 'px'};
  }

}

const moduleName = 'slideShow';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: `imports/ui/shared/slide-show/slide-show.view.html`,
  controllerAs: moduleName,
  bindings: {
    slidesList: '=',
    isshown: '='
  },
  controller: SlideShow
});