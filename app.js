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
    const wantedEventsData = getWantedEventsData(data);
    console.log(wantedEventsData);
  });
});

function getWantedEventsData(data) {
  let wantedEventsData = '';

  for (let i = 0, length = data.length; i < length; i++) {
    switch (data[i].type) {
      case 'IssuesEvent':
      case 'IssueCommentEvent':
        wantedEventsData += data[i].payload.issue.title + '\n';
        break;

      case 'PullRequestEvent':
      case 'PullRequestReviewCommentEvent':
        wantedEventsData += data[i].payload.pull_request.title + '\n';
        break;

      default:
        wantedEventsData += `${i}には、なかったよ\n`; // for debug
        break;
    }
  }

  return wantedEventsData;
}