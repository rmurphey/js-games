let Model = (initialData = {}, helpers = {}) => {
  let listeners = {};
  let modelData = {};

  let { preprocessors = {}, handlers = {}, validators = {} } = helpers;

  let m = {
    set (key, value) {
      if (preprocessors[key]) {
        value = preprocessors[key].call(m, value);
      }

      if (validators[key]) {
        let error = validators[key].call(m, value);
        if (error) {
          return Model.set('error', error);
        }
      }

      modelData[key] = value;
      this.emit('change', modelData);
      this.emit(`change:${key}`, value);

      if (handlers[key]) {
        handlers[key].call(m, value);
      }
    },

    get (key) {
      return modelData[key];
    },

    listen (event, handler) {
      listeners[event] = listeners[event] || [];
      listeners[event].push(handler);
    },

    emit (event, data) {
      if (!listeners[event]) {
        return;
      }

      listeners[event].forEach((handler) => {
        try {
          handler(data);
        } catch (e) {
          return;
        }
      });
    }
  };

  Object.keys(initialData).forEach((k) => {
    m.set(k, initialData[k]);
  });

  return m;
};

export default Model;
