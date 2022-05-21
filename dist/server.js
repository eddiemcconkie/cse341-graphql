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
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = __importDefault(require("./schema/resolvers"));
const typedefs_1 = __importDefault(require("./schema/typedefs"));
const startApolloServer = (typeDefs, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_1.ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        introspection: true,
        plugins: [
            process.env.NODE_ENV === 'production'
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)({
                    graphRef: 'CSE341@current',
                    footer: false,
                })
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false }),
        ],
    });
    const { url } = yield server.listen({ port: process.env.PORT || 4000 });
    console.log(`🚀 Server ready at ${url}`);
});
startApolloServer(typedefs_1.default, resolvers_1.default);
//# sourceMappingURL=server.js.map