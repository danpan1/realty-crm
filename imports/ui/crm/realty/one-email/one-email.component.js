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
import {Clients} from '/imports/api/clients';

import './one-email.view.html';

class OneEmail {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams, $timeout) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout; 
    let vm = this;
    this.proposalSent = 0;
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        console.log(user, 'user');
        this.user = user;
        this.info = {
            emails:'',
            addedinfo: '',
            dealcondition: '',
            partnerpercent: '',
            username: user.profile.name + ' ' + user.profile.surName,
            useremail: user.emails[0].verified ? user.emails[0].address : false
        }
      }
    });
    console.log(this.$stateParams);
    
    if(this.$stateParams.clientId){
      
      vm.helpers({
        client: () => {
          return Clients.findOne({_id: $stateParams.clientId});
        }
      });
      if(vm.client){
        vm.info.emails = vm.client.email;
        vm.checkClientsEmails();
      }
    
      /*this.subscribe('listClients', () => {
        return [{_id: this.$stateParams.clientId}];
      }, {
        onReady () {
          console.log()
          vm.clients = Clients.findOne({});
          this.$timeout(()=>{
            if(vm.clients.email){
              vm.info.emails = vm.clients.email;
              checkClientsEmails(vm.clients.email);
            }
          })
        }
      });
      this.helpers({
        clients() {
          return Clients.find({_id: this.$stateParams.clientId});
        }
      });*/
    }
    
    /*this.subscribe('listClients', () => {
      return [{
        status: vm.getReactively('email')
      }];
    });
    vm.helpers({
      clients() {
        return Clients.find({}, {sort: vm.getReactively('sort')});
      }
    });*/
      
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
        let transport = (vm.realty.address.metroTime ? vm.realty.address.metroTime + ' мин. ' : '') + (vm.realty.address.metroTime && vm.dictionary.transport[vm.realty.address.metroTransport] ? vm.dictionary.transport[vm.realty.address.metroTransport].name + ', ' : '');
        let number = vm.realty.price.toString();
        number = number.split('').reverse().join('');
        number = number.length > 3 ? number.length > 6 ? number.length > 6 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
        vm.price = number.split('').reverse().join('');
        vm.info.topic = vm.realty.roomcount + '-комнатная, м.' + vm.realty.address.subwaysEmbedded[0].name + ' ' + transport + vm.price + ' руб.';
        vm.topicTemplate = vm.info.topic;
        console.log(vm.info.topic);
        let realtyConditions = vm.price + ' рублей в месяц, депозит ' + vm.price + ' рублей';
        let comission = vm.realty.comission ? ', комиссия ' + vm.realty.comission : '';
        vm.info.realtyConditions = realtyConditions + comission;
        console.log(vm.realty);
        vm.realty.details.descr = vm.realty.details.descr.replace(/<p>/g,'').replace(/<\/p>/g,' \r\n  \r\n').replace(/<br>|<br\/>|<br \/>/g,' \r\n');
      }
    });
    
  }
  
  checkClientsEmails () {
    let vm = this;
    Meteor.call('clientEmails', vm.info.emails, (error, result) => {
        if (error) {} 
        else {
          this.$timeout(()=>{
            if(result){
              vm.info.topic = result + ', для вас есть предложение: ' + vm.topicTemplate;
            }            
          },50)
        }
    });
  }
  
  send () {
      let vm = this;
      vm.proposalSent = 1;
      Meteor.call('sendTest', this.info, this.realty, (error, result) => {
          if (error) {
              console.log(error);
              vm.proposalSent = 0;
          } else {
            vm.$timeout(()=>{
              console.log(`Cool!`);
              vm.proposalSent = 2;
            },50);
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
