# retro
retro is summary generator for your GitHub activities.  
This was inspired by [pepabo/furik](https://github.com/pepabo/furik).

# Installation
**work in progress...**

# Usage
**work in progress...**

You can show GitHub activity while one day.

```sh
$ retro
now searching...
* [PullRequest](https://github.com/yinm/retro/pull/5): Convert commandline tool
* [Issue](https://github.com/yinm/retro/issues/1): MVPを作るためにやること
```

You can also show date specified activity by adding `-f YYYY-MM-DD` and `-t YYYY-MM-DD` options to `retro` command.

```sh
$ retro -f 2017-08-15 -t 2017-08-16
* [PullRequest](https://github.com/yinm/retro/pull/5): Convert commandline tool
* [Issue](https://github.com/yinm/retro/issues/1): MVPを作るためにやること
* [PullRequest](https://github.com/yinm/retro/pull/3): add designation of date (from xxx to ooo)
* [PullRequest](https://github.com/yinm/obenkyo-node-js/pull/1): Node cli argv
```

Dotenv file configured GitHub's host and user settings by `.env`.  
You can confirm or modify this dotenv file.
```.dotenv
# /path/to/project/
$ mv .env-sample .env
$ cat .env
---
GITHUB_HOST="api.github.com"
GITHUB_USER="${user_name}"
```

NOTE: `GITHUB_USER` should be replaced with GitHub's user name.

# LICENSE

The MIT License (MIT)

Copyright (c) 2017- yinm
