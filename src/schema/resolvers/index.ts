import { allNotes, note, allLists, list } from './query'
import {
  addNote,
  updateNote,
  addTagToNote,
  deleteNote,
  addList,
  renameList,
  addTagToList,
  deleteList,
} from './mutation'

const resolvers = {
  Query: {
    // Notes
    allNotes,
    note,
    // Lists
    allLists,
    list,
  },
  Mutation: {
    // Notes
    addNote,
    updateNote,
    addTagToNote,
    deleteNote,
    // Lists
    addList,
    renameList,
    addTagToList,
    deleteList,
  },
}

export default resolvers
