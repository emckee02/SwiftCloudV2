import express from 'express';
import SongRoutes from './routes/song.route';

const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Telling the server to use the routes in the SongRoutes file. */
app.use("/api/v1.0", SongRoutes);

export default app;