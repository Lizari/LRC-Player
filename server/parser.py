import json
import re


class LRCParser:
    def __init__(self, path: str) -> None:
        self.path = path
        self.tags = {}
        self.lyrics = []
        self.tagsMap = {
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

    def __get_lines(self) -> list[str]:
        with open(self.path, "r", encoding="utf-8") as file:
            return file.read().splitlines()

    def __init_lines(self, line: str):
        pattern = r"\[(ar|al|ti|au|la|length|by|offset|re|ve)+:([\s\S]*)\]"
        repatter = re.compile(pattern)
        result = repatter.match(line)

        if result:
            tag = result.group(1)
            value = result.group(2)

            if tag == "offset":
                value = int(value)

            self.tags[self.tagsMap[tag]] = value
        else:
            pattern = r"^\[([\d:.]*)\]{1}([\s\S]*)"
            repatter = re.compile(pattern)
            result = repatter.match(line)

            if result:
                time = result.group(1)
                lyric = result.group(2)

                self.lyrics.append({self.__convertTime(time): lyric})

    def __convertTime(self, timestamp: str) -> int:
        timeArray = timestamp.split(":")
        secondArray = timeArray[1].split(".")

        minutes = int(timeArray[0]) * 60 * 1000
        seconds = int(secondArray[0]) * 1000
        miliseconds = int(secondArray[1])

        return minutes + seconds + miliseconds

    def parse(self, output=False, path="./output.json") -> dict:
        lines = self.__get_lines()

        for line in lines:
            self.__init_lines(line)

        self.tags["lyrics"] = self.lyrics

        if output:
            with open(path, "w", encoding="utf-8") as file:
                json.dump(self.tags, file, indent=4, ensure_ascii=False)

        return self.tags
