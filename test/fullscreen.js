var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('fullscreen', function() {

  beforeEach(function() {
    core = require('webrtc-core');
    testUA = core.testUA;
    testUA.createModelAndView('fullscreen', {
        fullscreen: require('../'),
        sound: require('webrtc-sound')
    });
    urlconfig = bdsft_client_instances.test.urlconfig;
    testUA.mockWebRTC();
  });

  it('start', function() {
    fullscreen.start();
    expect(fullscreen.visible).toEqual(true);
  });

  it('enableFullscreen', function() {
    urlconfig.enableFullscreen = false;
    expect(fullscreen.enableFullscreen).toEqual(false);
  });

  it('view', function() {
    fullscreen.enableFullscreen = true;
    fullscreen.visible = false;
    expect(fullscreen.classes).toEqual(['fullscreen-hidden', 'enableFullscreen']);
    testUA.isVisible(fullscreenview.fullscreenExpand, true);
    testUA.isVisible(fullscreenview.fullscreenContract, false);

    fullscreenview.fullscreenExpand.trigger('click');
    expect(fullscreen.classes).toEqual(["fullscreen-shown","enableFullscreen"]);
    testUA.isVisible(fullscreenview.fullscreenExpand, false);
    testUA.isVisible(fullscreenview.fullscreenContract, true);

    fullscreenview.fullscreenContract.trigger('click');
    expect(fullscreen.classes).toEqual(['fullscreen-hidden', 'enableFullscreen']);
    testUA.isVisible(fullscreenview.fullscreenExpand, true);
    testUA.isVisible(fullscreenview.fullscreenContract, false);
  });

  it('view for audioOnly', function() {
    fullscreen.enableFullscreen = true;
    fullscreen.visible = false;
    urlconfig.view = 'audioOnly';
    expect(fullscreen.classes).toEqual(['fullscreen-hidden', 'enableFullscreen', 'audioOnly']);
    expect(fullscreenview.fullscreenExpand.css('display')).toEqual('none');
    expect(fullscreenview.fullscreenContract.css('display')).toEqual('none');
  });
});