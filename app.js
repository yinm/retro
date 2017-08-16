require('dotenv').config();

const https = require('https');

const option = {
  host: process.env.GITHUB_HOST,
  port: 443,
  path: `/users/${process.env.GITHUB_USER}/events`,
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
  let title;
  let url;

  for (let i = 0, length = data.length; i < length; i++) {
    switch (data[i].type) {
      case 'IssuesEvent':
      case 'IssueCommentEvent':
        title = data[i].payload.issue.title;
        url = data[i].payload.issue.html_url;
        wantedEventsData += `* [${title}](${url})\n`;
        break;

      case 'PullRequestEvent':
      case 'PullRequestReviewCommentEvent':
        title = data[i].payload.pull_request.title;
        url = data[i].payload.pull_request.html_url;
        wantedEventsData += `* [${title}](${url})\n`;
        break;

      default:
        wantedEventsData += `* ${i}には、なかったよ\n`; // for debug
        break;
    }
  }

  return wantedEventsData;
}