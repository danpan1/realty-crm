/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './crm.routes';
import {name as ngLightbox} from '../shared/lightbox/lightbox';
import {name as menuToggle} from '../shared/menu-toggle/menu-toggle';
import {name as menuLink} from '../shared/menu-link/menu-link';
import {name as Realty}from './realty/realty.component';
import {name as clients}from './clients/clients.component';
import {name as layout} from '/imports/ui/layout/layout.component';

const moduleName = 'app.crm';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  layout,
  ngLightbox,
  menuLink,
  menuToggle,
  clients,
  Realty
]).config(routes);
