import Song from "../models/song.model";
import { Request, Response } from "express";
import { TypedRequestBody, TypedRequestQuery } from "../types";
import { isValidMonth } from "../utils";

type TaylorSong  = {
    song: string,
    artist: string,
    writer: string,
    album: string,
    year: string
}

type QueryParams = {
    pn: string,
    ps: string
}

const getSong = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        if (song) {
            res.status(200).json(song);
        } else {
            res.status(404).json({ message: 'Invalid song ID'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getSongs = async (req: TypedRequestQuery<QueryParams>, res: Response) => {
    try {
        const { pn, ps } = req.query;
        let pageNum = 1;
        let pageSize = 10;

        if (pn && Number.isInteger(parseInt(pn))) {
            pageNum = parseInt(pn);
        }
        if (ps && Number.isInteger(parseInt(ps))) {
            pageSize = parseInt(ps);
        }

        const pageStart = (pageSize * (pageNum - 1));
        const songs = await Song.aggregate([{ $sort: { Song: 1}}, { $skip: pageStart }, { $limit: pageSize }]);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createSong = async (req: TypedRequestBody<TaylorSong>, res: Response) => {
    try {
        const { song, artist, writer, album, year } = req.body;
        if (song && artist && writer && album && Number.isInteger(parseInt(year))) {
            const newSong = {
                Song: song,
                Artist: artist,
                Writer: writer,
                Album: album,
                Year: parseInt(year),
                'Plays - June': 0,
                'Plays - July': 0,
                'Plays - August': 0,
            };
            const { _id: id } = await Song.create(newSong);
            res.status(201).json({ id: id.toString() });
        } else {
            res.status(404).json({ message: 'Missing or invalid form data'});
        }
    } catch (error) {
      res.status(500).json(error);
    }
};

const updateSong = async (req: TypedRequestBody<TaylorSong>, res: Response) => {
    try {
        const { id } = req.params;
        const { song, artist, writer, album, year } = req.body;
        if (song && artist && writer && album && Number.isInteger(parseInt(year))) {
            const updatedSong = {
                Song: song,
                Artist: artist,
                Writer: writer,
                Album: album,
                Year: parseInt(year),
            };
            const { _id: songId } = await Song.findByIdAndUpdate(id, updatedSong, { new: true });
            if (songId) {
                res.status(200).json({ id: songId.toString() });
            } else {
                res.status(404).json({ message: 'Invalid song ID'});
            }
        } else {
            res.status(404).json({ message: 'Missing or invalid form data'});
        }
    } catch (error) {
      res.status(500).json(error);
    }
};

const updatePlayCount = async (req: Request, res: Response) => {
    try {
        const { id, month } = req.params;
        if (isValidMonth(month)) {
            const { _id: songId } = await Song.findByIdAndUpdate(id, { $inc: {[`Plays - ${month}`]: 1 }}, { new: true });
            if (songId) {
                res.status(200).json({ id: songId.toString() });
            } else {
                res.status(404).json({ message: 'Invalid song ID'});
            }
        } else {
            res.status(404).json({ message: 'Invalid month'});
        }
    } catch(error) {
        res.status(500).json(error);
    }
}

const deleteSong = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedSong = await Song.findByIdAndDelete(id, { new: true });
        if (deletedSong) {
            res.status(204).json({});
        } else {
            res.status(404).json({ message: 'Invalid song ID'});
        }
    } catch (error) {
      res.status(500).json(error);
    }
};

export {
    getSongs,
    getSong,
    createSong,
    updateSong,
    updatePlayCount,
    deleteSong
};