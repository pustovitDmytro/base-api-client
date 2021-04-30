import { assert } from 'chai';
import { _load } from '../entry';

const { resolveUrl } = _load('utils');

suite('resolveUrl');

test('use relativeUrl as absolute', async function () {
    assert.equal(
        resolveUrl('http://uvvewwik.pl/cob', 'http://tarku.gp/oje'),
        'http://tarku.gp/oje'
    );
});

test('respect apiprefix', async function () {
    assert.equal(
        resolveUrl('http://uvvewwik.pl/cob', 'oje'),
        'http://uvvewwik.pl/cob/oje'
    );
});


test('handle first / in relativeUrl', async function () {
    assert.equal(
        resolveUrl('http://uvvewwik.pl/cob', '/oje'),
        'http://uvvewwik.pl/cob/oje'
    );
});


test('handle last / in baseUrl', async function () {
    assert.equal(
        resolveUrl('http://uvvewwik.pl/', '/oje'),
        'http://uvvewwik.pl/oje'
    );
});


test('empty baseUrl', async function () {
    assert.equal(
        resolveUrl(null, 'http://nunpe.mn/tiv'),
        'http://nunpe.mn/tiv'
    );
});

test('handle last / in apiprefix', async function () {
    assert.equal(
        resolveUrl('http://saero.mt/gum/', '/oje'),
        'http://saero.mt/gum/oje'
    );
});
