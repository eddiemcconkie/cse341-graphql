import { ApolloError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import { db } from '../../db/connect'
import { convertId } from '../../lib/helpers'

export const addNote = async (_, { title, content }) => {
  const newNote = {
    id: '',
    title,
    content,
    group: null,
    tags: [],
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  }
  try {
    const result = await db().collection('notes').insertOne(newNote)
    newNote.id = result.insertedId.toString()
    return newNote
  } catch (error) {
    throw new ApolloError('Could not add note to database')
  }
}

export const addList = async (_, { title }) => {
  const newList = {
    id: '',
    title,
    todos: [],
    group: null,
    tags: [],
  }
  try {
    const result = await db().collection('lists').insertOne(newList)
    newList.id = result.insertedId.toString()
    return newList
  } catch (error) {
    throw new ApolloError('Could not add list to database')
  }
}

export const addTagToNote = async (_, { noteId, tag }) => {
  try {
    const result = await db()
      .collection('notes')
      .findOneAndUpdate(
        { _id: new ObjectId(noteId) },
        /* @ts-ignore*/
        { $push: { tags: tag } },
        { returnDocument: 'after' }
      )
    // @ts-ignore
    return convertId(result.value)
  } catch (error) {
    throw new ApolloError('Could not add tag to note')
  }
}

export const deleteNote = async (_, { noteId }) => {
  try {
    const result = await db()
      .collection('notes')
      .deleteOne({ _id: new ObjectId(noteId) })
    return result.deletedCount == 1 ? 'Note deleted' : 'Note not found'
  } catch (error) {
    throw new ApolloError('Could not delete note')
  }
}
