import { notes, lists } from './data'

const resolvers = {
  Query: {
    notes: () => notes,
    lists: () => lists,
  },
  Mutation: {
    addNote: (_, payload) => {
      const newNote = {
        ...payload,
        group: null,
        tags: [],
      }
      notes.push(newNote)
      console.log('Note added!')
      return newNote
    },
  },
}

export default resolvers
