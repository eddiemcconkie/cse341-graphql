import { gql } from 'apollo-server'

export const document = `
  query Notes {
    notes {
      id
      title
      content
    }
  }

  mutation Mutation($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

export const variables = { title: 'Note Title', content: 'Note Content' }
