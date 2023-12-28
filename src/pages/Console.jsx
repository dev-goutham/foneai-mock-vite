import { Stack, Spinner, Box } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { getUserInfo } from '../api';
import { LangContext } from '../contexts/lang';
import { set } from 'react-hook-form';
import { AuthContext } from '../contexts/auth';

export default function Console() {
  const { locale, setLanguage } = useContext(LangContext);
  const [isLoaded, setIsLoaded] = React.useState(true);

  // set the console language from the user in the authcontext
  useEffect(() => {
    getUserInfo().then(user => {
      console.log(user);
      let lang;
      const pathname = window.location.pathname;
      if (
        ['/login', '/forgot-password', '/reset-password'].includes(pathname)
      ) {
        const urlParams = new URLSearchParams(window.location.search);
        lang = urlParams.get('lang') || 'en';
      } else {
        lang = user?.consoleLanguage || 'en';
      }
      setLanguage(lang);
    });
  }, []);

  return isLoaded ? (
    <Stack
      direction={'column'}
      w={'100vw'}
      h={'100vh'}
      // minWidth={'700px'}
      bg={'gray.50'}
      // backgroundClip={'content-box'}
      // backgroundImage={`${process.env.PUBLIC_URL}/bg.png`}
      // backdropFilter={'blur(50px) saturate(100%)'}
      // make the background image more deeper and darker
      // backgroundColor={'rgba(0,0,0,0.5)'}
      backgroundBlendMode={'multiply'}
      // backgroundRepeat={'repeat'}
      // backgroundSize={'contain'}
      alignContent={'center'}
      pos={'relative'}
    >
      <Outlet />
    </Stack>
  ) : (
    // show spinner at the center top and  center left of the page
    <Stack
      direction={'column'}
      w={'100vw'}
      h={'100vh'}
      minWidth={'700px'}
      bg={'gray.50'}
      alignContent={'center'}
      alignItems={'center'}
      fontSize={'6xl'}
      justifyContent={'center'}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        // make the soze bigger more than xl
        size="xl"
      />
    </Stack>
  );
}
