/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Email} from 'meteor/email';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {Accounts} from 'meteor/accounts-base';
import {dictionary} from '/imports/helpers/dictionary';

import './one-email.view.html';

class OneEmail {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    let vm = this;
    this.proposalSent = 0;
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        console.log(user, 'user');
        this.user = user;
        this.info = {
            emails:'',
            //topic: '',
            addedinfo: '',
            dealcondition: '',
            partnerpercent: '',
            username: user.profile.name + ' ' + user.profile.surName,
            useremail: user.emails[0].verified ? user.emails[0].address : false
        }
      }
    });
    console.log(this.user);
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
        let number = vm.realty.price.toString();
        number = number.split('').reverse().join('');
        number = number.length > 3 ? number.length > 6 ? number.length > 6 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
        vm.price = number.split('').reverse().join('');
        vm.info.topic = 'Преложение для [[Имя]]: ' + vm.realty.roomcount + '-комнатная, м.' + vm.realty.address.subwaysEmbedded[0].name + ' ' + vm.realty.address.metroTime + ' мин. ' + vm.dictionary.transport[vm.realty.address.metroTransport].name + ', ' + vm.price + ' руб.';
        let realtyConditions = vm.price + ' рублей в месяц, депозит ' + vm.price + ' рублей';
        let comission = vm.realty.comission ? ', комиссия ' + vm.realty.comission : '';
        vm.info.realtyConditions = realtyConditions + comission;
      }
    });
    
  }
  
  send () {
      let vm = this;
      vm.proposalSent = 1;
      Meteor.call('sendTest', this.info, this.realty, (error, result) => {
          if (error) {
              console.log(error);
          } else {
              console.log(`Cool!`);
              vm.proposalSent = 2;
          }
      });
  }

}

const moduleName = 'oneEmail';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-email/one-email.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneEmail
  });
