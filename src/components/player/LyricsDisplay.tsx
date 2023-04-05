import React, { useEffect, useState } from 'react';
import { LRC } from '@/entity/LRC';
import { Box, Stack, Typography } from '@mui/material';
import MusicPlayer from '@/components/player/MusicPlayer';

type Props = {
  lrc: LRC | undefined;
  audio: File | undefined;
};

const LyricsDisplay: React.FC<Props> = ({ lrc, audio }) => {
  const [index, setIndex] = useState<number>(0);
  const [lyric, setLyric] = useState<string>('');
  const [lyrics, setLyrics] = useState<{ [key: number]: string }[]>([]);

  useEffect(() => {
    if (lrc) {
      setLyrics(getLyricsIndex(lrc.lyrics, index));
    }
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
          {lyrics.map((value, i) => {
            const currentLyric: string = Object.values(value)[0];
            const highlightIndex = index > 2 ? 2 : index;

            if (currentLyric === lyric && i === highlightIndex) {
              return (
                <Typography
                  m={'auto'}
                  textAlign={'center'}
                  fontWeight={700}
                  fontFamily={'Noto Sans JP, Arial'}
                  fontSize={'42px'}
                  color={'#e7eaf6'}
                  sx={{
                    opacity: 1,
                  }}
                >
                  {currentLyric}
                </Typography>
              );
            } else {
              return (
                <Typography
                  m={'auto'}
                  textAlign={'center'}
                  fontWeight={700}
                  fontFamily={'Noto Sans JP, Arial'}
                  fontSize={'42px'}
                  color={'#e7eaf6'}
                  sx={{
                    opacity: 0.4,
                  }}
                >
                  {currentLyric}
                </Typography>
              );
            }
          })}
        </Stack>
      </Box>
      <MusicPlayer
        lrc={lrc}
        audio={audio}
        setLyric={setLyric}
        setIndex={setIndex}
      />
    </Box>
  );
};

const getLyricsIndex = (lyrics: { [key: number]: string }[], index: number) => {
  return lyrics.length > 5 && index > 1
    ? lyrics.slice(index - 2, index + 3)
    : lyrics.slice(0, index == 1 ? index + 4 : index + 5);
};

export default LyricsDisplay;
