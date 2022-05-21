import { ApolloServer } from 'apollo-server'
import resolvers from './schema/resolvers'
import typeDefs from './schema/typedefs'

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    introspection: true,
  })
  const { url } = await server.listen({ port: process.env.PORT || 4000 })
  console.log(`🚀 Server ready at ${url}`)
}

startApolloServer(typeDefs, resolvers)
