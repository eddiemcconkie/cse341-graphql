"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type Tag {
    id: ID!
    label: String!
  }

  type Group {
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
    title: String!
    todos: [Todo]
    group: Group
    tags: [Tag]
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    group: Group
    tags: [Tag]
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    notes: [Note]
    lists: [List]
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
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map