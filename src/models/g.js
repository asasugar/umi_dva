/* 全局model */
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default {
  namespace: 'app',
  state: 0,
  reducers: {
    add(state) {
      return state + 1
    },
  },
  effects: {
    * addAfter1Second(action, {
      call,
      put
    }) {
      yield call(delay, 1000);
      yield put({
        type: 'add'
      });
    },
  },
  subscriptions: {

  },
}
