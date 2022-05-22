import { ApolloError } from 'apollo-server'
import { db } from '../../db/connect'

export const notes = async () => {
  try {
    return await db().collection('notes').find().toArray()
  } catch (error) {
    throw ApolloError
  }
}

export const lists = async () => {
  try {
    return await db().collection('lists').find().toArray()
  } catch (error) {
    throw ApolloError
  }
}
