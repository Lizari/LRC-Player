import { Button } from '@mui/material';
import React, { ChangeEvent, useRef } from 'react';
import LyricsIcon from '@mui/icons-material/Lyrics';

type InputElementProps = React.ComponentPropsWithoutRef<'input'>;
type Props = {
  errorMessage?: string;
  inputElementProps?: InputElementProps;
};

const LRCFileInputButton = React.forwardRef<HTMLInputElement, Props>(
  function LRCFileInputButton(props) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.inputElementProps?.onChange?.(e);
    };
    const lrcRef = useRef<HTMLInputElement>(null);

    return (
      <>
        <Button
          size={'large'}
          variant={'text'}
          startIcon={<LyricsIcon />}
          sx={{
            color: 'gray',
            '&:hover': {
              color: '#FFFFFF',
            },
          }}
          onClick={() => {
            if (lrcRef.current !== null && lrcRef.current.files?.length !== 0)
              lrcRef.current.value = '';
            lrcRef.current?.click();
          }}
        >
          LRC File
        </Button>
        <input
          type={'file'}
          style={{ display: 'none' }}
          accept={'.lrc'}
          multiple={false}
          onChange={handleFileChange}
        />
      </>
    );
  },
);

export default LRCFileInputButton;
