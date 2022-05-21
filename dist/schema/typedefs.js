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

  "A list of to-do items"
  type List {
    id: ID!
    title: String!
    todos: [Todo]
    group: Group
    tags: [Tag]
  }

  """
  A simple note-taking note
  """
  type Note {
    id: ID!
    title: String!
    content: String!
    """
    ## The group that the note belongs to
    Groups are used to:

    1. organize sets of notes
    2. add complexity to the API
    """
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

  "Use Query to retrieve data"
  type Query {
    "Returns all notes"
    notes: [Note]

    "Returns all to-do lists"
    lists: [List]
  }

  "Use Mutation to modify data"
  type Mutation {
    "Add a new note"
    addNote(id: String!, title: String!, content: String!): Note
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map