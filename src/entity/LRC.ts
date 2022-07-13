export type LRC = {
  title: string;
  artist: string;
  album: string;
  language: string;
  length: string;
  lrc_creator: string;
  offset: number;
  lrc_editor: string;
  version: string;
  lyrics: { [key: number]: string }[];
};
