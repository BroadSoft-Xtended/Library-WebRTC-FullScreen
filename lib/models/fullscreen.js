module.exports = require('bdsft-sdk-model')(Fullscreen, {
  config: require('../../js/config')
})

var Utils = require('webrtc-core').utils;

function Fullscreen(eventbus, urlconfig, sipstack) {
  var self = {};

  self.updateWebkitFullscreen = function(){
    if(!self.visible) {
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    } else {
      if (document.webkitRequestFullScreen) {
        document.webkitRequestFullScreen();
      }      
    }
  };

  self.props = ['visible', 'classes'];

  self.bindings = {
    classes: {
      fullscreen: ['visible', 'enableFullscreen'],
      sipstack: ['receiveVideo', 'sendVideo']
    },
    enableFullscreen: {
      urlconfig: 'enableFullscreen'
    },
    webkitFullscreen: {
      fullscreen: 'visible'
    }
  }

  self.start = function() {
    self.visible = true;
  };
  self.stop = function(){
    self.visible = false;
  };

  self.listeners = function() {
    Utils.getElement(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      var enable = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
      if(enable) {
        self.start();
      } else {
        self.stop();
      }
    });
    eventbus.on('endCall', function(){
      self.stop();
    });
  };

  return self;
}