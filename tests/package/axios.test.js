import { assert } from 'chai';
import Test from '../Test';
import { checkError } from '../utils';

const factory = new Test();

suite('Test Real Requests');

before(async function () {
    await factory.startMockApp();
});

test('Positive: GET request with params', async function () {
    const api = factory.createAPI(factory.mockAppUrl);

    const res = await api.get('/echo/request_2', { param: 'value' });

    assert.deepEqual(res, {
        method : 'GET',
        path   : '/request_2',
        query  : { param: 'value' }
    });
});

test('Negative: Timeout Reached', async function () {
    const api = factory.createAPI(factory.mockAppUrl, { timeout: '1ms' });

    await checkError(api.delete('/echo/request_1'), 'API_ERROR', 'Error: timeout of 1ms exceeded');
});

test('Positive: default Mock all requests', async function () {
    const api = factory.createAPI(factory.mockAppUrl);

    api.setMock();

    const res = await api.get('/echo/request_2', { param: 'value' });

    assert.deepEqual(res, 1);
});

test('Positive: custom Mock all requests', async function () {
    const api = factory.createAPI(factory.mockAppUrl);

    api.setMock(() => ({ data: 2 }));

    const res = await api.get('/echo/request_2', { param: 'value' });

    assert.deepEqual(res, 2);
});


after(function () {
    factory.stopMockApp();
});
