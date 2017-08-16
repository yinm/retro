require('dotenv').config();

const https = require('https');
const moment = require('moment');
const minimist = require('minimist');

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

  let from;
  let to;
  const minimistOptions = {
    alias: {
      f: 'from',
      t: 'to'
    }
  };
  const argv = minimist(process.argv.slice(2), minimistOptions);

  if ('from' in argv && moment(argv.from).isValid()) {
    from = moment(argv.from).startOf('day');
  }
  if ('to' in argv && moment(argv.to).isValid()) {
    to = moment(argv.to).endOf('day');
  }

  if (from === undefined || to === undefined) {

    if (from === undefined && to === undefined) {
      from = moment().startOf('day');
      to = moment().endOf('day');

    } else {
      console.log('invalid arguments.');
      process.exit(1);
    }
  }

  for (let i = 0, length = data.length; i < length; i++) {
    if (
         moment(data[i].created_at).isAfter(from)
      && moment(data[i].created_at).isBefore(to)
    ) {

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
          wantedEventsData += `* ${i}には、なかったよ。created_at: ${moment(data[i].created_at)}\n`; // for debug
          break;
      }
    }
  }

  return wantedEventsData;
}