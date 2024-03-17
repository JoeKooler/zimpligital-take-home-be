// PlaylistRoutes.ts
import express from 'express';
import { PlaylistService } from '../Services/Playlist.service';

const router = express.Router();
const playlistService = new PlaylistService();

router.get('/', async (req, res) => {
  const playlists = await playlistService.getAllPlaylists();
  res.json(playlists);
});

router.get('/:id', async (req, res) => {
  const playlist = await playlistService.getPlaylist(req.params.id.toString());
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist not found');
  }
});

router.post('/saveTrackToPlaylist', async (req, res) => {
  const { playlistId, trackId } = req.body;
  const playlist = await playlistService.addTrackToPlaylist(
    playlistId,
    trackId
  );
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist not found');
  }
});

router.post('/removeTrackFromPlaylist', async (req, res) => {
  const { playlistId, trackId } = req.body;
  const playlist = await playlistService.removeTrackFromPlaylist(
    playlistId,
    trackId
  );
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist or track not found');
  }
});

router.post('/generateRandomPlaylist', async (req, res) => {
  const playlist = await playlistService.generateRandomPlaylist();
  res.json(playlist);
});

export default router;
