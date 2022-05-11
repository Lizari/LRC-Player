import { Slider, Stack } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  audio: HTMLAudioElement | null;
};

const VolumeController: React.VFC<Props> = (props) => {
  const [volume, setVolume] = useState<number>(50);

  return (
    <Stack
      sx={{ mb: 2 }}
      spacing={2}
      m={'auto'}
      width={'40%'}
      direction={'row'}
      alignItems={'center'}
    >
      <VolumeDown />
      <Slider
        disabled={props.audio === null}
        size={'small'}
        value={volume}
        max={100}
        min={0}
        step={1}
        aria-label={'volume-controller'}
        onChange={(_, value) => {
          setVolume(value as number);
          if (props.audio !== null)
            props.audio.volume = (value as number) / 100;
        }}
      />
      <VolumeUp />
    </Stack>
  );
};

export default VolumeController;
