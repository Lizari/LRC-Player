import type { NextPage } from 'next';
import Header from '@/components/Common/Header';
import React, { useRef, useState } from 'react';
import { LRC } from '@/entity/LRC';
import axios, { AxiosError, AxiosResponse } from 'axios';
import LyricsDisplay from '@/components/Index/LyricsDisplay';
import { Box, Button, Stack, Typography } from '@mui/material';
import LyricsIcon from '@mui/icons-material/Lyrics';
import FilePresentIcon from '@mui/icons-material/FilePresent';

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
          </Stack>
        </Box>
      </Box>
      <input
        type={'file'}
        style={{ display: 'none' }}
        accept={'.lrc'}
        multiple={false}
        ref={lrcRef}
        onChange={(e) => {
          if (!e.target.files || !e.target.files[0]) return;
          const file: File = e.target.files[0];
          const data = new FormData();
          data.append('file', file);

          axios
            .post('http://localhost:8080/lrc', data)
            .then((res: AxiosResponse<LRC>) => {
              return res.data;
            })
            .then((success: LRC) => {
              setLRC(success);
            })
            .catch((e: AxiosError<{ error: string }>) => {
              console.error(e);
            });
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
