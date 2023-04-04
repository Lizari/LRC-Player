import React, { ChangeEvent } from 'react';

type InputElementProps = React.ComponentPropsWithRef<'input'>;
type Props = {
  errorMessage?: string;
  inputElementProps?: InputElementProps;
};

const AudioFileInputButton = React.forwardRef<HTMLInputElement, Props>(
  function AudioFileInputButton(props, ref) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.inputElementProps?.onChange?.(e);
    };
    return (
      <input
        type={'file'}
        style={{ display: 'none' }}
        multiple={false}
        accept={'.mp3, .m4a'}
        ref={ref}
        onChange={handleFileChange}
      />
    );
  },
);

export default AudioFileInputButton;
