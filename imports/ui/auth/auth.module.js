/**
 * Created by Danpan on 22.04.16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './auth.routes';
import {name as login}from './login/login.component';
import {name as register}from './register/register.component';
import {name as registerPhoto}from './register-photo/register-photo.component';
import {name as changePhoto}from './change-photo/change-photo.component';
import {name as resetpw}from './resetpw/resetpw.component';

const moduleName = 'app.auth';
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  resetpw,
  register,
  registerPhoto,
  changePhoto,
  login
]).config(routes);
