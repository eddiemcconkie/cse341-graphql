import { gql } from 'apollo-server-express'

export const document = `
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
`

export const variables = {
  title: 'New note title',
  content: 'New note content',
}
