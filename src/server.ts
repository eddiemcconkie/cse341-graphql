import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import resolvers from './schema/resolvers'
import typeDefs from './schema/typedefs'

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    introspection: true,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: 'CSE341@current',
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  })
  const { url } = await server.listen({ port: process.env.PORT || 4000 })
  console.log(`🚀 Server ready at ${url}`)
}

startApolloServer(typeDefs, resolvers)
