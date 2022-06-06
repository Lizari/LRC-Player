import React, { useState } from 'react';
import { Drawer, IconButton, Link, Stack } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Header: React.VFC = () => {
  const [isOpen, toggleDrawer] = useState(false);

  return (
    <div>
      <IconButton
        sx={{
          paddingTop: 3,
          paddingLeft: 3,
        }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuOutlinedIcon fontSize={'large'} sx={{ color: 'white' }} />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#181818',
            paddingTop: 3,
            width: '15%',
          },
        }}
      >
        <Stack textAlign={'center'} spacing={3}>
          <Link
            href={'/'}
            fontSize={'x-large'}
            fontWeight={'700'}
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
            fontWeight={'700'}
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
          <Link
            href={'/setting'}
            fontSize={'x-large'}
            fontWeight={'700'}
            underline={'none'}
            sx={{
              color: '#808080',
              '&:hover': {
                color: '#FFFFFF',
              },
            }}
          >
            Setting
          </Link>
        </Stack>
      </Drawer>
    </div>
  );
};

export default Header;
