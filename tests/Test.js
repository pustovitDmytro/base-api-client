import fse from 'fs-extra';
import API from './entry';
import { tmpFolder } from './constants';
import { mockAPI, unMockAPI, startMockApp, stopMockApp } from  './mock';

export * from './utils';
export * from './constants';

export default class Test {
    createAPI(url = 'http://mock/', opts = undefined) {
        return new API(url, opts);
    }

    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }

    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }

    mockAPI() {
        mockAPI();
    }

    unMockAPI() {
        unMockAPI();
    }

    async startMockApp() {
        this._server = await startMockApp();
    }

    get mockAppUrl() {
        const { port } = this._server.address();

        return `http://localhost:${port}`;
    }

    async stopMockApp() {
        await stopMockApp(this._server);
    }
}

