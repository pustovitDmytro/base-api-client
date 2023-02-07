![Logo](.docs/logo_250.png "Base API client")
# base-api-client
Base API client backed by [axios](https://www.npmjs.com/package/axios).

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]
[![Made in Ukraine][ukr-badge]][ukr-link]

## 🇺🇦 Help Ukraine
I woke up on my 26th birthday at 5 am from the blows of russian missiles. They attacked the city of Kyiv, where I live, as well as the cities in which my family and friends live. Now my country is a war zone. 

We fight for democratic values, freedom, for our future! Once again Ukrainians have to stand against evil, terror, against genocide. The outcome of this war will determine what path human history is taking from now on.

💛💙  Help Ukraine! We need your support! There are [dozen ways][ukr-link] to help us, just do it!

## Table of Contents
- [base-api-client](#base-api-client)
  - [🇺🇦 Help Ukraine](#-help-ukraine)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Constructor arguments](#constructor-arguments)
    - [Methods](#methods)
  - [Implementations](#implementations)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library run the following command

```bash
  npm i --save base-api-client
```

## Usage

Example of [telegram](https://telegram.org/) client extended from BaseAPI:

```javascript
import BaseAPI from 'base-api-client';

export default class TelegramAPI extends BaseAPI {
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

### Constructor arguments

  1. **url** - base URL of the API. Can consist apiPrefix. Will be cast to nodeJS URL object.
  2. **options** - object with next attributes:
      * **timeout** - timeout in [ms](https://www.npmjs.com/package/ms) format. Will be cast to integer (in milliseconds). **Default**: 1m.
      * **logger** - if applied, will add *debug* and *verbose* messages before and after each request. Should have next interface: ```logger.log(level, object)```.

### Methods

**HTTP methods**:

* `get(url, params, options)`
* `post(url, data, options)`
* `patch(url, data, options)`
* `put(url, data, options)`
* `delete(url, options)`

in all aforementioned methods `url` can be both global, or relative to base URL (defined in [constructor](#constructor-arguments)). `params` are url query params, and `data` is JSON body. `options` are passed directly to [axios request](https://github.com/axios/axios#request-config)

**Headers**

Implement `getHeaders()` method to define select headers for API. Alternativelly, pass headers in `options` for each request if headers need behave differently.

**Basic auth**
use `auth` setting, if you want to use basic auth for each request.

```javascript
this.auth = {
    username : '',
    password : ''
};
```

**Data processing**

Next methods can be used for default data pre/post-processing:

```javascript
        onError(error) {
            if (error.isAxiosError) {
                throw new API_ERROR(error);
            }
            throw error;
        },

        onResponse(res) {
            return res.data;
        }
```

**Errors**

the package exposes `API_ERROR`, that can be used outside:

```javascript
import BaseAPI, { API_ERROR } from 'base-api-client';

class API extends BaseAPI {
    constructor() {
        super('http://wiwbif.is/fugo');
    }

    async createUser(email) {
        try {
            const user = await this.post('/users', { email });


            return user.id;
        } catch (error) {
            if (error instanceof API_ERROR) {
                console.log('raw http error:', error.payload);
                throw error;
            }
        }
    }
}
```

**Logging and Tracing**

You can pass **logger** while [api creation](#constructor-arguments), but also this can be done by calling `initLogger(logger)` method directly.

Alternatively, use polymorphism and implement the `log(level, data)` method on descendants. 

Autogenerated **Trace ID** is atached to each log. If you need control over traceId generation, implement `getTraceId(reqOptions, settings)` method.

**Testing**

Depending on selected approach use  `setMock(mockFuction)` or implement `_axios(axiosOptions)` method. Both `mockFuction` and `_axios` will receive axios options instead of axios instance, and should return expected result. Default mock function is `() => ({ data: 1 })`. 

To check examples of api mocks and tesing, see [implementation](#implementations) section.


## Implementations

Looking for more examples? Check real implementations of famous APIs:

| API | Organization | Reference |  Examples |
|----|---|----------|-----|
| [Telegram Bot](https://web.telegram.org) | Telegram | [Bot API ](https://core.telegram.org/bots/api) | <ul><li> [sns-telegram-bot](https://github.com/pustovitDmytro/sns-telegram-bot/blob/master/src/api/TelegramApiClient.js) </li><li> [semantic-release-telegram](https://github.com/pustovitDmytro/semantic-release-telegram/blob/master/src/telegram/TelegramAPI.js) </li></ul>
| [Telegra.ph](https://telegra.ph/) | Telegram | [Telegraph API](https://telegra.ph/api) | <ul><li>[semantic-release-telegram](https://github.com/pustovitDmytro/semantic-release-telegram)</li></ul>
| [AWS SNS](https://aws.amazon.com/sns) | Amazon | [AWS docs](https://docs.aws.amazon.com/sns/latest/api/welcome.htmli) | <ul><li>[sns-telegram-bot](https://github.com/pustovitDmytro/sns-telegram-bot/blob/master/src/api/AWSApiClient.js)</li></ul>
| [Gitea](https://gitea.io) |  | [Gitea Swagger](https://try.gitea.io/api/swagger#/) | <ul><li>[lalaps](https://github.com/pustovitDmytro/lalaps/blob/master/src/api/GiteaAPI.js)</li></ul>
| [GitHub Apps](https://github.com/) | Microsoft | [Apps Reference](https://docs.github.com/en/rest/reference/apps) | <ul><li>[lalaps](https://github.com/pustovitDmytro/lalaps/blob/master/src/api/GithubAppAPI.js)</li></ul>
| [GitHub Repos](https://github.com/) | Microsoft | [Repositories Reference](https://docs.github.com/en/rest/reference/repos) | <ul><li>[lalaps](https://github.com/pustovitDmytro/lalaps/blob/master/src/api/GithubReposAPI.js)</li></ul>
| [Heroku](https://www.heroku.com/home) | Salesforce | [Platform API Reference](https://devcenter.heroku.com/articles/platform-api-reference) | <ul><li>[semantic-release-heroku](https://github.com/pustovitDmytro/semantic-release-heroku/blob/master/src/heroku/HerokuApi.js)</li></ul>
| [JIRA](https://www.atlassian.com/software/jira) | Atlassian | [REST API](https://developer.atlassian.com/server/jira/platform/rest-apis/) | <ul><li>[atlassian](https://github.com/pustovitDmytro/atlassian/blob/master/src/api/JiraApi.js)</li></ul>
| [Confluence](https://www.atlassian.com/software/confluence)  | Atlassian | [REST API](https://developer.atlassian.com/server/confluence/confluence-server-rest-api/) | <ul><li>[atlassian](https://github.com/pustovitDmytro/atlassian/blob/master/src/api/ConfluenceApi.js)</li></ul>

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/base-api-client
[github]: https://github.com/pustovitDmytro/base-api-client
[coveralls]: https://coveralls.io/github/pustovitDmytro/base-api-client?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/base-api-client.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/base-api-client.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/base-api-client.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/base-api-client.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/base-api-client/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/base-api-client?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/base-api-client/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/base-api-client

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/base-api-client
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/base-api-client

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/base-api-client/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/base-api-client

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/base-api-client

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/base-api-client/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/base-api-client/?branch=master

[codacy-badge]: https://app.codacy.com/project/badge/Grade/d8f448ed725149cb8ee80b4b608621ef
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/base-api-client/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/base-api-client&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_base-api-client&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_base-api-client

[npm-downloads-badge]: https://img.shields.io/npm/dw/base-api-client
[npm-size-badge]: https://img.shields.io/bundlephobia/min/base-api-client
[npm-size-url]: https://bundlephobia.com/result?p=base-api-client

[node-ver-test-badge]: https://github.com/pustovitDmytro/base-api-client/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/base-api-client/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fbase-api-client.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fbase-api-client?ref=badge_shield

[ukr-badge]: https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7
[ukr-link]: https://war.ukraine.ua
