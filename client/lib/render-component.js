import { addEvent } from './add-event';

function renderComponent (destination, state, component) {
  let html = component.render(state);

  if (!html) {
    return [];
  }

  let fragment = document.createRange().createContextualFragment(html);
  destination.appendChild(fragment);

  let lastChildNode = destination.children[destination.children.length - 1];
  let boundListeners = [];

  if (component.children) {
    let destination = lastChildNode.querySelector('.children-target') || lastChildNode;

    boundListeners = component.children.reduce((tmp, child) => {
      return tmp.concat(
        renderComponent(destination, state, child, component)
      );
    }, boundListeners);
  }

  if (component.postRender) {
    component.postRender(lastChildNode, state);
  }

  if (!component.listeners) {
    return [];
  }

  let listeners = component.listeners();

  return Object.keys(listeners).reduce((tmp, selector) => {
    let el = selector === 'self' ?
      lastChildNode : lastChildNode.querySelector(selector);

    if (!el) {
      return;
    }

    let events = listeners[selector];

    return tmp.concat(events.map((evt) => {
      return addEvent(el, evt.event, evt.handler);
    }));
  }, boundListeners);
}

export { renderComponent };
