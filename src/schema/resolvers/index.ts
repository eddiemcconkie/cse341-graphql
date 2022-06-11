import { allNotes, note, allLists, list } from './query'
import {
  addNote,
  updateNote,
  addTagToNote,
  deleteNote,
  addList,
  renameList,
  addTagToList,
  addTodoToList,
  setTodo,
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
    addTodoToList,
    setTodo,
    deleteList,
  },
}

export default resolvers
