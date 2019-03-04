/* 全局model */
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default {
  namespace: 'app',
  state: {
    userInfo: {}
  },
  reducers: {
    USER_INFO(state, {
      payload: val
    }) {
      const userInfo = val
      return {
        ...state,
        userInfo
      }

    },
  },
  effects: {
    * saveUserInfo({
      payload: val
    }, {
      put
    }) {
      yield put({
        type: 'USER_INFO',
        payload: val
      });
    },
  },
  subscriptions: {

  },
}
