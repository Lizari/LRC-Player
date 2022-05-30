import React from 'react';
import { Link, Stack } from '@mui/material';

const Header: React.VFC = () => {
  return (
    <Stack mt={3} direction={'row'} spacing={3} justifyContent={'center'}>
      <Link
        href={'/'}
        fontSize={'x-large'}
        fontWeight={"700"}
        underline={'none'}
        sx={{
          color: '#808080',
          '&:hover': {
            color: '#FFFFFF',
          },
        }}
      >
        LRC Player
      </Link>
      <Link
        href={'/about'}
        fontSize={'x-large'}
        fontWeight={"700"}
        underline={'none'}
        sx={{
          color: '#808080',
          '&:hover': {
            color: '#FFFFFF',
          },
        }}
      >
        About
      </Link>
    </Stack>
  );
};

export default Header;
