import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { db } from '../../db/connect'
import { convertId } from '../../lib/helpers'

export const notes = async (parent, args, context) => {
  if (!context.user) throw new AuthenticationError('you must be logged in')

  try {
    let result = await db().collection('notes').find().toArray()
    return result.map(convertId)
  } catch (error) {
    throw new ApolloError('Could not retrieve notes from database')
  }
}

export const lists = async () => {
  try {
    const result = await db().collection('lists').find().toArray()
    return result.map(convertId)
  } catch (error) {
    throw new ApolloError('Could not retrieve lists from database')
  }
}
