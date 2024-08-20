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
exports.deleteSong = exports.updatePlayCount = exports.updateSong = exports.createSong = exports.getSong = exports.getSongs = void 0;
const song_model_1 = __importDefault(require("../models/song.model"));
const utils_1 = require("../utils");
const getSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const song = yield song_model_1.default.findById(id);
        if (song) {
            res.status(200).json(song);
        }
        else {
            res.status(404).json({ message: 'Invalid song ID' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getSong = getSong;
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const songs = yield song_model_1.default.aggregate([{ $sort: { Song: 1 } }, { $skip: pageStart }, { $limit: pageSize }]);
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getSongs = getSongs;
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const { _id: id } = yield song_model_1.default.create(newSong);
            res.status(201).json({ id: id.toString() });
        }
        else {
            res.status(404).json({ message: 'Missing or invalid form data' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createSong = createSong;
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const { _id: songId } = yield song_model_1.default.findByIdAndUpdate(id, updatedSong, { new: true });
            if (songId) {
                res.status(200).json({ id: songId.toString() });
            }
            else {
                res.status(404).json({ message: 'Invalid song ID' });
            }
        }
        else {
            res.status(404).json({ message: 'Missing or invalid form data' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateSong = updateSong;
const updatePlayCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, month } = req.params;
        if ((0, utils_1.isValidMonth)(month)) {
            const { _id: songId } = yield song_model_1.default.findByIdAndUpdate(id, { $inc: { [`Plays - ${month}`]: 1 } }, { new: true });
            if (songId) {
                res.status(200).json({ id: songId.toString() });
            }
            else {
                res.status(404).json({ message: 'Invalid song ID' });
            }
        }
        else {
            res.status(404).json({ message: 'Invalid month' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updatePlayCount = updatePlayCount;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedSong = yield song_model_1.default.findByIdAndDelete(id, { new: true });
        if (deletedSong) {
            res.status(204).json({});
        }
        else {
            res.status(404).json({ message: 'Invalid song ID' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteSong = deleteSong;
//# sourceMappingURL=song.controller.js.map