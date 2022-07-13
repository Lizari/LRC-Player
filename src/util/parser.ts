import { LRC } from '@/entity/LRC';
import { breakpoints } from '@mui/system';
import { exec } from 'child_process';
import * as fs from 'fs';
import { runInThisContext } from 'vm';

export class LRCParser {
  private readonly context: string;
  private readonly tagsMap: { [key: string]: string };
  private readonly lrc: LRC;

  constructor(context: string) {
    this.context = context;
    this.tagsMap = {
      ar: 'artist',
      al: 'album',
      ti: 'title',
      au: 'lyrics_creator',
      la: 'language',
      length: 'length',
      by: 'lrc_creator',
      offset: 'offset',
      re: 'lrc_editor',
      ve: 'version',
    };
    this.lrc = {
      title: '',
      artist: '',
      album: '',
      language: '',
      length: '',
      lrc_creator: '',
      offset: 0,
      lrc_editor: '',
      version: '',
      lyrics: [],
    };
  }

  private getLines = (): string[] => {
    let result: string[] = [];

    try {
      result = this.context.split(/\r?\n/g);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    return result;
  };

  private parseLines = (line: string) => {
    if (line === null) return;

    const tagPattern: RegExp = new RegExp(
      /\[(ar|al|ti|au|la|length|by|offset|re|ve)+:([\s\S]*)]/g,
    );
    const lyricPattern: RegExp = new RegExp(/^\[([\d:.]*)]{1}([\s\S]*)/g);
    let execArray = tagPattern.exec(line);

    if (execArray !== null) {
      switch (this.tagsMap[execArray[1]]) {
        case 'artist':
          this.lrc.artist = execArray[2];
          break;
        case 'album':
          this.lrc.album = execArray[2];
          break;
        case 'title':
          this.lrc.title = execArray[2];
          break;
        case 'lyrics_creator':
          this.lrc.lrc_creator = execArray[2];
          break;
        case 'language':
          this.lrc.language = execArray[2];
          break;
        case 'length':
          this.lrc.length = execArray[2];
          break;
        case 'by':
          this.lrc.lrc_creator = execArray[2];
          break;
        case 'offset':
          this.lrc.offset = Number.parseInt(execArray[2]);
          break;
        case 'lrc_editor':
          this.lrc.lrc_editor = execArray[2];
          break;
        case 'version':
          this.lrc.version = execArray[2];
          break;
        default:
          break;
      }
      return;
    }

    execArray = lyricPattern.exec(line);
    if (execArray !== null) {
      const time: number = this.convertTime(execArray[1]);
      const lyric: string = execArray[2] ? execArray[2] : '♪～';
      const obj: { [key: number]: string } = {};

      obj[time] = lyric;

      this.lrc.lyrics.push(obj);
    }
  };

  private convertTime = (timestamp: string): number => {
    const timeArray: string[] = timestamp.split(':');
    const secondArray: string[] = timeArray[1].split('.');

    const minute: number = parseInt(timeArray[0]) * 60 * 1000;
    const seconds = parseInt(secondArray[0]) * 1000;
    const milliseconds = parseInt(secondArray[1]);

    return minute + seconds + milliseconds;
  };

  parse = (): Promise<boolean> => {
    const lines: string[] = this.getLines();

    return new Promise<boolean>((resolve) => {
      lines.forEach((value, index, array) => {
        this.parseLines(value);

        if (index === array.length - 1) resolve(true);
      });
    });
  };

  getLRC = () => {
    return this.lrc;
  };
}
