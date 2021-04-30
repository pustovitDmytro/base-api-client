import Test from '../Test';
import { checkError } from '../utils';

const factory = new Test();
const api = factory.createAPI();

suite('Mock Common Requests');

before(function () {
    factory.mockAPI();
});

test('Positive: GET request', async function () {
    await api.get('/request_1');
});

test('Positive: GET request with params', async function () {
    await api.get('/request_2', { param: 'value' });
});

test('Positive: POST request', async function () {
    await api.post('/request_3', { data: { a: 1 } });
});

test('Positive: PATCH request', async function () {
    await api.patch('/request_3', { data: { a: 1 } });
});

test('Positive: PUT request', async function () {
    await api.put('/request_3', { data: { a: 1 } });
});

test('Positive: DELETE request', async function () {
    await api.delete('/request_3');
});

test('Negative: 404 on DELETE request', async function () {
    await checkError(api.delete('/request_4/404'), 'API_ERROR', 'Error: Request failed with status code 404 "ENTITY_NOT_FOUND"');
});


after(function () {
    factory.unMockAPI();
});
