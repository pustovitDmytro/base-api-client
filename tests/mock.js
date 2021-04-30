import createAxiosError from 'axios/lib/core/createError';
import express from 'express';
import { _load } from './entry';

const API = _load('API').default;

function axiosResponse(data) {
    return { data };
}

function axiosError(opts, { message, code }, data) {
    return createAxiosError(message, opts, code, {}, { data });
}

class MOCK_API extends API {
    async _axios(opts) {
        if (opts.url.match('unknownError')) throw new Error('unknownError occured');
        if (opts.url.match('emptyError')) throw axiosError(opts, { code: 401, message: 'Request failed with status code 401' });

        if (opts.url.match('404')) throw axiosError(opts, { code: 404, message: 'Request failed with status code 404' }, 'ENTITY_NOT_FOUND');
        if (opts.url.match('mock')) {
            return axiosResponse({});
        }

        return axiosResponse(1);
    }
}

const methods = Object.getOwnPropertyNames(MOCK_API.prototype).filter(m => m !== 'constructor');
const BACKUP = {};

methods.forEach(methodName => {
    BACKUP[methodName] = API.prototype[methodName];
});

export function mockAPI() {
    methods.forEach(methodName => {
        API.prototype[methodName] = MOCK_API.prototype[methodName];
    });
}

export function unMockAPI() {
    methods.forEach(methodName => {
        API.prototype[methodName] = BACKUP[methodName];
    });
}

export async function startMockApp() {
    const app = express();

    app.use((req, res) => res.send({
        method : req.method
    }));

    return new Promise(res => {
        const server = app.listen(0, () => {
            res(server);
            const { port } = server.address();

            console.log(`Mock app started on port ${port}`);
        });
    });
}


export async function stopMockApp(server) {
    return new Promise(res => server.close(res));
}