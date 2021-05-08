import path from 'path';
import fse from 'fs-extra';
import API from './entry';
import { tmpFolder, entry } from './constants';
import { mockAPI, unMockAPI, startMockApp, stopMockApp } from  './mock';

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

function load(relPath) {
    // eslint-disable-next-line security/detect-non-literal-require
    return require(path.join(entry, relPath));
}

function resolve(relPath) {
    return require.resolve(path.join(entry, relPath));
}

export {
    tmpFolder,
    entry,
    load,
    resolve
};
