import { ApolloServer } from 'apollo-server'
import resolvers from './schema/resolvers'
import typeDefs from './schema/typedefs'

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

startApolloServer(typeDefs, resolvers)
