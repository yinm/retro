const https = require('https');

const option = {
  host: 'api.github.com',
  port: 443,
  path: '/users/yinm/events',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'user-agent': 'node.js'
  }
};

https.get(option, (res) => {
  let body = '';

  res.on('data', (data) => {
    body += data;
  });

  res.on('end', () => {
    const data = JSON.parse(body);
    const ids = getIds(data);
    console.log(ids);
  });
});

function getIds(data) {
  let ids = '';

  for (let i = 0, length = data.length; i < length; i++) {
    ids += data[i].id + '\n';
  }

  return ids;
}