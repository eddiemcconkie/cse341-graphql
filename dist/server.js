"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const resolvers_1 = __importDefault(require("./schema/resolvers"));
const typedefs_1 = __importDefault(require("./schema/typedefs"));
const connect_1 = require("./db/connect");
const explorer_1 = require("./explorer");
dotenv_1.default.config();
const port = process.env.PORT || 4000;
const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:4000',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    attemptSilentLogin: false,
};
const startApolloServer = (typeDefs, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.setHeader('Application-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next();
    });
    app.use((0, express_openid_connect_1.auth)(auth0Config));
    app.get('/', (req, res) => {
        res.send(`
      ${req.oidc.isAuthenticated()
            ? `<h1>Logged in</h1><a href="/logout">Logout</a>`
            : `<h1>Logged out</h1><a href="/login">Login</a>`}
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
    `);
    });
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        introspection: true,
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            // if (!req.oidc.isAuthenticated())
            // throw new AuthenticationError('you must be logged in')
            return { user: req.oidc.user };
        }),
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            process.env.NODE_ENV === 'production'
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)({
                    graphRef: 'CSE341@current',
                    footer: false,
                    document: explorer_1.document,
                    variables: explorer_1.variables,
                })
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false }),
        ],
    });
    yield server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
    });
    yield new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
(0, connect_1.init)((err) => {
    if (err) {
        console.log(err);
    }
    else {
        startApolloServer(typedefs_1.default, resolvers_1.default);
    }
});
//# sourceMappingURL=server.js.map