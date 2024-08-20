import mongoose from "mongoose";
import app from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

/* Connecting to the database and then starting the server. */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to database');
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });
