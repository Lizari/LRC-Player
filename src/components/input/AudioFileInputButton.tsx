import { Button } from '@mui/material';
import React, { ChangeEvent, useRef } from 'react';
import FilePresentIcon from '@mui/icons-material/FilePresent';

type InputElementProps = React.ComponentPropsWithoutRef<'input'>;
type Props = {
  errorMessage?: string;
  inputElementProps?: InputElementProps;
};

const AudioFileInputButton = React.forwardRef<HTMLInputElement, Props>(
  function AudioFileInputButton(props) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.inputElementProps?.onChange?.(e);
    };
    const audioRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <Button
          size={'large'}
          variant={'text'}
          startIcon={<FilePresentIcon />}
          sx={{
            color: 'gray',
            '&:hover': {
              color: '#FFFFFF',
            },
          }}
          onClick={() => {
            if (audioRef.current && audioRef.current.files?.length !== 0)
              audioRef.current.value = '';
            audioRef.current?.click();
          }}
        >
          Audio File
        </Button>
        <input
          type={'file'}
          style={{ display: 'none' }}
          multiple={false}
          accept={'.mp3, .m4a'}
          ref={audioRef}
          onChange={handleFileChange}
        />
      </>
    );
  },
);

export default AudioFileInputButton;
