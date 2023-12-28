import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';
import { NavLink, useLocation } from 'react-router-dom';
import { BOT_HEADER } from '../data/constants';

const options = BOT_HEADER;

export default function BotDrawer({ botId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton>
          <AiOutlineMenu size={24} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        {/* <PopoverCloseButton /> */}
        <PopoverBody>
          <Stack p={2}>
            {options.map((option, index) => (
              <NavLink
                className={
                  location.pathname.includes(option.value)
                    ? 'navLinkActive'
                    : ''
                }
                to={`/bots/${botId}/${option.slug}`}
              >
                <Text
                  isSelected={location.pathname.includes(option.value)}
                  backgroundColor={'blue.100'}
                  p={4}
                  rounded={'8px'}
                >
                  <FormattedMessage id={option.value} />
                </Text>
              </NavLink>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
