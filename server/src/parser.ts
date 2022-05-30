import * as fs from 'fs';

export class LRCParser {

    private readonly path: string;
    private readonly tagsMap: {[key: string]: string};
    private readonly lrc: {
        [key: string]: string | number | {[key: number]: string}[];
        lyrics: {[key: number]: string}[];
    };

    constructor(path: string) {
        this.path = path;
        this.tagsMap = {
            "ar": "artist",
            "al": "album",
            "ti": "title",
            "au": "lyrics_creator",
            "la": "language",
            "length": "length",
            "by": "lrc_creator",
            "offset": "offset",
            "re": "lrc_editor",
            "ve": "version",
        }
        this.lrc = {
            lyrics: []
        };
    }

    private getLines = (): string[] => {
        let result: string[] = [];

        try {
            const data: string = fs.readFileSync(this.path, {encoding: "utf-8"});
            result = data.split(/\r?\n/g);
        } catch (e) {
            console.error(e);
            process.exit(1);
        }

        return result;
    }

    private parseLines = (line: string) => {
        if (line === null) return;

        const tagPattern: RegExp = new RegExp(/\[(ar|al|ti|au|la|length|by|offset|re|ve)+:([\s\S]*)]/g);
        const lyricPattern: RegExp = new RegExp(/^\[([\d:.]*)]{1}([\s\S]*)/g);
        let execArray = tagPattern.exec(line);

        if (execArray !== null) {
            const tag: string = execArray[1];
            this.lrc[this.tagsMap[tag]] = execArray[2];

            return;
        }

        execArray = lyricPattern.exec(line);
        if (execArray !== null) {
            const time: number = this.convertTime(execArray[1]);
            const lyric: string = execArray[2];
            const obj: {[key: number]: string} = {};

            obj[time] = lyric;

            this.lrc.lyrics.push(obj);
        }
    }

    private convertTime = (timestamp: string): number => {
        const timeArray: string[] = timestamp.split(":");
        const secondArray: string[] = timeArray[1].split(".");

        const minute: number = parseInt(timeArray[0]) * 60 * 1000;
        const seconds = parseInt(secondArray[0]) * 1000;
        const milliseconds = parseInt(secondArray[1]);

        return minute + seconds + milliseconds;
    }

    parse = (): Promise<boolean> => {
        const lines: string[] = this.getLines();

        return new Promise<boolean>((resolve) => {
           lines.forEach((value, index, array) => {
               this.parseLines(value);

               if (index === array.length -1) resolve(true);
           });
        });
    }

    getLRC = () => {
        return this.lrc;
    }
}
