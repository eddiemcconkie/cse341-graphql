import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type DeleteResult {
    deleted: Boolean
  }

  type Todo {
    id: ID!
    label: String!
    completed: Boolean!
  }

  type List {
    id: ID!
    title: String!
    todos: [Todo]
    tags: [String]
    createdAt: String!
    lastUpdated: String!
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    tags: [String]
    links: [String]
    createdAt: String!
    lastUpdated: String!
  }

  """
  Use **Query** to retrieve data...

  Select one of the fields below to create a Query
  """
  type Query {
    ### NOTES ###

    "Retrieve all notes from the database"
    allNotes: [Note]

    "Retrieve a single note by id"
    note(id: ID!): Note

    ### LISTS ###

    "Retrieve all to-do lists from the database"
    allLists: [List]

    "Retrieve a single list by id"
    list(id: ID!): List
  }

  """
  Use **Mutation** to modify data...

  Select a Mutation operation and provide the required arguments in the Variables section
  """
  type Mutation {
    ### NOTES ###

    "Add a new note to the database"
    addNote(title: String!, content: String!): Note

    "Update the title or content of a note"
    updateNote(id: ID!, title: String, content: String): Note

    "Add a tag to the specified note"
    addTagToNote(id: ID!, tag: String!): Note

    "Delete a note from the database"
    deleteNote(id: ID!): DeleteResult

    ### LISTS ###

    "Add a new to-do list to the database"
    addList(title: String!): List

    "Rename the specified list"
    renameList(id: ID!, title: String!): List

    "Add a tag to the specified list"
    addTagToList(id: ID!, tag: String!): List

    "Add a to-do to the list with the specified id"
    addTodoToList(id: ID!, label: String!): Todo

    "Mark the specified todo as completed or not"
    setTodo(id: ID!, completed: Boolean!): Todo

    "Delete a list from the database"
    deleteList(id: ID!): DeleteResult
  }
`

export default typeDefs
