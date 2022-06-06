import { NextPage } from 'next';
import Header from '@/components/Common/Header';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <div>
      <Header />
      <Stack maxWidth={'80%'} m={'auto'}>
        <Box justifyContent={'center'}>
          <Typography
            variant={'h2'}
            textAlign={'center'}
            color={'white'}
            letterSpacing={25}
          >
            About
          </Typography>
          <Typography
            variant={'body1'}
            textAlign={'center'}
            color={'white'}
            letterSpacing={3}
            mt={5}
          >
            このサイトは
            <Link
              href={
                'https://ja.wikipedia.org/wiki/LRC_(%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%83%88)'
              }
            >
              LRCファイル
            </Link>
            を音源と一緒に再生する事が可能なサイトです。
          </Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default About;
