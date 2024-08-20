"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const song_controller_1 = require("../controllers/song.controller");
const router = express_1.default.Router();
/* Creating the routes for the song controller. */
router.get("/songs", song_controller_1.getSongs);
router.get("/songs/:id", song_controller_1.getSong);
router.post("/songs", song_controller_1.createSong);
router.put("/songs/:id", song_controller_1.updateSong);
router.put("/songs/:id/month/:month", song_controller_1.updatePlayCount);
router.delete("/songs/:id", song_controller_1.deleteSong);
exports.default = router;
//# sourceMappingURL=song.route.js.map