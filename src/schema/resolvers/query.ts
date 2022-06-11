import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { ObjectId } from 'mongodb'
import { db } from '../../db/connect'
import { convertId } from '../../lib/helpers'

/***** NOTES *****/
export const allNotes = async (parent, args, context) => {
  try {
    let result = await db()
      .collection('notes')
      .find({ uid: context.uid })
      .toArray()
    return result.map(convertId)
  } catch (error) {
    throw new ApolloError('Could not retrieve notes from database')
  }
}

export const note = async (parent, { id }, context) => {
  try {
    const result = await db()
      .collection('notes')
      .findOne({ _id: new ObjectId(id), uid: context.uid })
    return convertId(result)
  } catch (error) {
    throw new ApolloError('Could not retrieve note from database')
  }
}

/***** LISTS *****/
export const allLists = async (parent, args, context) => {
  try {
    const result = await db()
      .collection('lists')
      .find({ uid: context.uid })
      .toArray()
    return result.map(convertId)
  } catch (error) {
    throw new ApolloError('Could not retrieve lists from database')
  }
}

export const list = async (parent, { id }, context) => {
  try {
    const result = await db()
      .collection('lists')
      .findOne({ _id: new ObjectId(id), uid: context.uid })
    return convertId(result)
  } catch (error) {
    throw new ApolloError('Could not retrieve list from database')
  }
}
