"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const resolvers = {
    Query: {
        notes: query_1.notes,
        lists: query_1.lists,
    },
    Mutation: {
        addNote: mutation_1.addNote,
        addList: mutation_1.addList,
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map