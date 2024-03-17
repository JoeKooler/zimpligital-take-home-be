// PlaylistRoutes.ts
import express from 'express';
import { TrackService } from '../Services/Track.service';

const router = express.Router();
const trackService = new TrackService();

router.get('/', async (req, res) => {
  const tracks = await trackService.getAllTracks();
  res.json(tracks);
});

router.get('/:id', async (req, res) => {
  const track = await trackService.getTrackById(req.params.id.toString());
  res.json(track);
});

export default router;
