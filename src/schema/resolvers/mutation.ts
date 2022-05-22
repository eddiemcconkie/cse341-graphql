import { ApolloError } from 'apollo-server'
import { db } from '../../db/connect'

export const addNote = async (_, { title, content }) => {
  const newNote = {
    id: '',
    title,
    content,
    group: null,
    tags: [],
  }
  try {
    const result = await db().collection('notes').insertOne(newNote)
    newNote.id = result.insertedId.toString()
    return newNote
  } catch (error) {
    throw ApolloError
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
    throw ApolloError
  }
}
