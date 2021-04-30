import Test from '../Test';
// import { checkError } from '../utils';

const factory = new Test();

let api;

suite('Test Real Requests');

before(async function () {
    await factory.startMockApp();
    api = factory.createAPI(factory.mockAppUrl);
});

test('Positive: GET request with params', async function () {
    await api.get('/request_2', { param: 'value' });
});

// test('Negative: Timeout Reached', async function () {
//     await checkError(api.delete('/request_4/404'), 'API_ERROR', 'Error: Request failed with status code 404 "ENTITY_NOT_FOUND"');
// });


after(function () {
    factory.stopMockApp();
});
