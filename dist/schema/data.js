"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.lists = exports.notes = void 0;
exports.notes = [
    {
        id: '1',
        title: 'Note 1',
        content: 'This is my first note',
        group: null,
        tags: [],
    },
    {
        id: '2',
        title: 'Note 2',
        content: 'This is another note',
        group: null,
        tags: ['boring'],
    },
];
exports.lists = [
    {
        id: '1',
        title: 'Generic To-do list',
        todos: [
            {
                id: '1',
                label: 'Apply to internships/jobs',
                completed: false,
                dueDate: 'later',
            },
            {
                id: '2',
                label: 'Clean my house',
                completed: false,
                dueDate: 'every day',
            },
        ],
        group: {
            id: '10',
            label: 'group1',
        },
        tags: '',
    },
];
exports.users = [
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
        firstName: 'Marielle',
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
//# sourceMappingURL=data.js.map