module.exports = require('bdsft-sdk-view')(FullscreenView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

function FullscreenView(fullscreen, sound) {
  var self = {};

  self.elements = ['fullscreenExpand', 'fullscreenContract'];

  var clickHander = function(callback){
    return function(e) {
      e.preventDefault();
      sound.playClick();
      callback();
    }
  }

  self.listeners = function() {
    self.fullscreenExpand.bind('click', clickHander(function() {
      fullscreen.start();
    }));
    self.fullscreenContract.bind('click', clickHander(function() {
      fullscreen.stop();
    }));
  };

  return self;
}