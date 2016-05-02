/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './auth.routes';
import {name as login}from './login/login.component';
import {name as register}from './register/register.component';

const moduleName = 'app.auth';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  register,
  login
]).config(routes);
