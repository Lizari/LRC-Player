import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Box } from '@mui/system';
import {
  ButtonGroup,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { getConvertedTime } from '@/util/NumberExtractor';

type Props = {
  audio: HTMLAudioElement | null;
  time: number;
  isPlaying: boolean;
  setTime: Dispatch<SetStateAction<number>>;
  toggleAudio: () => void;
};

const TimeIndicator: React.VFC<Props> = (props) => {
  return (
    <Box sx={{ mt: 2 }} width={'60%'} m={'auto'}>
      <Slider
        aria-label={'time-indicator'}
        size={'small'}
        disabled={props.audio === null}
        value={props.time}
        step={500}
        min={0}
        max={props.audio !== null ? props.audio.duration * 1000 : 0}
        onChange={(_, value) => {
          if (props.audio !== null)
            props.audio.currentTime = (value as number) / 1000;
          props.setTime(value as number);
        }}
      />
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography fontSize={'0.75rem'} letterSpacing={0.2}>
          {getConvertedTime(props.time)}
        </Typography>
        <Typography fontSize={'0.75rem'} letterSpacing={0.2}>
          {getConvertedTime(
            props.audio !== null ? props.audio.duration * 1000 : 0,
          )}
        </Typography>
      </Stack>
      <Stack sx={{ mb: 2 }} direction={'row'} justifyContent={'center'}>
        <IconButton
          disabled={props.audio === null}
          onClick={() => {
            if (props.audio !== null)
              props.audio.currentTime =
                props.time - 5000 < 0 ? props.time : props.time - 5000;
            props.setTime((time) => (time - 5000 < 0 ? 0 : time - 5000));
          }}
        >
          <FastRewindIcon />
        </IconButton>
        <IconButton
          disabled={props.audio === null}
          onClick={() => props.toggleAudio()}
        >
          {props.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton
          disabled={props.audio === null}
          onClick={() => {
            if (props.audio !== null)
              props.audio.currentTime = props.time + 5000;
            props.setTime((time) => time + 5000);
          }}
        >
          <FastForwardIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default TimeIndicator;
