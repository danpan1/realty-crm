import {Meteor} from 'meteor/meteor';

const allowFrameOrigin = function () {

  // BrowserPolicy.content.allowFrameOrigin('www.google.com');

  // BrowserPolicy.content.allowScriptOrigin('cdnjs.cloudflare.com');
  BrowserPolicy.content.allowScriptOrigin('mc.yandex.ru');
  BrowserPolicy.content.allowScriptOrigin('cdn.sendpulse.com');

  BrowserPolicy.content.allowFontOrigin('data:');
  BrowserPolicy.content.allowFontOrigin('themes.googleusercontent.com');

  BrowserPolicy.content.allowImageOrigin("*.img.avito.st");
  BrowserPolicy.content.allowImageOrigin("cdn4.cian.ru");
  BrowserPolicy.content.allowImageOrigin("www.cian.ru");
  BrowserPolicy.content.allowImageOrigin("imgtemp.cian.ru");
  BrowserPolicy.content.allowImageOrigin('s3.amazonaws.com');
  BrowserPolicy.content.allowImageOrigin('world-invest.pro');

  BrowserPolicy.content.allowStyleOrigin('cdnjs.cloudflare.com');
  BrowserPolicy.content.allowFrameOrigin('www.youtube.com');
  BrowserPolicy.content.allowFrameOrigin('world-invest.pro');
  BrowserPolicy.content.allowStyleOrigin('world-invest.pro');

};

Meteor.startup(allowFrameOrigin);