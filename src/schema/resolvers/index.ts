import { lists, notes } from './query'
import { addNote, addList } from './mutation'

const resolvers = {
  Query: {
    notes,
    lists,
  },
  Mutation: {
    addNote,
    addList,
  },
}

export default resolvers
