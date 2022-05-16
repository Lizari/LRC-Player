import React, { useState } from 'react';
import { LRC } from '@/entity/LRC';
import { Box, Typography } from '@mui/material';
import MusicPlayer from '@/components/MusicPlayer';

type Props = {
  lrc: LRC | undefined;
  audio: File | undefined;
};

const LyricsDisplay: React.VFC<Props> = (props) => {
  const [lyric, setLyric] = useState<string>('');

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box
        display={'flex'}
        mt={15}
        bgcolor={'gray'}
        height={'50vh'}
        width={'70%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          textAlign={'center'}
          fontWeight={'light'}
          fontSize={'42px'}
          color={'#e7eaf6'}
        >
          {lyric}
        </Typography>
      </Box>
      <MusicPlayer lrc={props.lrc} audio={props.audio} setLyric={setLyric} />
    </Box>
  );
};

export default LyricsDisplay;
