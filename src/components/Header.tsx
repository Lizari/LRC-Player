import React from 'react';
import { Link, Stack } from '@mui/material';

const Header: React.VFC = () => {
  return (
    <Stack mt={3} direction={'row'} spacing={3} justifyContent={'center'}>
      <Link
        href={'/'}
        fontSize={'x-large'}
        underline={'hover'}
        sx={{
          color: 'gray',
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
        underline={'hover'}
        sx={{
          color: 'gray',
          '&:hover': {
            color: '#FFFFFF',
          },
        }}
      >
        About
      </Link>
      <Link
        href={'/usage'}
        fontSize={'x-large'}
        underline={'hover'}
        sx={{
          color: 'gray',
          '&:hover': {
            color: '#FFFFFF',
          },
        }}
      >
        Usage
      </Link>
    </Stack>
  );
};

export default Header;
