import { Document, WithId } from 'mongodb'

// Return an object with an id string attribute in place of Mongo's ObjectId
export const convertId = (data: WithId<Document>) => ({
  ...data,
  id: data._id.toString(),
})
