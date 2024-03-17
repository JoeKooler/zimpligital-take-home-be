// types.ts
export type Track = {
  title: string;
  duration: number;
  album: string;
  artist: string;
  releaseDate: Date;
  coverImgSrc?: string;
};

export type Playlist = {
  name: string;
  description?: string;
  author: string;
  totalDuration: number;
  followerCount: number;
  tracks: Track[];
};
