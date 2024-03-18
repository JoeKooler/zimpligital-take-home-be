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

const playlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  totalDuration: Number, // In a small scale this should be fine, no need to iterate and sum~
  followerCount: Number,
  tracks: [trackSchema],
});

export const Playlist = mongoose.model('Playlist', playlistSchema);
