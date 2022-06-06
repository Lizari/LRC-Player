import { NextPage } from 'next';
import Header from '@/components/Common/Header';
import { Typography } from '@mui/material';

const Setting: NextPage = () => {
  return (
    <div>
      <Header />
      <Typography
        variant={'h2'}
        textAlign={'center'}
        color={'white'}
        letterSpacing={25}
      >
        Coming soon...
      </Typography>
    </div>
  );
};

export default Setting;
