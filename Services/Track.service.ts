import { Track } from '../Repositories/Playlist.repository';
import { Playlist as PlaylistType, Track as TrackType } from '../types';

export class TrackService {
  async getAllTracks() {
    try {
      return Track.find();
    } catch (error) {
      console.log('Error at: getTrackById ', error);
    }
  }

  async getTrackById(id: string) {
    try {
      return Track.findById(id);
    } catch (error) {
      console.log('Error at: getTrackById ', error);
    }
  }
}
