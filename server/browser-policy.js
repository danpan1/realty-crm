import {Meteor} from 'meteor/meteor';

const allowFrameOrigin = function () {

  // BrowserPolicy.content.allowFrameOrigin('www.google.com');

  // BrowserPolicy.content.allowScriptOrigin('cdnjs.cloudflare.com');
  BrowserPolicy.content.allowScriptOrigin('mc.yandex.ru');

  BrowserPolicy.content.allowFontOrigin('data:');

  BrowserPolicy.content.allowImageOrigin("*.img.avito.st");
  BrowserPolicy.content.allowImageOrigin("cdn4.cian.ru");
  BrowserPolicy.content.allowImageOrigin('s3.amazonaws.com');
  BrowserPolicy.content.allowImageOrigin('world-invest.pro');

  BrowserPolicy.content.allowStyleOrigin('cdnjs.cloudflare.com');

};

Meteor.startup(allowFrameOrigin);