import { assert } from 'chai';
import Test from '../Test';
import { checkError, load } from '../utils';

const factory = new Test();
const api = factory.createAPI();
const API_ERROR = load('Error').default;

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

test('Negative: Error idempotency', async function () {
    const err = await api.put('/request_4/emptyError').catch(error => error);

    assert.isTrue(err instanceof API_ERROR);
    assert.include(err.message, 'Error: Request failed with status code 401', err.toString());

    const idempotent = new API_ERROR(err);

    assert.equal(idempotent, err);
});

after(function () {
    factory.unMockAPI();
});
