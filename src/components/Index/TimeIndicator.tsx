import React, { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/system';
import { IconButton, Slider, Stack, Typography } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { formatTime } from '@/util/NumberExtractor';

type Props = {
  audio: HTMLAudioElement | null;
  time: number;
  isPlaying: boolean;
  setTime: Dispatch<SetStateAction<number>>;
  toggleAudio: () => void;
};

const TimeIndicator: React.VFC<Props> = (props) => {
  return (
    <Box width={500}>
      <Stack direction={'row'} justifyContent={'center'}>
        <IconButton
          disabled={props.audio === null}
          onClick={() => {
            if (props.audio !== null)
              props.audio.currentTime =
                props.audio.currentTime - 5.0 < 0
                  ? props.audio.currentTime
                  : props.audio.currentTime - 5.0;
          }}
        >
          <FastRewindIcon sx={{ color: '#e7eaf6' }} />
        </IconButton>
        <IconButton
          disabled={props.audio === null}
          onClick={() => props.toggleAudio()}
        >
          {props.isPlaying ? (
            <PauseIcon sx={{ color: '#e7eaf6' }} />
          ) : (
            <PlayArrowIcon sx={{ color: '#e7eaf6' }} />
          )}
        </IconButton>
        <IconButton
          disabled={props.audio === null}
          onClick={() => {
            if (props.audio !== null)
              props.audio.currentTime = props.audio.currentTime + 5.0;
          }}
        >
          <FastForwardIcon sx={{ color: '#e7eaf6' }} />
        </IconButton>
      </Stack>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography fontSize={'0.75rem'} color={'#e7eaf6'} letterSpacing={0.2}>
          {formatTime(props.time)}
        </Typography>
        <Slider
          aria-label={'time-indicator'}
          size={'small'}
          color={'primary'}
          disabled={props.audio === null}
          value={props.time}
          step={500}
          min={0}
          max={
            props.audio !== null && !isNaN(props.audio?.duration)
              ? props.audio.duration * 1000
              : 0
          }
          onChange={(_, value) => {
            if (props.audio !== null)
              props.audio.currentTime = (value as number) / 1000;
            props.setTime(value as number);
          }}
        />
        <Typography fontSize={'0.75rem'} color={'#e7eaf6'} letterSpacing={0.2}>
          {formatTime(props.audio !== null ? props.audio.duration * 1000 : 0)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TimeIndicator;
