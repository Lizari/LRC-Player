import { LRC } from '@/entity/LRC';
import { LRCParser } from '@/util/parser';
import { Button } from '@mui/material';

type Props = {
  setAudio: React.Dispatch<React.SetStateAction<File | undefined>>;
  setLRC: React.Dispatch<React.SetStateAction<LRC | undefined>>;
};

const SampleButton: React.FC<Props> = ({ setLRC, setAudio }) => {
  return (
    <Button
      size={'large'}
      variant={'text'}
      sx={{
        color: 'gray',
        '&:hover': {
          color: '#FFFFFF',
        },
      }}
      onClick={async () => {
        const lrc_file_text = await fetch('/After The Rain.lrc').then(
          (response) => response.text(),
        );
        const parser = new LRCParser(lrc_file_text);

        parser.parse().then(() => setLRC(parser.getLRC()));

        fetch('/After The Rain.wav')
          .then((response) => response.blob())
          .then((blob) => new File([blob], 'After The Rain.wav'))
          .then((file) => setAudio(file));
      }}
    >
      Sample
    </Button>
  );
};

export default SampleButton;
