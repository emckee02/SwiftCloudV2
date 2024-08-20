import { Schema, model } from 'mongoose';

// Interface represeting song document in MongoDB
interface ISong{
    Song: string,
    Artist: string,
    Writer: string,
    Album: string,
    Year: number,
    'Plays - June': number,
    'Plays - July': number,
    'Plays - August': number
}

// Create schema corresponding to the document interface
const songSchema = new Schema<ISong>({
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
const Song = model<ISong>('Song', songSchema);

export default Song;