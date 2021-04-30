import axios from 'axios';
import ms from 'ms';
import { v4 as uuid } from 'uuid';
import { resolveUrl } from './utils';
import API_ERROR from './Error';

const defaultMock = () => ({ data: 1 });

export default class API {
    constructor(url, { timeout = '1m', logger } = {}) {
        this.url = new URL(url);
        this.timeout = ms(timeout);
        this.initLogger(logger);
    }

    initLogger(logger) {
        this.logger = logger;
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

        return axios(axiosOptions);
    }

    getTraceId({ traceId }) {
        return traceId || uuid();
    }

    async request(method, url, reqOptions = {}, settings = {}) {
        const { headers, data, params, ...options } = reqOptions;
        const traceId = this.getTraceId(settings);

        this.logger?.log('debug', { method, url, ...reqOptions, api: this.constructor.name, traceId, type: 'requestSent' });
        const axiosOptions = {
            timeout : this.timeout,
            method,
            url     : this._getUrl(url).href,
            headers : headers || this.getHeaders(),
            data    : data || {},
            params  : params || {},
            auth    : this.auth,
            ...options
        };

        try {
            const response = await this._axios(axiosOptions);

            this.logger?.log('verbose', { traceId, type: 'responseReceived', data: response.data });

            const handleResponse = settings.onResponse || this.onResponse;

            return handleResponse(response);
        } catch (error) {
            this.logger?.log('verbose', { traceId, error: error.toString(), data: error.response?.data, stack: error.stack, type: 'errorOccured' });
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
        return this.request('PUT', url, {
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
