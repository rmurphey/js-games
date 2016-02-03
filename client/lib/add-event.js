function addEvent (element, event, handler) {
  element.addEventListener(event, handler, false);
  return () => {
    element.removeEventListener(event, handler, false);
  };
}

export { addEvent };
