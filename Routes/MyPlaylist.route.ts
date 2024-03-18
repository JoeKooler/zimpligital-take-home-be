import express from 'express';
import { PlaylistService } from '../Services/Playlist.service';

const router = express.Router();
const playlistService = new PlaylistService();

router.get('/', async (req, res) => {
  const playlist = await playlistService.getMyPlaylist();
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist not found');
  }
});

router.post('/saveTrackToMyPlaylist', async (req, res) => {
  const { trackId } = req.body;
  const playlist = await playlistService.addTrackToMyPlaylist(trackId);
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist not found');
  }
});

router.post('/removeTrackFromMyPlaylist', async (req, res) => {
  const { trackId } = req.body;
  const playlist = await playlistService.removeTrackFromMyPlaylist(trackId);
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist or track not found');
  }
});

export default router;
