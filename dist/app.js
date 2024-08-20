"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const song_route_1 = __importDefault(require("./routes/song.route"));
const app = (0, express_1.default)();
/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/* Telling the server to use the routes in the SongRoutes file. */
app.use("/api/v1.0", song_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map