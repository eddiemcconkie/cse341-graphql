import { gql } from 'apollo-server'

export const document = `
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
`

export const variables = { title: 'Note Title', content: 'Note Content' }
