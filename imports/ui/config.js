

const URL_AVATAR_ICONS = 'svg/avatars.svg';
const URL_ICON_MENU    = 'svg/menu.svg';
const URL_ICON_SHARE   = 'svg/share.svg';
export default function config($locationProvider, $urlRouterProvider,$mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
    .defaultIconSet( URL_AVATAR_ICONS, 128 )
    .icon('menu' ,URL_ICON_MENU, 24)
    .icon('share',URL_ICON_SHARE, 24);

  $mdIconProvider
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');
}
