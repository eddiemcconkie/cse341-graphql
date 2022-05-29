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
      tags
    }
  }

  mutation AddNote($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }

  mutation AddTagToNote($noteId: String!, $tag: String!) {
    addTagToNote(noteId: $noteId, tag: $tag) {
      title
      tags
    }
  }

  mutation DeleteNote($deleteNoteId: String!) {
    deleteNote(noteId: $deleteNoteId)
  }
`;
exports.variables = {
    // Add tag to note
    noteId: '6289ca734148f124d044e156',
    tag: 'apollo-server',
    // Create new note
    title: 'New Note',
    content: 'New note content',
    // Delete note
    deleteNoteId: '628ba739506c737a3daba98e',
};
//# sourceMappingURL=explorer.js.map