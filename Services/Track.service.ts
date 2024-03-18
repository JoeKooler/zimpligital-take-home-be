import { Track } from '../Repositories/Track.repository';

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
