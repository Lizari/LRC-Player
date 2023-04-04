import React, { ChangeEvent } from 'react';

type InputElementProps = React.ComponentPropsWithRef<'input'>;
type Props = {
  errorMessage?: string;
  inputElementProps?: InputElementProps;
};

const LRCFileInputButton = React.forwardRef<HTMLInputElement, Props>(
  function LRCFileInputButton(props, ref) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.inputElementProps?.onChange?.(e);
    };

    return (
      <input
        type={'file'}
        style={{ display: 'none' }}
        accept={'.lrc'}
        multiple={false}
        ref={ref}
        onChange={handleFileChange}
      />
    );
  },
);

export default LRCFileInputButton;
