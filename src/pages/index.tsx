import type { NextPage } from 'next';
import Header from '@/components/Common/Header';
import React, { useRef, useState } from 'react';
import { LRC } from '@/entity/LRC';
import LyricsDisplay from '@/components/Index/LyricsDisplay';
import { Box, Button, Stack, Typography } from '@mui/material';
import LyricsIcon from '@mui/icons-material/Lyrics';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { LRCParser } from '@/util/parser';
import { parse } from 'path';

const Home: NextPage = () => {
  const [lrc, setLRC] = useState<LRC>();
  const [audio, setAudio] = useState<File>();
  const lrcRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);

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
        {lrc !== undefined ? (
          <Typography
            fontSize={'x-large'}
            color={'#e7eaf6'}
            fontWeight={700}
            fontFamily={'Noto Sans JP, Arial'}
          >
            {lrc.title}
          </Typography>
        ) : (
          ''
        )}
        <Box>
          <Stack direction={'row'} spacing={4}>
            <Button
              size={'large'}
              variant={'text'}
              startIcon={<LyricsIcon />}
              sx={{
                color: 'gray',
                '&:hover': {
                  color: '#FFFFFF',
                },
              }}
              onClick={() => {
                if (
                  lrcRef.current !== null &&
                  lrcRef.current.files?.length !== 0
                )
                  lrcRef.current.value = '';
                lrcRef.current?.click();
              }}
            >
              LRC File
            </Button>
            <Button
              size={'large'}
              variant={'text'}
              startIcon={<FilePresentIcon />}
              sx={{
                color: 'gray',
                '&:hover': {
                  color: '#FFFFFF',
                },
              }}
              onClick={() => {
                if (
                  audioRef.current !== null &&
                  audioRef.current.files?.length !== 0
                )
                  audioRef.current.value = '';
                audioRef.current?.click();
              }}
            >
              Audio File
            </Button>
            <Button
              size={'large'}
              variant={'text'}
              sx={{
                color: 'gray',
                '&:hover': {
                  color: '#FFFFFF',
                },
              }}
              onClick={async () => {
                const lrc_file_text = await fetch('/After The Rain.lrc').then(
                  (response) => response.text(),
                );
                const parser = new LRCParser(lrc_file_text);

                parser.parse().then(() => setLRC(parser.getLRC()));

                fetch('/After The Rain.wav')
                  .then((response) => response.blob())
                  .then((blob) => new File([blob], 'After The Rain.wav'))
                  .then((file) => setAudio(file));
              }}
            >
              Sample
            </Button>
          </Stack>
        </Box>
      </Box>
      <input
        type={'file'}
        style={{ display: 'none' }}
        accept={'.lrc'}
        multiple={false}
        ref={lrcRef}
        onChange={async (e) => {
          if (!e.target.files || !e.target.files[0]) return;
          const file: File = e.target.files[0];
          const parser = new LRCParser(await file.text());

          parser.parse().then(() => setLRC(parser.getLRC()));
        }}
      />
      <input
        type={'file'}
        style={{ display: 'none' }}
        multiple={false}
        accept={'.mp3, .m4a'}
        ref={audioRef}
        onChange={(e) => {
          if (!e.target.files || !e.target.files[0]) return;
          const file: File = e.target.files[0];

          setAudio(file);
        }}
      />
    </Box>
  );
};

export default Home;
