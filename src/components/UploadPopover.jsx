import React, { useState } from 'react';
import { MdUpload, MdCheckCircle } from 'react-icons/md';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Input,
  List,
  ListItem,
  ListIcon,
  Spinner,
} from '@chakra-ui/react';
import { audiofFileExists, uploadAudioFile } from '../api';
import { FormattedMessage } from 'react-intl';

export default function UploadPopover({ uploadSucess }) {
  const initialFocusRef = React.useRef();
  const [uploading, setUploading] = useState(false);
  async function handleFileUpload(e) {
    e.preventDefault();
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];

      setUploading(true);
      let fileExists = await audiofFileExists(file.name);
      if (fileExists?.status === 200) {
        if (fileExists?.data?.exists) {
          alert(
            'File with same name already exists. Please rename the file and try again'
          );
          e.target.value = null;
          e.target.files = null;
          setUploading(false);
          return;
        }
      } else {
        alert('Error checking file name. Please try again');
        e.target.value = null;
        e.target.files = null;
        setUploading(false);
        return;
      }

      if (file.size > 2000000) {
        alert('File size too big. Upload files less than 2MB');
        e.target.value = null;
        e.target.files = null;
        setUploading(false);
        return;
      }
      let fileExtension = file.name.split('.').slice(-1)[0];
      // let validFormats = ['mp3', 'wav', 'pcm', 'ogg']
      let validFormats = ['pcm'];
      if (!validFormats.includes(fileExtension)) {
        alert('File type should be only pcm');
        e.target.value = null;
        e.target.files = null;
        setUploading(false);
        return;
      }
      let res = await uploadAudioFile(file);
      setUploading(false);
      console.log(res, 146);
      setUploading(false);
      if (res) {
        uploadSucess(file.name);

        // refetch the audio files
      } else {
        alert('Error uploading file. Please try again later');
      }
      e.target.value = null;
      e.target.files = null;
    }
  }

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        {uploading ? (
          <Button
            leftIcon={<Spinner size="sm" />}
            colorScheme="blue"
            variant={'outline'}
          >
            <FormattedMessage id="uploading" />
          </Button>
        ) : (
          <Button
            leftIcon={<MdUpload size="25px" />}
            colorScheme="blue"
            variant={'outline'}
          >
            <FormattedMessage id="uploadAudio" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        borderRadius={'15px'}
        color="white"
        bg="blue.800"
        borderColor="blue.100"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <FormattedMessage id="uploadFileThatAre" />
        </PopoverHeader>
        <PopoverArrow bg={'blue.800'} />
        <PopoverCloseButton />
        <PopoverBody fontWeight={'light'} fontSize={'md'}>
          <List spacing={3}>
            <ListItem>
              <ListIcon key={'1'} as={MdCheckCircle} color="green.500" />
              <FormattedMessage id="uniqueName" />
            </ListItem>
            <ListItem>
              <ListIcon key={'2'} as={MdCheckCircle} color="green.500" />
              <FormattedMessage id="lessThan2MB" />
            </ListItem>
            <ListItem>
              <ListIcon key={'5'} as={MdCheckCircle} color="green.500" />
              <FormattedMessage id="samplingRate" />
            </ListItem>
            <ListItem>
              <ListIcon key={'4'} as={MdCheckCircle} color="green.500" />
              <FormattedMessage id="ethicalContent" />
            </ListItem>
          </List>
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="right"
          justifyContent="space-between"
          pb={4}
          width={'100%'}
          mr={'1'}
          ml={'auto'}
        >
          {uploading ? (
            <Button
              backgroundColor="white"
              color="blue.800"
              variant="contained"
              width={'100%'}
              size="md"
              mr={'1'}
              textAlign={'center'}
              disabled
            >
              <FormattedMessage id="uploading" />
            </Button>
          ) : (
            <Button
              backgroundColor="white"
              color="blue.800"
              variant="contained"
              width={'100%'}
              size="md"
              mr={'1'}
              textAlign={'center'}
            >
              <FormattedMessage id="ok" />
              <Input
                position={'absolute'}
                type="file"
                size="sm"
                opacity={0}
                accept="audio/*"
                aria-hidden="true"
                mr={'1'}
                onChange={e => handleFileUpload(e)}
                _hover={{
                  cursor: 'pointer',
                }}
              />
            </Button>
          )}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
