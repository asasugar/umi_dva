import mockjs from 'mockjs';

const success = (msg, data) => {
  return {
    success: true,
    msg,
    data,
  }
}

const fail = (msg, data) => {
  return {
    success: false,
    msg,
    data,
  }
}

export default {
  // 使用 mockjs 等三方库
  'POST /mockApi/login': (req, res) => {
    if (req.body.userName === 'admin' && req.body.password === 'admin') res.send(success('登录成功'));
    else res.send(fail('账号或密码错误！'));
  },
  'GET /mockApi/tags': mockjs.mock({
    'list|100': [{
      name: '@city',
      'value|1-100': 50,
      'type|0-2': 1
    }],
  }),
};
