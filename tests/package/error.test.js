import Test from '../Test';
import { checkError } from '../utils';

const factory = new Test();
const api = factory.createAPI();

suite('Api Errors');

before(function () {
    factory.mockAPI();
});

test('Negative: unknownError', async function () {
    await checkError(api.put('/request_4/unknownError'), 'Error', 'unknownError occured');
});

test('Negative: apiError with empty data', async function () {
    await checkError(api.put('/request_4/emptyError'), 'API_ERROR', 'Error: Request failed with status code 401');
});

after(function () {
    factory.unMockAPI();
});
