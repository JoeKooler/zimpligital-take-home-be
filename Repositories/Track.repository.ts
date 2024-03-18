import mongoose from 'mongoose';

export const trackSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  album: String,
  artist: String,
  releaseDate: Date,
  coverImgSrc: String,
});

export const Track = mongoose.model('Track', trackSchema);
