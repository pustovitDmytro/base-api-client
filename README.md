# BaseAPI
**BaseAPI** Base API client backed by [axios](https://www.npmjs.com/package/axios).

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Vulnerabilities][badge-vuln]](https://snyk.io/)
[![Build Status][badge-tests]][travis]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![Fossa][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Requirements
To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `6.0+`
* npm `3.0+`

## Installation

To install the library run the following command

```bash
  npm i --save baseapi
```

## Usage

Example of [telegram](https://telegram.org/) client extended from BaseAPI:

```javascript
import BaseAPi from 'baseapi';

export default class TelegramAPI extends BaseAPi {
    constructor(id, token) {
        super(`https://api.telegram.org/${id}:${token}`);
    }

    message(chatId, html) {
        return this.post('sendMessage', {
            'parse_mode' : 'HTML',
            'text'       : html,
            'chat_id'    : chatId
        });
    }

    file(chatId, fileId) {
        return this.post('sendDocument', {
            'document' : fileId,
            'chat_id'  : chatId
        });
    }
}

```

Constructor arguments:
  1. **url** - base URL of the API. Can consist apiPrefix. Will be cast to nodeJS URL object.
  2. **options** - object with next attributes:
      * **timeout** - timeout in [ms](https://www.npmjs.com/package/ms) format. Will be cast to integer (in milliseconds). **Default**: 1m.
      * **logger** - if applied, will add *debug* and *verbose* messages before and after each request. Should have next interface: ```logger.log(level, object)```.

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions.

Commit message summaries must follow this basic format:
```
  Tag: Message (fixes #1234)
```

The Tag is one of the following:
* **Fix** - for a bug fix.
* **Update** - for a backwards-compatible enhancement.
* **Breaking** - for a backwards-incompatible enhancement.
* **Docs** - changes to documentation only.
* **Build** - changes to build process only.
* **New** - implemented a new feature.
* **Upgrade** - for a dependency upgrade.
* **Chore** - for tests, refactor, style, etc.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end.


[npm]: https://www.npmjs.com/package/baseapi
[github]: https://github.com/pustovitDmytro/baseapi
[travis]: https://travis-ci.org/pustovitDmytro/baseapi
[coveralls]: https://coveralls.io/github/pustovitDmytro/baseapi?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/baseapi.svg
[badge-tests]: https://travis-ci.com/pustovitDmytro/baseapi.svg?branch=master
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/baseapi.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/baseapi.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/baseapi.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/baseapi/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/baseapi?branch=master

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/baseapi/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/baseapi

[fossa-badge]: https://app.fossa.com/api/projects/git%2Bgithub.com%2FpustovitDmytro%2Fnpm-boilerplate.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/git%2Bgithub.com%2FpustovitDmytro%2Fnpm-boilerplate?ref=badge_shield

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/baseapi

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/baseapi/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/baseapi/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/baseapi.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/baseapi/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/baseapi.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/baseapi/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/d8f448ed725149cb8ee80b4b608621ef
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/baseapi/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/baseapi&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_npm-boilerplate&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_npm-boilerplate

[npm-downloads-badge]: https://img.shields.io/npm/dw/baseapi
[npm-size-badge]: https://img.shields.io/bundlephobia/min/baseapi
[npm-size-url]: https://bundlephobia.com/result?p=baseapi
