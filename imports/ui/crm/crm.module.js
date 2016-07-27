/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './crm.routes';
//import {name as ngMenuToggle} from '../shared/menu-toggle/menu-toggle';
//import {name as ngMenuLink} from '../shared/menu-link/menu-link';
import {name as ngPhoneFilter} from '../../filters/phone-filter.directive.js';
import {name as ngPriceFilter} from '../../filters/price-filter.directive.js';
import {name as priceFilter} from '../../filters/price.filter.js';
import {name as phoneFilter} from '../../filters/phone.filter.js';
import {name as countFilter} from '../../filters/count.filter.js';
import {name as selectedSubway} from '../../filters/selected-subway.filter.js';
import {name as Realty}from './realty/realty.component';
import {name as Feedback}from './feedback/feedback.component';
import {name as Training}from './training/training.component';
import {name as clients}from './clients/clients.component';
import {name as layout} from '/imports/ui/layout/layout.component';
import {name as Profile} from '/imports/ui/crm/profile/profile.component';
import {name as documents} from '/imports/ui/crm/documents/documents.component';
import {name as newRealtyList} from '/imports/ui/crm/realty-new-list/realty-new-list.component';
import {name as addRole} from '/imports/ui/shared/add-role/add-role.component';
import {name as addRoleOperator} from '/imports/ui/shared/add-role/add-role-operator.component';
import {name as videoTutorial} from '/imports/ui/crm/video-tutorial/video-tutorial.component';
// import {name as ClientFilters} from '/imports/ui/crm/client-filters/client-filters.component';
// import {name as ClientBullets} from '/imports/ui/crm/client-bullets/client-bullets.component';

const moduleName = 'app.crm';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  layout,
  //ngMenuLink,
  //ngMenuToggle,
  videoTutorial,
  documents,
  addRole,
  addRoleOperator,
  ngPhoneFilter,
  ngPriceFilter,
  priceFilter,
  newRealtyList,
  phoneFilter,
  countFilter,
  selectedSubway,
  clients,
  Realty,
  Feedback,
  Training,
  Profile,
  // ClientFilters,
  // ClientBullets
]).config(routes);
