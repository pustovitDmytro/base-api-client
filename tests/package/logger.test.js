import { assert } from 'chai';
import Test from '../Test';

const factory = new Test();
const api = factory.createAPI('http://test.logger');
const tracks = [];

suite('Logger');

before(function () {
    factory.mockAPI();
    api.initLogger({
        log : (level, data) => tracks.push({ level, data })
    });
});

test('Positive: requestSent/responseReceived flow', async function () {
    const body =  { data: { a: 1 } };

    await api.post('/request_1', body);
    const requestSent = tracks.find(r => r.data.url === '/request_1');

    assert.exists(requestSent);
    assert.equal(requestSent.level, 'debug');
    assert.equal(requestSent.data.data, body);
    const responseReceived = tracks.find(r => r.data.traceId === requestSent.data.traceId && r.data.type === 'responseReceived');

    assert.exists(responseReceived);
    assert.equal(responseReceived.level, 'verbose');
});

test('Positive: requestSent/errorOccured flow', async function () {
    const query =  { param: 'value' };

    try {
        await api.get('/request_2/404', query);
        assert.fail('expected to throw error');
    } catch  {
        const requestSent = tracks.find(r => r.data.url === '/request_2/404');

        assert.exists(requestSent);
        assert.equal(requestSent.level, 'debug');
        assert.equal(requestSent.data.params, query);
        const errorOccured = tracks.find(r => r.data.traceId === requestSent.data.traceId && r.data.type === 'errorOccured');

        assert.exists(errorOccured);
        assert.equal(errorOccured.level, 'verbose');
        assert.equal(errorOccured.data.error, 'Error: Request failed with status code 404');
    }
});

after(function () {
    factory.unMockAPI();
});
