let boundListeners = [];

import { renderComponent } from './render-component';

function render (destination, components, state) {
  // unbind event listeners
  boundListeners.forEach((unlisten) => unlisten());

  // empty out the destination div
  while (destination.firstChild) {
    destination.removeChild(destination.firstChild);
  }

  // generate the component markup and bind the event listeners
  boundListeners = components
    .map(renderComponent.bind(null, destination, state))
    .reduce((_boundListeners, componentListeners) => {
      return _boundListeners.concat(componentListeners);
    }, []);
}

export default render;
