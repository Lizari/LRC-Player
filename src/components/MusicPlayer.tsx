import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LRC } from '@/entity/LRC';
import VolumeController from '@/components/VolumeController';
import TimeIndicator from '@/components/TimeIndicator';
import { getClosestNumber } from '@/util/NumberExtractor';

type Props = {
  lrc: LRC | undefined;
  audio: File | undefined;
  setLyric: Dispatch<SetStateAction<string>>;
};

const MusicPlayer: React.VFC<Props> = (props) => {
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current !== null && props.audio)
      audioRef.current.src = URL.createObjectURL(props.audio);
  }, [props.audio]);

  useEffect(() => {
    if (props.lrc !== undefined) {
      const nearKey: string = String(
        getClosestNumber(
          time,
          props.lrc.lyrics
            .map((data) => Object.keys(data)[0])
            .map((str) => parseInt(str, 10)),
        ),
      );
      const index: number = props.lrc.lyrics
        .map((value) => {
          return Object.keys(value)[0];
        })
        .indexOf(nearKey);
      const lyricTimestamp: number = Number(
        Object.keys(props.lrc.lyrics[index])[0],
      );
      const lyric: string = props.lrc.lyrics[index][lyricTimestamp];

      if (lyricTimestamp <= time) {
        props.setLyric(lyric);
      }
    }
  }, [time]);

  const play = () => {
    setTimeout(() => {
      audioRef.current?.play().then(() => null);
      setPlaying(true);
    }, 0);
  };

  const pause = () => {
    if (!audioRef.current?.ended) audioRef.current?.pause();

    setPlaying(false);
  };

  const toggleAudio = () => {
    isPlaying ? pause() : play();
  };

  return (
    <Stack
      direction={'row'}
      position={'fixed'}
      bottom={0}
      left={0}
      right={0}
      bgcolor={'#181818'}
      justifyContent={'space-around'}
      px={10}
    >
      <TimeIndicator
        audio={audioRef.current}
        time={time}
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        setTime={setTime}
      />
      <VolumeController audio={audioRef.current} />
      <audio
        ref={audioRef}
        onPlay={() => play()}
        onPause={() => pause()}
        onEnded={(_) => {
          setPlaying(false);
          setTime(0);
          props.setLyric('');
        }}
        onTimeUpdate={(event) =>
          setTime(Math.round(event.currentTarget.currentTime * 1000))
        }
      />
    </Stack>
  );
};

export default MusicPlayer;
