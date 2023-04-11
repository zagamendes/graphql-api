"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const api_1 = __importDefault(require("../api"));
exports.resolvers = {
    Query: {
        users: async () => {
            const { data } = await api_1.default.get("/users");
            return data;
        },
        user: async (_, args) => {
            try {
                const { data } = await api_1.default.get(`/users/${args.id}`).catch((e) => {
                    console.log(e);
                    throw Error(e.message);
                });
                return data;
            }
            catch (e) {
                return e;
            }
        },
    },
};
