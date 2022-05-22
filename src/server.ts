import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import { document, variables } from './explorer'
import resolvers from './schema/resolvers'
import typeDefs from './schema/typedefs'
import { init } from './db/connect'

dotenv.config()
const port = process.env.PORT || 4000

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
            document,
            variables,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  })
  const { url } = await server.listen({ port })
  console.log(`🚀 Server ready at ${url}`)
}

init((err) => {
  if (err) {
    console.log(err)
  } else {
    startApolloServer(typeDefs, resolvers)
  }
})
