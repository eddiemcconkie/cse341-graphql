"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.init = void 0;
const mongodb_1 = require("mongodb");
let _client;
const init = (callback) => {
    if (_client) {
        console.log('Database is already initialized');
        return callback(null, _client);
    }
    mongodb_1.MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
        _client = client;
        callback(null, _client);
    })
        .catch((err) => {
        callback(err);
    });
};
exports.init = init;
const db = () => {
    if (!_client) {
        throw Error('Database not initialized');
    }
    return _client.db();
};
exports.db = db;
//# sourceMappingURL=connect.js.map