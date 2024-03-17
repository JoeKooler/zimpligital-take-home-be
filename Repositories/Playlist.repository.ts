// PlaylistRepository.ts
import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  album: String,
  artist: String,
  releaseDate: Date,
  coverImgSrc: String,
});

export const Track = mongoose.model('Track', trackSchema);

const playlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  totalDuration: Number,
  followerCount: Number,
  tracks: [trackSchema],
});

export const Playlist = mongoose.model('Playlist', playlistSchema);
