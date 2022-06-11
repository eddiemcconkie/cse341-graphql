import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import express from 'express'
import { auth, ConfigParams } from 'express-openid-connect'
import jwt_decode, { JwtPayload } from 'jwt-decode'
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
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientSecret: process.env.SECRET,
  authorizationParams: {
    response_type: 'code',
    audience: 'https://apollo-server-api/',
    scope: 'openid',
  },
}

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()
  const httpServer = http.createServer(app)

  app.use(cors())

  app.use(auth(auth0Config))

  app.set('view engine', 'ejs')

  app.get('/home', (req, res) => {
    res.render('index', {
      accessToken: req.oidc.accessToken?.access_token ?? '',
    })
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    introspection: true,
    context: async ({ req }) => {
      if (req.oidc.user) return { uid: req.oidc.user.sub }

      try {
        const token: JwtPayload = jwt_decode(req.headers.authorization)
        if (token.sub) return { uid: token.sub }
      } catch (error) {
        throw new AuthenticationError('you must be logged in')
      }
      return { uid: '' }
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
    path: '/',
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
