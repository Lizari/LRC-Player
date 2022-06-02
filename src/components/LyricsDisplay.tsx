import React, { useEffect, useState } from 'react';
import { LRC } from '@/entity/LRC';
import { Box, Stack, Typography } from '@mui/material';
import MusicPlayer from '@/components/MusicPlayer';

type Props = {
  lrc: LRC | undefined;
  audio: File | undefined;
};

const LyricsDisplay: React.VFC<Props> = (props) => {
  const [index, setIndex] = useState<number>(0);
  const [lyric, setLyric] = useState<string>('');
  const [lyrics, setLyrics] = useState<{ [key: number]: string }[]>([]);

  useEffect(() => {
    if (props.lrc) setLyrics(getLyricsIndex(props.lrc.lyrics, index));
    console.log(props.lrc?.lyrics);
  }, [lyric]);

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box
        mt={10}
        bgcolor={'gray'}
        height={'50vh'}
        width={'70%'}
        overflow={'hidden'}
      >
        <Stack spacing={1} mt={9}>
          {lyrics.map((value, i, array) => {
            if (Object.values(value)[0] == lyric) {
              return (
                <LyricText
                  key={i}
                  lyric={Object.values(value)[0]}
                  opacity={1}
                />
              );
            } else {
              return (
                <LyricText
                  key={i}
                  lyric={Object.values(value)[0]}
                  opacity={0.4}
                />
              );
            }
          })}
        </Stack>
      </Box>
      <MusicPlayer
        lrc={props.lrc}
        audio={props.audio}
        setLyric={setLyric}
        setIndex={setIndex}
      />
    </Box>
  );
};

const LyricText: React.VFC<{ lyric: string; opacity: number }> = (props) => {
  return (
    <Typography
      m={'auto'}
      textAlign={'center'}
      fontWeight={700}
      fontFamily={'Noto Sans JP, Arial'}
      fontSize={'42px'}
      color={'#e7eaf6'}
      sx={{
        opacity: props.opacity,
      }}
    >
      {props.lyric}
    </Typography>
  );
};

const getLyricsIndex = (array: { [key: number]: string }[], index: number) => {
  return array.length > 5 && index > 3
    ? array.slice(index - 2, index + 3)
    : array.slice(0, index + 2);
};

export default LyricsDisplay;
