"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variables = exports.document = void 0;
exports.document = `
mutation AddNote($title: String!, $content: String!) {
  addNote(title: $title, content: $content) {
    id
    title
    content
    tags
    createdAt
    lastUpdated
  }
}

query AllNotes {
  allNotes {
    id
    title
    content
    tags
    createdAt
    lastUpdated
  }
}
`;
exports.variables = {
    title: 'New note title',
    content: 'New note content',
};
//# sourceMappingURL=explorer.js.map