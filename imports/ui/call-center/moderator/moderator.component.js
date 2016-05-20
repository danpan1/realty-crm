/**
 * Created by Danpan on 11.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './moderator.view.html';

class Moderator {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    this.$timeout = $timeout;
    $reactive(this).attach($scope);
    // console.log('mode');
    this.getNew();
    this.rating = {
        variants: [10,20,30,40,50,60,70,80,90,100]
    }
  }
  
  getNew() {
    this.isLoading = true;
    const vm = this;
    Meteor.call('moderatorGet', (error, result)=> {
      if (error) {
        console.log('error', error);
      } else {
        this.$timeout(()=> {
          vm.realty = result;
          vm.isLoading = false;
          console.log('новый объект', vm.realty);
          if (!result) {
            vm.isLoading = true;
          }
        });
      }
    });
  }

  save(approved) {
    this.realty.moderator.status = 'done';
    //Если одобрил модератор то размещается на доске объявлений
    this.setPercents();
    if (approved) {
      this.realty.status = 'sale';
    }else{
      this.realty.status = 'taken';
    }
    Meteor.call('moderatorSave', this.realty, (error)=> {
      if (error) {
        console.log('error', error);
      } else {
        this.getNew();
      }
    });
  }

  setMainImage(image) {
    let imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
      return (item.originalName === image.originalName);
    });
    this.realty.image = this.realty.details.thumbnails[imageIndex].url;
    console.log('setMainImage',this.realty.image);
  }
  
  setPercents () {
    if (!this.realty.moderator) {
      this.realty.moderator = {};
    }
    if (!this.realty.moderator.percent) {
      this.realty.moderator.percent = {
        advertisement: 0,
        photo: 0,
        description: 0
      };
    }
    let percent = this.realty.moderator.percent;
    percent.isExclusive = (this.realty.realtor.isExclusive) ? 20 : 0;
    percent.isCheckout = (this.realty.realtor.isCheckout) ? 20 : 0;
    this.realty.moderator.percent.total = ((percent.photo || 0) * 0.2) + ((percent.advertisement || 0) * 0.2) + ((percent.description || 0) * 0.2) + percent.isExclusive + percent.isCheckout;
    console.log(this.realty);
  }
 
}

const moduleName = 'moderator';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/moderator/moderator.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Moderator
});
