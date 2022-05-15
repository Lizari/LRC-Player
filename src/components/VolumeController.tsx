import { Slider, Stack } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  audio: HTMLAudioElement | null;
};

const VolumeController: React.VFC<Props> = (props) => {
  const [volume, setVolume] = useState<number>(50);

  return (
    <Stack spacing={1} direction={'row'} alignItems={'center'} width={150}>
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
