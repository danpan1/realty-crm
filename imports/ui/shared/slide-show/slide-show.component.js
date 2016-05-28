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
    this.marginConst = 1028;
  }

  showSlides() {
    // init and count slider width
    if (this.slidesList && this.slidesList.length) {
      this.sliderMaxWidth = this.slidesList.length * (this.marginConst);
      this.slideInnerStyle = {'margin-left': this.slideMargin + 'px', 'width': this.sliderMaxWidth + 'px'};
    }
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
        this.slideMargin = -this.slideCount * this.marginConst;
      }
      ;
    } else { // if previous
      if (this.slideCount - 1 < 0) {
        this.slideCount = max - 1;
        this.slideMargin = -(max - 1) * this.marginConst;
      }
      else {
        this.slideCount--;
        this.slideMargin = -this.slideCount * this.marginConst;
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