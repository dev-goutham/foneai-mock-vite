import React, { useEffect, useState } from 'react';
import Body from '../components/AppLayout/Body';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useClipboard,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { IoMdEye, IoMdEyeOff, IoMdRefresh } from 'react-icons/io';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';
import ReactSelect from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FloatingActionButton from '../components/FloatingActionButton';
import { GoDotFill } from 'react-icons/go';
import { PiBookOpenText } from 'react-icons/pi';

export default function Setup() {
  return (
    <Body>
      <Grid w={'full'} gridTemplateColumns={'1fr 1fr'} gap={14}>
        <GridItem w={'full'} h={'77vh'}>
          <Grid h={'full'} gridTemplateRows={'30% 70%'} gap={14}>
            <GridItem w={'full'} h={'full'}>
              <ApiKey />
            </GridItem>
            <GridItem w={'full'} h={'full'}>
              <GetStarted />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem w={'90%'} h={'77vh'}>
          <Grid h={'full'} gridTemplateRows={'50% 50%'} gap={14}>
            <GridItem w={'full'} h={'full'}>
              <AllowAccessFrom />
            </GridItem>
            <GridItem w={'full'} h={'full'}>
              <DownloadClient />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <FloatingActionButton>
        <Flex alignItems={'center'} gap={2}>
          <PiBookOpenText size={'50px'} />
          <Text fontSize={'lg'} px={2}>
            <FormattedMessage id="docs" />
          </Text>
        </Flex>
      </FloatingActionButton>
    </Body>
  );
}

const ApiKey = () => {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(uuid());
  const { onCopy, hasCopied } = useClipboard(key);
  const [inTimeout, setInTimeout] = useState(false);

  const timoutRegenerate = () => {
    console.log('called');
    setInTimeout(true);
    setTimeout(() => {
      setInTimeout(false);
    }, 6000);
  };

  useEffect(() => {
    console.log(inTimeout);
  }, [inTimeout]);

  return (
    <Stack
      border={'2px solid'}
      borderColor={'gray.200'}
      rounded={'18px'}
      w={'full'}
      h={'full'}
      p={6}
      bg={'gray.100'}
      boxShadow={'xl'}
    >
      <Text fontWeight={'semibold'} fontSize={'lg'}>
        <FormattedMessage id="apiKey" />
      </Text>
      <Divider my={2} borderColor={'gray.600'} />
      <Box
        border={'2px solid'}
        borderColor={'gray.200'}
        rounded="18px"
        py={2}
        px={4}
        bg={'white'}
      >
        {show ? (
          <Text>{key}</Text>
        ) : (
          <Flex alignItems={'center'} minH={'26.99px'} maxH={'26.99px'}>
            {new Array(key.length).fill(null).map((_, i) => (
              <GoDotFill size={12} key={i} />
            ))}
          </Flex>
        )}
        {/* <Text>
          {show ? key : new Array(key.length).fill(<GoDotFill />).join('')}
        </Text> */}
      </Box>
      <Flex mt={2} gap={4} justifyContent={'stretch'}>
        <Button
          onClick={() => {
            setShow(prev => !prev);
          }}
          flex={1}
          // colorScheme="primary"
          bg={'gray.200'}
          _hover={{
            bg: 'primary.200',
          }}
          _active={{
            bg: 'primary.500',
          }}
          leftIcon={!show ? <IoMdEye /> : <IoMdEyeOff />}
        >
          <FormattedMessage id={!show ? 'show' : 'hide'} />
        </Button>
        <Button
          onClick={() => {
            onCopy();
          }}
          leftIcon={hasCopied ? <FaCheck /> : <FaRegCopy />}
          flex={1}
          // colorScheme="primary"
          bg={'gray.200'}
          _hover={{
            bg: 'primary.200',
          }}
          _active={{
            bg: 'primary.500',
          }}
        >
          <FormattedMessage id={hasCopied ? 'copied' : 'copy'} />
        </Button>
        <Button
          onClick={() => {
            setKey(uuid());
            timoutRegenerate();
          }}
          flex={1}
          // colorScheme="primary"
          bg={'gray.200'}
          isDisabled={inTimeout}
          _disabled={{
            opacity: 30,
            pointerEvents: 'none',
          }}
          _hover={{
            bg: 'primary.200',
          }}
          _active={{
            bg: 'primary.500',
          }}
          leftIcon={inTimeout ? <FaCheck /> : <IoMdRefresh />}
        >
          <FormattedMessage id={inTimeout ? 'regenerated' : 'regenerate'} />
        </Button>
      </Flex>
    </Stack>
  );
};

const ipSchema = ipv => {
  const pattern =
    ipv === 'ipv6'
      ? /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
      : /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:3[0-2]|[12]?[0-9])$/;

  return yup.object().shape({
    ipAddress: yup
      .string()
      .required('Ip address is required')
      .matches(pattern, 'Invalid ip address'),
  });
};

const AllowAccessFrom = () => {
  const [ipAddresses, setIpAddresses] = useState([]);
  const [selected, setSelected] = useState('anywhere');
  const [ipVersion, setIpVersion] = useState('ipv4');

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ipSchema(ipVersion)),
  });

  const options = [
    {
      value: 'anywhere',
      label: 'anywhere',
    },
    {
      value: 'custom',
      label: 'custom',
    },
  ];

  const ipOptions = [
    {
      value: 'ipv4',
      label: 'IPV4',
    },
    {
      value: 'ipv6',
      label: 'IPV6',
    },
  ];

  const handleFormSubmit = ({ ipAddress }) => {
    setIpAddresses(prev => [...prev, ipAddress]);
    reset();
  };

  return (
    <Stack
      border={'2px solid'}
      borderColor={'gray.200'}
      rounded={'18px'}
      w={'full'}
      h={'full'}
      p={6}
      bg={'gray.100'}
      boxShadow={'xl'}
      pos={'relative'}
    >
      <Text fontWeight={'semibold'} fontSize={'lg'}>
        <FormattedMessage id="allowAccessFrom" />
      </Text>
      <Divider my={2} borderColor={'gray.600'} />
      <Box mt={2}>
        <ReactSelect
          onChange={e => {
            setSelected(e.value);
          }}
          defaultValue={options[0]}
          options={options}
          formatOptionLabel={el => (
            <Text>
              <FormattedMessage id={el.label} />
            </Text>
          )}
        />
      </Box>
      {selected === 'custom' && (
        <Stack mt={4}>
          <FormControl isInvalid={errors.ipAddress}>
            <InputGroup>
              <InputLeftAddon paddingLeft={0}>
                <ReactSelect
                  options={ipOptions}
                  defaultValue={ipOptions[0]}
                  onChange={e => {
                    setIpVersion(e.value);
                  }}
                />
              </InputLeftAddon>
              <form
                className="setup-form"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <Input bg={'white'} {...register('ipAddress')} />
                <FormErrorMessage>
                  {errors?.ipAddress?.message}
                </FormErrorMessage>
              </form>
            </InputGroup>
          </FormControl>
          <Flex gap={4} mt={2} flexWrap={'wrap'}>
            {ipAddresses.map((ip, i) => (
              <Tag colorScheme="primary" size={'lg'} key={i}>
                <TagLabel>{ip}</TagLabel>
                <TagCloseButton
                  onClick={e => {
                    setIpAddresses(prev => {
                      const newIp = [...prev];
                      newIp.splice(i, 1);
                      return newIp;
                    });
                  }}
                />
              </Tag>
            ))}
          </Flex>
        </Stack>
      )}
      <Flex
        justifyContent={'end'}
        pos={'absolute'}
        bottom={0}
        right={0}
        w={'full'}
        p={4}
      >
        <Button colorScheme="primary">
          <FormattedMessage id="save" />
        </Button>
      </Flex>
    </Stack>
  );
};

const GetStarted = () => {
  const { locale } = useIntl();

  return (
    <Stack
      border={'2px solid'}
      borderColor={'gray.200'}
      rounded={'18px'}
      w={'full'}
      h={'full'}
      p={6}
      bg={'gray.100'}
      boxShadow={'xl'}
    >
      <Text fontWeight={'semibold'} fontSize={'lg'}>
        <FormattedMessage id="getStarted" />
      </Text>
      <Divider my={2} borderColor={'gray.600'} />
      <Box height={'100%'}>
        {locale === 'en' ? (
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            src="https://www.youtube.com/embed/jNQXAC9IVRw?si=C7BQA5aC4C_AZ7gv"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        ) : (
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            src="https://www.youtube.com/embed/QudXBv3GeqY?si=bLJqdaGa0ZWBRa4F"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        )}
      </Box>
    </Stack>
  );
};

const DownloadClient = () => {
  const options = ['arm64', 'x86-64'];

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: 'architecture',
    defaultValue: 'arm64',
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Stack
      border={'2px solid'}
      borderColor={'gray.200'}
      rounded={'18px'}
      w={'full'}
      h={'full'}
      p={6}
      bg={'gray.100'}
      boxShadow={'xl'}
    >
      <Text fontWeight={'semibold'} fontSize={'lg'}>
        <FormattedMessage id="integration" />
      </Text>
      <Divider my={2} borderColor={'gray.600'} />
      <Stack h={'100%'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text fontWeight={'semibold'} fontSize={'md'}>
            <FormattedMessage id="architecture" />
          </Text>
          <HStack gap={0} {...group}>
            {options.map(value => {
              const radio = getRadioProps({ value });
              return (
                <CustomRadio key={value} left={value === 'arm64'} {...radio}>
                  {value}
                </CustomRadio>
              );
            })}
          </HStack>
        </Flex>
        <Button
          size={'xl'}
          // leftIcon={<IoMdCloudDownload />}
          colorScheme="primary"
          mt={'auto'}
          py={4}
        >
          <Stack gap={0}>
            <Text fontSize={'lg'}>
              <FormattedMessage id="downloadClient" />
            </Text>
            <Text fontSize={'sm'}>{value}</Text>
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
};

const CustomRadio = ({ left = false, children, ...props }) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderLeftRadius={left ? 'lg' : 'none'}
        borderRightRadius={left ? 'none' : 'lg'}
        boxShadow="md"
        _checked={{
          bg: 'primary.600',
          color: 'white',
          borderColor: 'primary.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};
