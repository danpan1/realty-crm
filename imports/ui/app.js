/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import config from './config';
import runBlock from './runBlock';
import {name as Layout}from '/imports/ui/layout/layout.component';

// import {name as myList} from '../myList/myList.component';
// import {name as messages} from '../messages/messages.component';
// import {name as SubwayChips}from '/imports/ui/core/subwayChips/subwayChips.component.js';

const moduleName = 'app';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  'accounts.ui',
  Layout
]).config(config)
  .run(runBlock);

