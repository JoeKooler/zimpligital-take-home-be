// server.ts
import express from 'express';
import myPlaylistRoutes from './Routes/MyPlaylist.route';
import playlistRoutes from './Routes/Playlist.route';
import trackRoutes from './Routes/Track.route';
import mongoose from 'mongoose';
import { PlaylistService } from './Services/Playlist.service';
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://mongo:27017/zimpli-playlist')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/myPlaylist', myPlaylistRoutes);
app.use('/playlists', playlistRoutes);
app.use('/tracks', trackRoutes);

app.listen(3000, () => {
  // Mock some datas
  const playlistService = new PlaylistService();
  playlistService.generateRandomPlaylist();
  playlistService.createMyPlaylist();
  console.log('Server is running on port 3000');
});
