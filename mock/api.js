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
    if (req.body.userName === 'admin' && req.body.password === 'admin') res.send(success('登录成功', mockjs.mock({
      'name': '@name()',
      'address': '@province' + '@city' + '@county',
      'email': '@email',
      'phone': /^1[385][1-9]\d{8}/
    })));
    else res.send(fail('账号或密码错误！'));
  },
  // 图表数据
  'GET /mockApi/tags': success('获取成功~', mockjs.mock({
    'list|100': [{
      'id|+1': 1,
      'year': '@date',
      'ACME': '@integer(1, 999)',
      'Compitor': '@integer(1, 999)',
    }],
  }), ),
  // 用户列表
  'GET /mockApi/users': success('获取成功~', mockjs.mock({
    'list|100': [{
      'id|+1': 1,
      'name': '@name()',
      'age': '@integer(1, 99)',
      'email': '@email',
      'phone': /^1[385][1-9]\d{8}/,
      'address': '@province' + '@city' + '@county',
      'description': 'My name is ' + '@name()' + ' , I am ' + '@integer(1, 99)' + ' years old, living in ' +
        '@province' + '@city' + '@county'
    }],
  }), )
};
