import Store from '../lib/store';

let handlers = {
  REPL_VALUE(state, action) {
    return Object.assign({}, state, {
      saved : false,
      replValue : action.replValue,
      points : action.points,
      currentAngle : action.currentAngle
    });
  },
  SAVE(state) {
    return Object.assign({}, state, {
      saved : true
    });
  },
  LOAD(state, action) {
    let {
      replValue,
      points,
      currentAngle
    } = action.data;

    return Object.assign({}, state, {
      saved : true,
      replValue,
      points,
      currentAngle
    });
  }
};

function initialData () {
  return {
    replValue : '',
    saved : false,
    points : [],
    currentAngle : 0
  };
}

let store = Store(initialData, handlers);

export { store };
