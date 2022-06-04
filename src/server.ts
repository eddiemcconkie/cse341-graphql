import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import express from 'express'
import { auth, ConfigParams } from 'express-openid-connect'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'

import resolvers from './schema/resolvers'
import typeDefs from './schema/typedefs'
import { init } from './db/connect'
import { document, variables } from './explorer'

dotenv.config()
const port = process.env.PORT || 4000

const auth0Config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:4000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  attemptSilentLogin: false,
}

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()
  const httpServer = http.createServer(app)

  app.use(cors({ origin: '*' }))
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Application-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
  })

  app.use(auth(auth0Config))

  app.get('/', (req, res) => {
    res.send(
      `
      ${
        req.oidc.isAuthenticated()
          ? `<h1>Logged in</h1><a href="/logout">Logout</a>`
          : `<h1>Logged out</h1><a href="/login">Login</a>`
      }
      <a href="/graphql">Apollo Explorer</a>
      <br />
      <button>Send data</button>
      <pre></pre>

      <script>
        const button = document.querySelector('button')
        const output = document.querySelector('pre')
        button.addEventListener('click', () => {
          fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: \`
                query Notes {
                  notes {
                    id
                    title
                    content
                    createdAt
                    tags 
                  }
                }
              \`
            }),
          })
            .then(res => res.json())
            .then(data => {
              output.innerHTML = '<h2>Output</h2>' + JSON.stringify(data, null, 2)
            })
        })
      </script>
    `
    )
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    introspection: true,
    context: async ({ req }) => {
      // if (!req.oidc.isAuthenticated())
      // throw new AuthenticationError('you must be logged in')

      return { user: req.oidc.user }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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

  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
  })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

init((err) => {
  if (err) {
    console.log(err)
  } else {
    startApolloServer(typeDefs, resolvers)
  }
})
