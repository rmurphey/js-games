let boundListeners = [];

function addEvent (element, event, handler) {
  element.addEventListener(event, handler, false);
  return () => {
    element.removeEventListener(event, handler, false);
  };
}

function render (destination, components, state) {
  // unbind event listeners
  boundListeners.forEach((unlisten) => unlisten());

  // empty out the destination div
  while (destination.firstChild) {
    destination.removeChild(destination.firstChild);
  }

  // generate the component markup and bind the event listeners
  components.forEach((c) => {
    let html = c.render(state);

    if (!html) {
      return;
    }

    let fragment = document.createRange().createContextualFragment(html);
    destination.appendChild(fragment);

    if (!c.listeners) {
      return;
    }

    let listeners = c.listeners();

    Object.keys(listeners).forEach((selector) => {
      let el = selector === 'self' ?
        destination.lastChild :
        destination.lastChild.querySelector(selector);

      if (!el) {
        return;
      }

      let events = listeners[selector];

      events.forEach((evt) => {
        addEvent(el, evt.event, evt.handler);
      });
    });
  });
}

export default render;
