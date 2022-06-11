import { ApolloError } from 'apollo-server-express'
import { ObjectId } from 'mongodb'
import { db } from '../../db/connect'
import { convertId, timestamp } from '../../lib/helpers'

/***** NOTES *****/
export const addNote = async (parent, { title, content }, context) => {
  const newNote = {
    id: '',
    uid: context.uid,
    title,
    content,
    tags: [],
    createdAt: timestamp(),
    lastUpdated: timestamp(),
  }
  try {
    const result = await db().collection('notes').insertOne(newNote)
    newNote.id = result.insertedId.toString()
    return newNote
  } catch (error) {
    throw new ApolloError('Could not add note to database')
  }
}

export const updateNote = async (parent, { id, ...args }, context) => {
  try {
    const result = await db()
      .collection('notes')
      .findOneAndUpdate(
        { _id: new ObjectId(id), uid: context.uid },
        { $set: { ...args, lastUpdated: timestamp() } },
        { returnDocument: 'after' }
      )
    return convertId(result.value)
  } catch (error) {
    throw new ApolloError('Could not modify note')
  }
}

export const addTagToNote = async (parent, { id, tag }, context) => {
  try {
    const result = await db()
      .collection('notes')
      .findOneAndUpdate(
        { _id: new ObjectId(id), uid: context.uid },
        /* @ts-ignore*/
        { $push: { tags: tag }, $set: { lastUpdated: timestamp() } },
        { returnDocument: 'after' }
      )
    // @ts-ignore
    return convertId(result.value)
  } catch (error) {
    throw new ApolloError('Could not add tag to note')
  }
}

export const deleteNote = async (parent, { id }, context) => {
  try {
    const result = await db()
      .collection('notes')
      .deleteOne({ _id: new ObjectId(id), uid: context.uid })
    return { deleted: result.deletedCount == 1 }
  } catch (error) {
    throw new ApolloError('Could not delete note')
  }
}

/***** LISTS *****/
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

export const renameList = async (parent, { id, title }, context) => {
  try {
    const result = await db()
      .collection('lists')
      .findOneAndUpdate(
        { _id: new ObjectId(id), uid: context.uid },
        { $set: { title, lastUpdated: timestamp() } },
        { returnDocument: 'after' }
      )
    return convertId(result.value)
  } catch (error) {
    throw new ApolloError('Could not modify note')
  }
}

export const addTagToList = async (parent, { id, tag }, context) => {
  try {
    const result = await db()
      .collection('lists')
      .findOneAndUpdate(
        { _id: new ObjectId(id), uid: context.uid },
        /* @ts-ignore*/
        { $push: { tags: tag }, $set: { lastUpdated: timestamp() } },
        { returnDocument: 'after' }
      )
    // @ts-ignore
    return convertId(result.value)
  } catch (error) {
    throw new ApolloError('Could not add tag to note')
  }
}

export const deleteList = async (parent, { id }, context) => {
  try {
    const result = await db()
      .collection('lists')
      .deleteOne({ _id: new ObjectId(id), uid: context.uid })
    return { deleted: result.deletedCount == 1 }
  } catch (error) {
    throw new ApolloError('Could not delete list')
  }
}
