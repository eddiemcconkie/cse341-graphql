import { lists, notes } from './query'
import { addNote, addList, addTagToNote, deleteNote } from './mutation'

const resolvers = {
  Query: {
    notes,
    lists,
  },
  Mutation: {
    addNote,
    addList,
    addTagToNote,
    deleteNote,
  },
}

export default resolvers
