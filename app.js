const https = require('https');

const option = {
  host: 'api.github.com',
  port: 443,
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
    console.log(data);
  });
});
