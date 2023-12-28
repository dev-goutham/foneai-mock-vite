import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Text,
  Divider,
  Flex,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiHelpCircle, BiUser } from 'react-icons/bi';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { ProfileModal } from './ProfileModal';
import { BsMoonStars, BsSun } from 'react-icons/bs';

function pathCleaner() {
  let path = window.location.pathname.split('/');
  path = path.filter(item => item !== '');
  return path.pop();
}

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();



  const { colorMode, toggleColorMode } = useColorMode();
  const [matches] = useMediaQuery('(min-width: 1024px)');
  return (
    <>
      <IconButton display={matches ? 'none' : 'block'} onClick={onOpen}>
        <AiOutlineMenu size={24} />
      </IconButton>
      <ProfileModal
        isOpen={isProfileOpen}
        name="john"
        onClose={onProfileClose}
        mode={'update'}
      />
    </>
  );
};

export default MenuDrawer;
