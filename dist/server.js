"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const PORT = process.env.PORT || 5000;
/* Connecting to the database and then starting the server. */
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Successfully connected to database');
    app_1.default.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map