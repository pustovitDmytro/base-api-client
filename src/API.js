/* eslint-disable unicorn/filename-case */
import axios from 'axios';
import ms from 'ms';
import { v4 as uuid } from 'uuid';
import { cleanUndefined } from 'myrmidon';
import { resolveUrl } from './utils';
import API_ERROR from './Error';

const defaultMock = () => ({ data: 1 });

export default class API {
    constructor(url, { timeout = '1m', logger } = {}) {
        this.url = url && new URL(url);
        this.timeout = ms(timeout);
        this.initLogger(logger);
        this._instance = axios.create({});
    }

    initLogger(logger) {
        this._logger = logger;
    }

    log(level, data) {
        if (this._logger) this._logger.log(level, data);
    }

    onError(error) {
        if (error.isAxiosError) throw new API_ERROR(error);
        throw error;
    }

    onResponse(res) {
        return res.data;
    }

    _getUrl(relativeUrl) {
        return resolveUrl(this.url, relativeUrl);
    }

    getHeaders() {
        return {
            'Content-Type' : 'application/json',
            'Accept'       : 'application/json'
        };
    }

    setMock(fn = defaultMock) {
        this._mock = fn;
    }

    async _axios(axiosOptions) {
        if (this._mock) return this._mock(axiosOptions);

        return this._instance(axiosOptions);
    }

    getTraceId(axiosOptions, { traceId }) {
        return traceId || uuid();
    }

    async request(method, url, reqOptions = {}, settings = {}) {
        const { headers, data, params, ...options } = reqOptions;

        const optional = {
            timeout : this.timeout,
            data,
            params,
            auth    : this.auth
        };

        const axiosOptions = {
            method,
            url     : this._getUrl(url).href,
            headers : headers || this.getHeaders(),
            ...cleanUndefined(optional),
            ...options
        };

        const traceId = this.getTraceId(axiosOptions, settings);

        this.log('debug', { method, url, ...reqOptions, api: this.constructor.name, traceId, type: 'requestSent' });

        try {
            const response = await this._axios(axiosOptions);

            this.log('verbose', { traceId, type: 'responseReceived', data: response.data });

            const handleResponse = settings.onResponse || this.onResponse;

            return handleResponse(response);
        } catch (error) {
            this.log('verbose', { traceId, error: error.toString(), data: error.response?.data, stack: error.stack, type: 'errorOccured' });
            const onError = settings.onError || this.onError;

            onError(error);
        }
    }

    get(url, params, options = {}) {
        return this.request('GET', url, {
            params,
            ...options
        });
    }

    post(url, data, options = {}) {
        return this.request('POST', url, {
            data,
            ...options
        });
    }

    patch(url, data, options = {}) {
        return this.request('PATCH', url, {
            data,
            ...options
        });
    }

    put(url, data, options = {}) {
        return this.request('PUT', url, {
            data,
            ...options
        });
    }

    delete(url, options = {}) {
        return this.request('DELETE', url, {
            ...options
        });
    }
}
