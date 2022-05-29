import { ApolloError } from 'apollo-server'
import { db } from '../../db/connect'
import { convertId } from '../../lib/helpers'

export const notes = async () => {
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
