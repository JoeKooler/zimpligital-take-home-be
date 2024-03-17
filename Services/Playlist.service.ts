// PlaylistService.ts
import { Playlist, Track } from '../Repositories/Playlist.repository';
import { Playlist as PlaylistType, Track as TrackType } from '../types';
import { TrackService } from './Track.service';

export class PlaylistService {
  async getAllPlaylists() {
    try {
      return Playlist.find();
    } catch (error) {
      console.log('Error at: getAllPlaylists ', error);
    }
  }

  async getPlaylist(id: string) {
    try {
      return Playlist.findById(id);
    } catch (error) {
      console.log('Error at: getPlaylist ', error);
    }
  }

  async addTrackToPlaylist(playlistId: string, trackId: string) {
    const trackService = new TrackService();
    try {
      const playlist = await Playlist.findById(playlistId);
      const track = await trackService.getTrackById(trackId);

      if (!track) return null;

      if (playlist) {
        // Check if the track already exists in the playlist
        const trackExists = playlist.tracks.some((t) => t.id === track.id);
        if (trackExists) {
          console.log('Track already exists in the playlist');
          return null;
        }

        playlist.tracks.push(track);
        playlist.totalDuration =
          playlist?.totalDuration && track?.duration
            ? playlist.totalDuration + track.duration
            : track.duration;
        return playlist.save();
      }
      return null;
    } catch (error) {
      console.log('Error at: addTrackToPlaylist ', error);
    }
  }

  async removeTrackFromPlaylist(playlistId: string, trackId: string) {
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      const trackIndex = playlist.tracks.findIndex((t) => t.id === trackId);
      if (trackIndex > -1) {
        const track = playlist.tracks.splice(trackIndex, 1)[0];
        playlist.totalDuration =
          playlist?.totalDuration && track?.duration
            ? playlist.totalDuration - track.duration
            : track.duration;
        return playlist.save();
      }
    }
    return null;
  }

  async generateRandomPlaylist() {
    try {
      let trackPromises = [];
      let durationCount = 0;
      for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        const duration = Math.floor(Math.random() * 300);
        durationCount += duration;
        const track = new Track({
          id: Math.random().toString(36).substring(7),
          title: `Track ${Math.random().toString(36).substring(7)}`,
          duration: duration,
          album: `Album ${Math.random().toString(36).substring(7)}`,
          artist: `Artist ${Math.random().toString(36).substring(7)}`,
          releaseDate: new Date(),
        });
        trackPromises.push(track.save());
      }

      const tracks = await Promise.all(trackPromises);

      const playlist = new Playlist({
        id: Math.random().toString(36).substring(7),
        name: `Playlist ${Math.random().toString(36).substring(7)}`,
        author: `Author ${Math.random().toString(36).substring(7)}`,
        totalDuration: durationCount,
        followerCount: Math.floor(Math.random() * 1000),
        tracks: tracks,
      });

      return playlist.save();
    } catch (error) {
      console.log('Error at: generateRandomPlaylist ', error);
    }
  }
}
