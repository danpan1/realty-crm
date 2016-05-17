/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './crm.routes';
//import {name as ngMenuToggle} from '../shared/menu-toggle/menu-toggle';
//import {name as ngMenuLink} from '../shared/menu-link/menu-link';
import {name as ngPhoneFilter} from '../../api/filters/phone-filter.directive.js';
import {name as priceFilter} from '../../api/filters/price.filter.js';
import {name as phoneFilter} from '../../api/filters/phone.filter.js';
import {name as Realty}from './realty/realty.component';
import {name as clients}from './clients/clients.component';
import {name as layout} from '/imports/ui/layout/layout.component';

const moduleName = 'app.crm';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  layout,
  //ngMenuLink,
  //ngMenuToggle,
  ngPhoneFilter,
  priceFilter,
  phoneFilter,
  clients,
  Realty
]).config(routes);
