export type LRC = {
  [key: string]: string | number | Array<{ [key: number]: string }>;
  title: string;
  lyrics: Array<{ [key: number]: string }>;
};
