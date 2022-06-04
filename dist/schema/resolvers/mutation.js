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
exports.deleteNote = exports.addTagToNote = exports.addList = exports.addNote = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const mongodb_1 = require("mongodb");
const connect_1 = require("../../db/connect");
const helpers_1 = require("../../lib/helpers");
const addNote = (_, { title, content }) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = {
        id: '',
        title,
        content,
        group: null,
        tags: [],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
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
const addList = (_, { title }) => __awaiter(void 0, void 0, void 0, function* () {
    const newList = {
        id: '',
        title,
        todos: [],
        group: null,
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
const addTagToNote = (_, { noteId, tag }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('notes')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(noteId) }, 
        /* @ts-ignore*/
        { $push: { tags: tag } }, { returnDocument: 'after' });
        // @ts-ignore
        return (0, helpers_1.convertId)(result.value);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not add tag to note');
    }
});
exports.addTagToNote = addTagToNote;
const deleteNote = (_, { noteId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.db)()
            .collection('notes')
            .deleteOne({ _id: new mongodb_1.ObjectId(noteId) });
        return result.deletedCount == 1 ? 'Note deleted' : 'Note not found';
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError('Could not delete note');
    }
});
exports.deleteNote = deleteNote;
//# sourceMappingURL=mutation.js.map