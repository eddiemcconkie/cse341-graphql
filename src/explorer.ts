import { gql } from 'apollo-server-express'

export const document = `
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
`

export const variables = {
  // Add tag to note
  noteId: '6289ca734148f124d044e156',
  tag: 'apollo-server',

  // Create new note
  title: 'New Note',
  content: 'New note content',

  // Delete note
  deleteNoteId: '628ba739506c737a3daba98e',
}
