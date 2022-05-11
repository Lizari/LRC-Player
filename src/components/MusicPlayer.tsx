import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, Typography } from '@mui/material';
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
  const [index, setIndex] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (audioRef.current !== null && props.audio) {
      audioRef.current.src = URL.createObjectURL(props.audio);
      audioRef.current.volume = 0.5;
    }
  }, [props.audio]);

  useEffect(() => {
    if (props.lrc !== undefined && isEmptyObject(props.lrc.lyrics[index])) {
      const lyricTimestamp: number = parseInt(
        Object.keys(props.lrc.lyrics[index])[0],
      );
      const lyric: string | undefined = props.lrc.lyrics[index][lyricTimestamp];

      if (lyric !== undefined && lyricTimestamp <= time) {
        props.setLyric(lyric);
        setIndex((index) => index + 1);
      }
    }
  }, [time]);

  const isEmptyObject = (value: any) => {
    return (
      value !== null && typeof value == 'object' && value.constructor === Object
    );
  };

  const play = () => {
    if (timerRef.current !== null) return;
    setTimeout(() => {
      audioRef.current?.play().then(() => null);
      setPlaying(true);
      timerRef.current = setInterval(() => {
        setTime((time) => time + 500);
      }, 500);
    }, 0);
  };

  const pause = () => {
    if (timerRef.current === null) return;
    if (!audioRef.current?.ended) audioRef.current?.pause();
    setPlaying(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const toggleAudio = () => {
    isPlaying ? pause() : play();
  };

  return (
    <Box>
      <Box>
        <Typography variant={'h5'}>{props.lrc?.title}</Typography>
        <TimeIndicator
          audio={audioRef.current}
          time={time}
          isPlaying={isPlaying}
          toggleAudio={toggleAudio}
          setTime={setTime}
        />
        <VolumeController audio={audioRef.current} />
      </Box>
      <audio
        ref={audioRef}
        onEnded={(_) => {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setPlaying(false);
          setTime(0);
          setIndex(0);
          props.setLyric('');
        }}
      />
    </Box>
  );
};

export default MusicPlayer;
