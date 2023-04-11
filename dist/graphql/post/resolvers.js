"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const api_1 = __importDefault(require("../api"));
exports.resolvers = {
    Query: {
        posts: async () => {
            const { data } = await api_1.default.get("/posts").catch((e) => {
                throw new Error(e.message);
            });
            return data;
        },
        post: async (_, { id }) => {
            const { data } = await api_1.default.get(`/post/${id}`).catch((e) => {
                throw new Error(e.message);
            });
            return data;
        },
    },
    Mutation: {
        post: async (_, { post }) => {
            const { data } = await api_1.default
                .post(`/posts`, Object.assign({}, post))
                .catch((e) => {
                throw new Error(e.message);
            });
            return data;
        },
    },
};
