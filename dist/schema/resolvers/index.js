"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const resolvers = {
    Query: {
        // Notes
        allNotes: query_1.allNotes,
        note: query_1.note,
        // Lists
        allLists: query_1.allLists,
        list: query_1.list,
    },
    Mutation: {
        // Notes
        addNote: mutation_1.addNote,
        updateNote: mutation_1.updateNote,
        addTagToNote: mutation_1.addTagToNote,
        deleteNote: mutation_1.deleteNote,
        // Lists
        addList: mutation_1.addList,
        renameList: mutation_1.renameList,
        addTagToList: mutation_1.addTagToList,
        deleteList: mutation_1.deleteList,
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map