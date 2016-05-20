import {Meteor} from 'meteor/meteor';

const allowFrameOrigin = function () {

  // BrowserPolicy.content.allowFrameOrigin('www.google.com');

  // BrowserPolicy.content.allowScriptOrigin('cdnjs.cloudflare.com');

  BrowserPolicy.content.allowFontOrigin('data:');

  BrowserPolicy.content.allowImageOrigin("*.img.avito.st");
  BrowserPolicy.content.allowImageOrigin('s3.amazonaws.com');

  BrowserPolicy.content.allowStyleOrigin('cdnjs.cloudflare.com');

};

Meteor.startup(allowFrameOrigin);