"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Tag {
    id: ID!
    label: String!
  }

  type Todo {
    id: ID!
    label: String!
    completed: Boolean!
    dueDate: String
  }

  type List {
    id: ID!
    uid: String!
    title: String!
    todos: [Todo]
    tags: [String]
  }

  type Note {
    id: ID!
    uid: String!
    title: String!
    content: String!
    tags: [String]
    createdAt: String!
    lastUpdated: String!
  }

  """
  Use **Query** to retrieve data...

  Select one of the fields below to create a Query
  """
  type Query {
    "Retrieve all notes from the database"
    notes: [Note]

    "Retrieve all to-do lists from the database"
    lists: [List]
  }

  """
  Use **Mutation** to modify data...

  Select a Mutation operation and provide the required arguments in the Variables section
  """
  type Mutation {
    "Add a new note to the database"
    addNote(title: String!, content: String!): Note

    "Add a new to-do list to the database"
    addList(title: String!): List

    "Add a tag to the specified note"
    addTagToNote(noteId: String!, tag: String!): List

    "Delete a note from the database"
    deleteNote(noteId: String!): String
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map