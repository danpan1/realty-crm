/**
 * Created by Danpan on 18.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './navigation.view.html';

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.view.html`,
  controllerAs: name
});