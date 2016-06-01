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
import {name as selectedSubway} from '../../filters/selected-subway.filter.js';
import {name as Realty}from './realty/realty.component';
import {name as Feedback}from './feedback/feedback.component';
import {name as clients}from './clients/clients.component';
import {name as layout} from '/imports/ui/layout/layout.component';
import {name as documents} from '/imports/ui/crm/documents/documents.component';
import {name as newRealtyList} from '/imports/ui/crm/realty-new-list/realty-new-list.component';

const moduleName = 'app.crm';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  layout,
  //ngMenuLink,
  //ngMenuToggle,
  documents,
  ngPhoneFilter,
  ngPriceFilter,
  priceFilter,
  newRealtyList,
  phoneFilter,
  selectedSubway,
  clients,
  Realty,
  Feedback
]).config(routes);
