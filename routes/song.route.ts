import express from 'express';
import { 
    getSong, 
    getSongs, 
    createSong, 
    updateSong, 
    updatePlayCount,
    deleteSong 
} from '../controllers/song.controller';

const router = express.Router();

/* Creating the routes for the song controller. */
router.get("/songs", getSongs);

router.get("/songs/:id", getSong);

router.post("/songs", createSong);

router.put("/songs/:id", updateSong);

router.put("/songs/:id/month/:month", updatePlayCount);

router.delete("/songs/:id", deleteSong);

export default router;