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
const jwt_decode_1 = __importDefault(require("jwt-decode"));
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
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    clientSecret: process.env.SECRET,
    authorizationParams: {
        response_type: 'code',
        audience: 'https://apollo-server-api/',
        scope: 'openid',
    },
};
const startApolloServer = (typeDefs, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, cors_1.default)());
    app.use((0, express_openid_connect_1.auth)(auth0Config));
    app.set('view engine', 'ejs');
    app.get('/home', (req, res) => {
        var _a, _b;
        res.render('index', {
            accessToken: (_b = (_a = req.oidc.accessToken) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : '',
        });
    });
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        introspection: true,
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            if (req.oidc.user)
                return { uid: req.oidc.user.sub };
            try {
                const token = (0, jwt_decode_1.default)(req.headers.authorization);
                if (token.sub)
                    return { uid: token.sub };
            }
            catch (error) {
                throw new apollo_server_express_1.AuthenticationError('you must be logged in');
            }
            return { uid: '' };
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
        path: '/',
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