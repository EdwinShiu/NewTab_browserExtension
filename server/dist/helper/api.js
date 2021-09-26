var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import csv from 'csvtojson';
import { Readable } from 'stream';
const API = {
    get: (url) => __awaiter(void 0, void 0, void 0, function* () {
        return yield fetch(url, {
            method: 'GET',
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () { return yield res.json(); }));
    }),
    getCSV: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(url);
        const row = [];
        yield csv()
            .fromStream(new Readable().wrap(response.body))
            .subscribe((json) => {
            row.push(json);
        });
        return row;
    }),
};
export default API;
//# sourceMappingURL=api.js.map