import React from 'react';
import { Link, Stack } from '@mui/material';

const Header: React.VFC = () => {
  return (
    <Stack direction={'row'} spacing={3} justifyContent={'center'} p={'5px'}>
      <Link href={'/'} fontSize={'x-large'} underline={'hover'}>
        LRC Player
      </Link>
      <Link href={'/about'} fontSize={'x-large'} underline={'hover'}>
        About
      </Link>
      <Link href={'/usage'} fontSize={'x-large'} underline={'hover'}>
        Usage
      </Link>
    </Stack>
  );
};

export default Header;
