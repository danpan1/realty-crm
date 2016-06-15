/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Clients} from '/imports/api/clients';
import {name as PhoneMask} from '/imports/ui/shared/phone-mask/phone-mask.component';
import {dictionary} from '/imports/helpers/dictionary';

import './add-client-full.view.html';

class AddClientFull {
  /* @ngInject */
  constructor($scope, $reactive, $state) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.dictionary.composition = dictionary.composition.slice(1);
    this.resetClient();
    this.activeTab = 0;
    this.state = $state;
    this.fake = true;
    this.submitted = false;
    this.client.need = {
      comissionLoyal: true,
      comission: 100,
      metroTransport: 0,
      type : 4
    }
    this.client.searchEndDate = this.client.searchStartDate;
  }

  submit(valid) {
    this.submitted = true;
    var price = this.client.need.price.split('');
    for (var i in [1, 2, 3]) {
      for (var i in price) {
        if (price[i].match(/\s/)) {
          price.splice(i, 1);
        }
      }
    }
    this.client.need.price = price.join('');
    this.client.realtorPhone = Meteor.user().profile.phone;
    this.client.realtorName = Meteor.user().profile.name;
    this.client.realtorIdShort = Meteor.user().profile.realtorId;

    if (!this.client.comissionLoyal) {
      this.client.comission = '';
    }

    console.log('submit');
    if (!valid) {
      alert('не все данные корректны');
      return;
    }
    // console.log(this.client);
    // for (var key in this.filterQuery) {
    //   if (key === 'districts' || key === 'subways') {
    //     continue;
    //   }
    //   this.client[key] = this.filterQuery[key];
    // }
    console.log('inserted', this.client);
    // Clients.insert(this.client);
    Meteor.call('addClient', this.client, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.state.go('crm.clients.details.suit', {client: result, suitby: 'my'});
      }
    });
    this.resetClient();
  }

  showThis(t) {
    console.log(t);
  }

  resetClient() {
    const vm = this;
    this.client = {
      name: '',
      phone: '',
      status: vm.pageStatus,
      comissionLoyal: false,
      searchStartDate: new Date(),
      note: '',
      subways: [],
      districts: [],
      embedded: {
        subways: [],
        districts: []
      }
    };
    this.filterQuery = {roomcount: []};
    this.roomcount = [];
  }
}

const moduleName = 'addClientFull';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  PhoneMask
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-client-full/add-client-full.view.html',
  bindings: {pageStatus: '@'},
  controllerAs: moduleName,
  controller: AddClientFull
});

