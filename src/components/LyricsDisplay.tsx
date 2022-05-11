import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    <Box m={'auto'} width={'70%'}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        m={'auto'}
        bgcolor={'gray'}
        height={'40vh'}
      >
        <Typography textAlign={'center'} color={'white'} variant={'h5'}>
          {lyric}
        </Typography>
      </Box>
      <MusicPlayer lrc={props.lrc} audio={props.audio} setLyric={setLyric} />
    </Box>
  );
};

export default LyricsDisplay;
