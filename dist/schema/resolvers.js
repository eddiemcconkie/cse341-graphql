"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const resolvers = {
    Query: {
        notes: () => data_1.notes,
        lists: () => data_1.lists,
    },
    Mutation: {
        addNote: (_, payload) => {
            const newNote = Object.assign(Object.assign({}, payload), { group: null, tags: [] });
            data_1.notes.push(newNote);
            console.log('Note added!');
            return newNote;
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map