"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variables = exports.document = void 0;
exports.document = `
  query Notes {
    notes {
      id
      title
      content
      createdAt
    }
  }

  mutation Mutation($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }
`;
exports.variables = { title: 'Note Title', content: 'Note Content' };
//# sourceMappingURL=explorer.js.map