/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './crm.routes';
import {name as Realty}from '/imports/ui/crm/realty/realty.component.js';

const moduleName = 'app.crm';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  Realty
]).config(routes);
