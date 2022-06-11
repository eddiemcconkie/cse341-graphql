"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.allLists = exports.note = exports.allNotes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const mongodb_1 = require("mongodb");
const connect_1 = require("../../db/connect");
const helpers_1 = require("../../lib/helpers");
/***** NOTES *****/
const allNotes = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield (0, connect_1.db)()
            .collection('notes')
            .find({ uid: context.uid })
            .toArray();
        return result.map(helpers_1.convertId);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not retrieve notes from database');
    }
});
exports.allNotes = allNotes;
const note = (parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('notes')
            .findOne({ _id: new mongodb_1.ObjectId(id), uid: context.uid });
        return (0, helpers_1.convertId)(result);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not retrieve note from database');
    }
});
exports.note = note;
/***** LISTS *****/
const allLists = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('lists')
            .find({ uid: context.uid })
            .toArray();
        return result.map(helpers_1.convertId);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not retrieve lists from database');
    }
});
exports.allLists = allLists;
const list = (parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('lists')
            .findOne({ _id: new mongodb_1.ObjectId(id), uid: context.uid });
        return (0, helpers_1.convertId)(result);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not retrieve list from database');
    }
});
exports.list = list;
//# sourceMappingURL=query.js.map