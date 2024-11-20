import { Genres, Positions, Vibes } from "./const";

export type YYYYMMDD =
  `${string}${string}${string}${string}-${string}${string}-${string}${string}`;
export type HHMM = `${string}${string}:${string}${string}`;
export type Length = `${string}${string}:${string}${string}`;
export class Artist {
  constructor(
    public displayName: string,
    public positions: Position[],
    public sns: string,
    public description: string,
    public email: string,
    public photoURL?: string,
    public verified?: boolean,
    public uid?: string
  ) {
    this.displayName = displayName;
    this.positions = positions;
    this.sns = sns;
    this.description = description;
    this.uid = uid;
    this.email = email;
    this.photoURL = photoURL;
  }
}
export interface ArtistForm {
  displayName: string;
  positions: string[];
  sns: string;
  description: string;
  photoURL?: string;
}
export abstract class SongSuper {
  title: string = "";
  audioURL: string = "";
  photoURL: string = "";
  description: string = "";
  songId: string = "";
  uid: string = "";
  length: Length = "00:00";
  genres: Genre[] = [];
  vibes: Vibe[] = [];
  currentPrice: number = 0;
  buyPrice: number = 0;
  expireDate: YYYYMMDD = "0000-00-00";
  expireTime: HHMM = "00:00";
  createdAt?: Date;
}

export type Position = (typeof Positions)[number];
export type Genre = (typeof Genres)[number];
export type Vibe = (typeof Vibes)[number];
