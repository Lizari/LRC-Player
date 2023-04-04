import { Slider, Stack } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import React, { useState } from 'react';

type Props = {
  audio: HTMLAudioElement | null;
};

const VolumeController: React.FC<Props> = (props) => {
  const [volume, setVolume] = useState<number>(50);

  return (
    <Stack
      position={'absolute'}
      right={0}
      top={'20px'}
      spacing={1}
      mr={'1rem'}
      direction={'row'}
      alignItems={'center'}
      width={150}
    >
      <VolumeUp sx={{ color: '#e7eaf6' }} />
      <Slider
        aria-label={'volume-controller'}
        disabled={props.audio === null}
        size={'small'}
        value={volume}
        max={100}
        min={0}
        step={1}
        onChange={(_, value) => {
          setVolume(value as number);
          if (props.audio !== null)
            props.audio.volume = (value as number) / 100;
        }}
      />
    </Stack>
  );
};

export default VolumeController;
