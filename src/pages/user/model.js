import myFetch from '@/utils/request';

async function getUserInfoService() {
  return myFetch({
    url: '/mockApi/users'
  })
}
export default {
  namespace: 'user',
  state: {
    users: []
  },
  reducers: {
    USER_INFO(state, {
      payload: val
    }) {
      const users = val
      return {
        ...state,
        users
      }

    },
  },
  effects: {
    // 写法一
    * getUsersInfo(action, {
      call,
      put
    }) {
      const {
        success,
        data: {
          list
        }
      } = yield call(getUserInfoService)
      yield put({
        type: 'USER_INFO',
        payload: list
      });
    },
    // 写法二
    * getUsersInfo(action, {
      put
    }) {
      const {
        success,
        data: {
          list
        }
      } = yield myFetch({
        url: '/mockApi/users'
      })
      if (success) {
        yield put({
          type: 'USER_INFO',
          payload: list
        });
      }
    },
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(({
        pathname
      }) => {
        if (pathname === '/user') {
          dispatch({
            type: 'getUsersInfo',
          });
        }
      });
    },
  },
}
