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
exports.addList = exports.addNote = void 0;
const apollo_server_1 = require("apollo-server");
const connect_1 = require("../../db/connect");
const addNote = (_, { title, content }) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = {
        id: '',
        title,
        content,
        group: null,
        tags: [],
    };
    try {
        const result = yield (0, connect_1.db)().collection('notes').insertOne(newNote);
        newNote.id = result.insertedId.toString();
        return newNote;
    }
    catch (error) {
        throw apollo_server_1.ApolloError;
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
        throw apollo_server_1.ApolloError;
    }
});
exports.addList = addList;
//# sourceMappingURL=mutation.js.map