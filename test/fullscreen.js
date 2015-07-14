test = require('../node_modules/webrtc-core/test/includes/common');
describe('fullscreen', function() {

  beforeEach(function() {
    test.createModelAndView('fullscreen', {
        fullscreen: require('../'),
        sound: require('webrtc-sound')
    });
    urlconfig = bdsft_client_instances.test.urlconfig;
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
    test.isVisible(fullscreenview.fullscreenExpand, true);
    test.isVisible(fullscreenview.fullscreenContract, false);

    fullscreenview.fullscreenExpand.trigger('click');
    expect(fullscreen.classes).toEqual(["fullscreen-shown","enableFullscreen"]);
    test.isVisible(fullscreenview.fullscreenExpand, false);
    test.isVisible(fullscreenview.fullscreenContract, true);

    fullscreenview.fullscreenContract.trigger('click');
    expect(fullscreen.classes).toEqual(['fullscreen-hidden', 'enableFullscreen']);
    test.isVisible(fullscreenview.fullscreenExpand, true);
    test.isVisible(fullscreenview.fullscreenContract, false);
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