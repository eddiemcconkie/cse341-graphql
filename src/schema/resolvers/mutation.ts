import { ApolloError } from 'apollo-server-express'
import { ObjectId } from 'mongodb'
import { db } from '../../db/connect'
import { convertId } from '../../lib/helpers'

export const addNote = async (parent, { title, content }, context) => {
  const newNote = {
    id: '',
    uid: context.uid,
    title,
    content,
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

export const addList = async (parent, { title }, context) => {
  const newList = {
    id: '',
    uid: context.uid,
    title,
    todos: [],
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

export const addTagToNote = async (parent, { noteId, tag }, context) => {
  try {
    const result = await db()
      .collection('notes')
      .findOneAndUpdate(
        { _id: new ObjectId(noteId), uid: context.uid },
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

export const deleteNote = async (parent, { noteId }, context) => {
  try {
    const result = await db()
      .collection('notes')
      .deleteOne({ _id: new ObjectId(noteId), uid: context.uid })
    return result.deletedCount == 1 ? 'Note deleted' : 'Note not found'
  } catch (error) {
    throw new ApolloError('Could not delete note')
  }
}
