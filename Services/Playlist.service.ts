// PlaylistService.ts
import { ObjectId } from 'bson';
import { Playlist } from '../Repositories/Playlist.repository';
import { Track } from '../Repositories/Track.repository';
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
    if (!ObjectId.isValid(id)) {
      return;
    }

    try {
      return Playlist.findById(id);
    } catch (error) {
      console.log('Error at: getPlaylist ', error);
    }
  }

  async getMyPlaylist() {
    try {
      return Playlist.findOne({ author: 'me' });
    } catch (error) {
      console.log('Error at: getMyPlaylist ', error);
    }
  }

  async addTrackToMyPlaylist(trackId: string) {
    try {
      const myPlaylist = await Playlist.findOne({ author: 'me' });
      if (myPlaylist) {
        return this.addTrackToPlaylist(myPlaylist._id.toString(), trackId);
      }
    } catch (error) {
      console.log('Error at: getMyPlaylist ', error);
    }
  }

  async removeTrackFromMyPlaylist(trackId: string) {
    try {
      const myPlaylist = await Playlist.findOne({ author: 'me' });
      if (myPlaylist) {
        return this.removeTrackFromPlaylist(myPlaylist._id.toString(), trackId);
      }
    } catch (error) {
      console.log('Error at: getMyPlaylist ', error);
    }
  }

  async addTrackToPlaylist(playlistId: string, trackId: string) {
    const trackService = new TrackService();
    try {
      const playlist = await Playlist.findById(playlistId);
      const track = await trackService.getTrackById(trackId);

      if (!track || !playlist) return null;

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
    } catch (error) {
      console.log('Error at: addTrackToPlaylist ', error);
    }
  }

  async removeTrackFromPlaylist(playlistId: string, trackId: string) {
    const playlist = await Playlist.findById(playlistId);
    try {
      if (!playlist) {
        return null;
      }

      const trackIndex = playlist.tracks.findIndex((t) => t.id === trackId);
      if (trackIndex > -1) {
        const track = playlist.tracks.splice(trackIndex, 1)[0];
        playlist.totalDuration =
          playlist?.totalDuration && track?.duration
            ? playlist.totalDuration - track.duration
            : track.duration;
        return playlist.save();
      }
    } catch (error) {
      console.log('Error at: removeTrackFromPlaylist ', error);
    }
  }

  async createMyPlaylist() {
    try {
      const playlist = new Playlist({
        name: 'myPlaylist',
        author: 'me',
        totalDuration: 0,
        followerCount: 0,
        tracks: [],
      });

      return playlist.save();
    } catch (error) {
      console.log('Error at: createMyPlaylist ', error);
    }
  }

  async generateRandomPlaylist() {
    try {
      let trackPromises = [];
      let durationCount = 0;
      for (let i = 0; i < 10; i++) {
        const duration = Math.floor(Math.random() * 30000000);
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
