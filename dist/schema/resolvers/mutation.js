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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.addTagToList = exports.renameList = exports.addList = exports.deleteNote = exports.addTagToNote = exports.updateNote = exports.addNote = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const mongodb_1 = require("mongodb");
const connect_1 = require("../../db/connect");
const helpers_1 = require("../../lib/helpers");
/***** NOTES *****/
const addNote = (parent, { title, content }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = {
        id: '',
        uid: context.uid,
        title,
        content,
        tags: [],
        createdAt: (0, helpers_1.timestamp)(),
        lastUpdated: (0, helpers_1.timestamp)(),
    };
    try {
        const result = yield (0, connect_1.db)().collection('notes').insertOne(newNote);
        newNote.id = result.insertedId.toString();
        return newNote;
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not add note to database');
    }
});
exports.addNote = addNote;
const updateNote = (parent, _a, context) => __awaiter(void 0, void 0, void 0, function* () {
    var { id } = _a, args = __rest(_a, ["id"]);
    try {
        const result = yield (0, connect_1.db)()
            .collection('notes')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id), uid: context.uid }, { $set: Object.assign(Object.assign({}, args), { lastUpdated: (0, helpers_1.timestamp)() }) }, { returnDocument: 'after' });
        return (0, helpers_1.convertId)(result.value);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not modify note');
    }
});
exports.updateNote = updateNote;
const addTagToNote = (parent, { id, tag }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('notes')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id), uid: context.uid }, 
        /* @ts-ignore*/
        { $push: { tags: tag }, $set: { lastUpdated: (0, helpers_1.timestamp)() } }, { returnDocument: 'after' });
        // @ts-ignore
        return (0, helpers_1.convertId)(result.value);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not add tag to note');
    }
});
exports.addTagToNote = addTagToNote;
const deleteNote = (parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('notes')
            .deleteOne({ _id: new mongodb_1.ObjectId(id), uid: context.uid });
        return { deleted: result.deletedCount == 1 };
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not delete note');
    }
});
exports.deleteNote = deleteNote;
/***** LISTS *****/
const addList = (parent, { title }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const newList = {
        id: '',
        uid: context.uid,
        title,
        todos: [],
        tags: [],
    };
    try {
        const result = yield (0, connect_1.db)().collection('lists').insertOne(newList);
        newList.id = result.insertedId.toString();
        return newList;
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not add list to database');
    }
});
exports.addList = addList;
const renameList = (parent, { id, title }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('lists')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id), uid: context.uid }, { $set: { title, lastUpdated: (0, helpers_1.timestamp)() } }, { returnDocument: 'after' });
        return (0, helpers_1.convertId)(result.value);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not modify note');
    }
});
exports.renameList = renameList;
const addTagToList = (parent, { id, tag }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('lists')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id), uid: context.uid }, 
        /* @ts-ignore*/
        { $push: { tags: tag }, $set: { lastUpdated: (0, helpers_1.timestamp)() } }, { returnDocument: 'after' });
        // @ts-ignore
        return (0, helpers_1.convertId)(result.value);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not add tag to note');
    }
});
exports.addTagToList = addTagToList;
const deleteList = (parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('lists')
            .deleteOne({ _id: new mongodb_1.ObjectId(id), uid: context.uid });
        return { deleted: result.deletedCount == 1 };
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not delete list');
    }
});
exports.deleteList = deleteList;
//# sourceMappingURL=mutation.js.map