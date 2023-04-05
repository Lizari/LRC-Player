import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import React, { useRef, useState } from 'react';
import { LRC } from '@/entity/LRC';
import LyricsDisplay from '@/components/player/LyricsDisplay';
import { Box, Stack, Typography } from '@mui/material';
import { LRCParser } from '@/util/parser';
import LRCFileInputButton from '@/components/input/LRCFileInputButton';
import AudioFileInputButton from '@/components/input/AudioFileInputButton';
import SampleButton from '@/components/input/SampleButton';

const Home: NextPage = () => {
  const [lrc, setLRC] = useState<LRC>();
  const [audio, setAudio] = useState<File>();
  const lrcRef = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <Header />
      <LyricsDisplay lrc={lrc} audio={audio} />
      <Box
        pt={3}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {lrc && (
          <Typography
            fontSize={'x-large'}
            color={'#e7eaf6'}
            fontWeight={700}
            fontFamily={'Noto Sans JP, Arial'}
          >
            {lrc.title}
          </Typography>
        )}
        <Box>
          <Stack direction={'row'} spacing={4}>
            <LRCFileInputButton
              ref={lrcRef}
              inputElementProps={{
                onChange: async (e) => {
                  if (!e.target.files || !e.target.files[0]) return;
                  const file: File = e.target.files[0];
                  const parser = new LRCParser(await file.text());

                  parser.parse().then(() => setLRC(parser.getLRC()));
                },
              }}
            />
            <AudioFileInputButton
              inputElementProps={{
                onChange: (e) => {
                  if (!e.target.files || !e.target.files[0]) return;
                  const file: File = e.target.files[0];

                  setAudio(file);
                },
              }}
            />
            <SampleButton setLRC={setLRC} setAudio={setAudio} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
