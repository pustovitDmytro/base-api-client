/* eslint-disable no-empty */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-mutable-exports */

let _URL = null;

if (typeof URL !== 'undefined') _URL = URL;

if (!_URL && typeof require !== 'undefined') {
    try {
        _URL = require('url').URL;
    } catch {}
}

export default _URL;
