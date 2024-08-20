"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create schema corresponding to the document interface
const songSchema = new mongoose_1.Schema({
    Song: { type: String, required: true },
    Artist: { type: String, required: true },
    Writer: { type: String, required: true },
    Album: { type: String, required: true },
    Year: { type: Number, required: true },
    'Plays - June': { type: Number, required: true },
    'Plays - July': { type: Number, required: true },
    'Plays - August': { type: Number, required: true },
}, {
    versionKey: false
});
// Create a Model
const Song = (0, mongoose_1.model)('Song', songSchema);
exports.default = Song;
//# sourceMappingURL=song.model.js.map