"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    {
        id: '1',
        firstName: 'Eddie',
        lastName: 'McConkie',
        notes: [
            {
                id: '100',
                title: 'Note 1',
                content: 'This is the first note',
                group: null,
                tags: ['typescript'],
            },
            {
                id: '101',
                title: 'Note 2',
                content: 'This is the second note',
                group: null,
                tags: ['graphql', 'apollo'],
            },
        ],
        lists: [],
    },
    {
        id: '2',
        firstName: 'Elle',
        lastName: 'McConkie',
        notes: [
            {
                id: '200',
                title: 'Note 2',
                content: 'This is the second note',
                group: null,
                tags: [],
            },
        ],
        lists: [],
    },
];
exports.default = users;
//# sourceMappingURL=data.js.map