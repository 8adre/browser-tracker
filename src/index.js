import Tracker from './tracker';
import { isFunction, isUndefined } from './lib/utils';
import Woopra from './woopra';
import attachEvents from './lib/attach-events';

window.WoopraTracker = Tracker;
window.WoopraLoadScript = Woopra.loadScript;

attachEvents();

if (!isUndefined(window.exports)) {
  Woopra.Tracker = Tracker;
  window.exports.Woopra = Woopra;

  if (isFunction(window.woopraLoaded)) {
    window.woopraLoaded();
    window.woopraLoaded = null;
  }
}

// Initialize instances & preloaded settings/events
var _queue = window.__woo || window._w;
if (!isUndefined(_queue)) {
  for (var name in _queue) {
    if (_queue.hasOwnProperty(name)) {
      var instance = new Tracker(name);
      instance.init();

      // DO NOT REMOVE
      // compatibility with old tracker and chat
      if (isUndefined(window.woopraTracker)) {
        window.woopraTracker = instance;
      }
    }
  }
}
