/* eslint-disable security/detect-non-literal-require */
import { entry } from './constants';

const m = require(entry);

console.log('m:', m);

export default m.default;
