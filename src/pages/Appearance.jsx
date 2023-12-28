import { useContext, useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import { BiSave, BiSolidPencil } from 'react-icons/bi';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import { getTheme } from '../api';
import { LangContext } from '../contexts/lang';
import axios from 'axios';
import FloatingActionButton from '../components/FloatingActionButton';
import { IoIosColorPalette } from 'react-icons/io';
import { IoText } from 'react-icons/io5';
import { PiTidalLogoFill } from 'react-icons/pi';
import { MdOutlineTitle } from 'react-icons/md';

const tabOptions = [
  {
    icon: <IoIosColorPalette size={32} />,
    name: 'Colors',
  },
  {
    icon: <IoText size={32} />,
    name: 'Typography',
  },
  {
    icon: <PiTidalLogoFill size={32} />,
    name: 'Logo',
  },
  {
    icon: <MdOutlineTitle size={32} />,
    name: 'Title',
  },
];

export default function Appearance() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState({
    colors: {
      primary: {
        light: undefined,
        dark: undefined,
      },
      secondary: {
        light: undefined,
        dark: undefined,
      },
      success: {
        light: undefined,
        dark: undefined,
      },
      warning: {
        light: undefined,
        dark: undefined,
      },
      error: {
        light: undefined,
        dark: undefined,
      },
      info: {
        light: undefined,
        dark: undefined,
      },
    },
    typography: {
      heading: undefined,
      normal: undefined,
      subtext: undefined,
      buttons: undefined,
    },
  });
  const [title, setTitle] = useState('');

  useEffect(() => {
    setLoading(true);
    getTheme().then(res => {
      setTheme(res);
      setTitle(res.title);
      setLoading(false);
    });
  }, []);

  return (
    <Tabs variant={'unstyled'} orientation="vertical">
      <TabList
        h={'full'}
        pos={'fixed'}
        left={0}
        top={0}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        // top={'50%'}
        // bottom={'50%'}
      >
        {tabOptions.map((opt, i) => (
          <Tab
            justifyContent={'start'}
            key={opt.name}
            display={'flex'}
            gap={3}
            alignItems={'center'}
            p={2}
            flexDir={'column'}
            // borderRightRadius={'12px'}
            borderTopRightRadius={i === 0 ? '12px' : 0}
            borderBottomRightRadius={i === 3 ? '12px' : 0}
            borderBottom={i === 3 ? 'none' : '1px solid white'}
            bg={'primary.200'}
            color="gray.600"
            sx={{
              '.box': {
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                borderRadius: '12px',
                paddingY: 6,
                width: '120.44px',
              },
            }}
            _selected={{
              '.box': {
                bg: 'primary.500',
                color: 'white',
                svg: {
                  fill: 'white',
                },
              },
            }}
          >
            <div className="box">
              {opt.icon}
              <Text fontSize={'sm'}>{opt.name}</Text>
            </div>
          </Tab>
        ))}
      </TabList>
      <Grid
        marginLeft={'10%'}
        w={'90%'}
        maxH={'75vh'}
        marginRight={'5%'}
        gridTemplateColumns={'33% 67%'}
        gap={6}
        mt={'50px'}
      >
        {/* TAB PANELS */}
        <GridItem minH={'789.73px'} h={'789.73px'}>
          <TabPanels h={'100%'}>
            <TabPanel h={'100%'}>
              <ColorsSelectorSection loading={loading} theme={theme} />
            </TabPanel>
            <TabPanel h={'100%'}>
              <TypographySelectorSection loading={loading} theme={theme} />
            </TabPanel>
            <TabPanel h={'100%'}>
              <Stack
                h={'100%'}
                bg={'#F2F2F2'}
                p={4}
                rounded={'20px'}
                boxShadow={'xl'}
                gap={6}
              >
                <LogoPickerSection loading={loading} theme={theme} />
                <FaviconPickerSection loading={loading} theme={theme} />
              </Stack>
            </TabPanel>
            <TabPanel h={'100%'}>
              <Stack
                borderColor={'gray.300'}
                h={'full'}
                p={6}
                bgColor={'#F2F2F2'}
                rounded={'20px'}
                boxShadow={'xl'}
                minH={'300px'}
              >
                <Text
                  w={'full'}
                  borderBottom={'2px solid black'}
                  mb={4}
                  fontSize="xl"
                  fontWeight={600}
                >
                  <FormattedMessage id="title" />
                </Text>
                <Stack flex={1} px={12} justifyContent={'center'}>
                  {loading ? (
                    <Skeleton h={51.74} w={'full'} />
                  ) : (
                    <InputGroup>
                      <Input
                        variant={'filled'}
                        bgColor={'white'}
                        placeholder="Title"
                        p={6}
                        value={title}
                        onChange={e => {
                          setTitle(e.target.value);
                        }}
                      />
                      <InputRightElement
                        display={'flex'}
                        justifyContent={'end'}
                        minW={'200px'}
                        p={6}
                      >
                        <Text color={'gray.400'}>{title.length} / 20</Text>
                      </InputRightElement>
                    </InputGroup>
                  )}
                </Stack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </GridItem>
        <GridItem border={'2px solid blue'} h={'full'}></GridItem>
      </Grid>
      {/* <Flex
        // maxWidth={'80%'}
        borderColor={'gray.400'}
        style={{
          marginLeft: '15%',
          marginRight: '15%',
        }}
        py={12}
        // px={12}
        className="no-scrollbar"
        maxW={'100vw'}
      >
        <Box w={'full'}>
          <Grid gap={'50px'} mb={'50px'} templateColumns={'1fr auto'}>
            <GridItem>
              <ColorsSelectorSection loading={loading} theme={theme} />
            </GridItem>

            <GridItem>
              <TypographySelectorSection loading={loading} theme={theme} />
            </GridItem>
          </Grid>
          <Grid gap={'50px'} templateColumns={'25% 25% 35%'}>
            <GridItem>
              <LogoPickerSection loading={loading} theme={theme} />
            </GridItem>
            <GridItem>
              <FaviconPickerSection loading={loading} theme={theme} />
            </GridItem>
            <GridItem>
              <Stack
                borderColor={'gray.300'}
                h={'full'}
                p={6}
                bgColor={'#F2F2F2'}
                rounded={'20px'}
                boxShadow={'xl'}
              >
                <Text
                  w={'full'}
                  borderBottom={'2px solid black'}
                  mb={4}
                  fontSize="xl"
                  fontWeight={600}
                >
                  <FormattedMessage id="title" />
                </Text>
                <Stack flex={1} px={12} justifyContent={'center'}>
                  {loading ? (
                    <Skeleton h={51.74} w={'full'} />
                  ) : (
                    <InputGroup>
                      <Input
                        variant={'filled'}
                        bgColor={'white'}
                        placeholder="Title"
                        p={6}
                        value={title}
                        onChange={e => {
                          setTitle(e.target.value);
                        }}
                      />
                      <InputRightElement
                        display={'flex'}
                        justifyContent={'end'}
                        minW={'200px'}
                        p={6}
                      >
                        <Text color={'gray.400'}>{title.length} / 20</Text>
                      </InputRightElement>
                    </InputGroup>
                  )}
                </Stack>
              </Stack>
            </GridItem>
          </Grid>
        </Box>
      </Flex> */}
      <FloatingActionButton minW={'150px'} leftIcon={<BiSave size={'30px'} />}>
        <Text>Save</Text>
      </FloatingActionButton>
    </Tabs>
  );
}

const LogoPickerSection = ({ loading, theme }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState([]);
  const imageRef = useRef(null);
  const [value, setValue] = useState('1');

  useEffect(() => {
    if (theme.logo) {
      setSelectedImage(theme.logo);
    }
  }, [theme]);

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    // Check if the file size is less than 1MB
    if (file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = e => {
        // const img = new Image();
        // img.src = e.target.result;
        setSelectedImage(e.target.result);
        // img.onload = () => {
        //   setImageDimensions({ width: img.width, height: img.height });
        // };
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size should be less than 1MB.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Allow only image files
    multiple: false, // Allow only single file upload
  });
  return (
    <Flex
      borderColor={'gray.300'}
      h={'full'}
      p={6}
      bgColor={'#F2F2F2'}
      rounded={'20px'}
      boxShadow={'xl'}
    >
      <Stack spacing={8} w={'full'} alignItems={'start'}>
        <Text
          borderBottom={'2px solid black'}
          mb={4}
          fontSize="xl"
          fontWeight={600}
          w={'full'}
        >
          <FormattedMessage id="logo" />
        </Text>
        <Flex w={'full'} justifyContent={'center'}>
          <Stack gap={4} mx={'auto'} alignItems={'center'}>
            {loading ? (
              <Skeleton w={150} h={150} />
            ) : (
              <Box
                {...getRootProps()}
                p={4}
                border="2px dashed"
                borderColor="gray.200"
                textAlign="center"
                w={'150px'}
                h={'150px'}
                cursor={'pointer'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                color={'gray.500'}
              >
                <input {...getInputProps()} />
                {selectedImage ? (
                  <Box w={'full'} h={'full'} position={'relative'}>
                    <Image
                      src={selectedImage}
                      alt="Thumbnail"
                      maxW="full"
                      maxH="full"
                    />
                    <IconButton
                      position={'absolute'}
                      top={'-25px'}
                      right={'-25px'}
                      bg={'gray.400'}
                      rounded={'full'}
                      color={'white'}
                      size={'xs'}
                      _hover={{
                        bg: 'gray.500',
                      }}
                    >
                      <BiSolidPencil size={14} />
                    </IconButton>
                  </Box>
                ) : (
                  <Stack alignItems={'center'}>
                    <FaUpload size={60} />
                    <Text color={'gray.700'} fontSize={'sm'}>
                      <FormattedMessage id="clickHereToDropAFileOrUpload" />
                    </Text>
                  </Stack>
                )}
              </Box>
            )}
            {/* <RadioGroup onChange={setValue} value={value}>
              <Flex gap={12} fontSize={'xl'}>
                <Radio value="1">
                  <FormattedMessage id="rounded" />
                </Radio>
                <Radio value="2">
                  <FormattedMessage id="rectangle" />
                </Radio>
              </ˀFlex>
            </RadioGroup> */}
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
};

const FaviconPickerSection = ({ loading, theme }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState([]);
  const imageRef = useRef(null);
  const [value, setValue] = useState('1');

  useEffect(() => {
    if (theme.favicon) {
      setSelectedImage(theme.favicon);
    }
  }, [theme]);

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    // Check if the file size is less than 1MB
    if (file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = e => {
        // const img = new Image();
        // img.src = e.target.result;
        setSelectedImage(e.target.result);
        // img.onload = () => {
        //   setImageDimensions({ width: img.width, height: img.height });
        // };
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size should be less than 1MB.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Allow only image files
    multiple: false, // Allow only single file upload
  });
  return (
    <Flex
      borderColor={'gray.300'}
      h={'full'}
      p={6}
      bgColor={'#F2F2F2'}
      rounded={'20px'}
      boxShadow={'xl'}
    >
      <Stack spacing={8} w={'full'} alignItems={'start'}>
        <Text
          w={'full'}
          borderBottom={'2px solid black'}
          mb={4}
          fontSize="xl"
          fontWeight={600}
        >
          Favicon
        </Text>
        <Flex w={'full'} justifyContent={'center'}>
          {loading ? (
            <Skeleton w={150} h={150} />
          ) : (
            <Box
              {...getRootProps()}
              p={4}
              border="2px dashed"
              borderColor="gray.200"
              textAlign="center"
              w={'150px'}
              h={'150px'}
              cursor={'pointer'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={'gray.500'}
              mx={'auto'}
            >
              <input {...getInputProps()} />
              {selectedImage ? (
                <Box w={'full'} h={'full'} position={'relative'}>
                  <Image
                    src={selectedImage}
                    alt="Thumbnail"
                    maxW="full"
                    maxH="full"
                  />
                  <IconButton
                    position={'absolute'}
                    top={'-25px'}
                    right={'-25px'}
                    bg={'gray.400'}
                    rounded={'full'}
                    color={'white'}
                    size={'xs'}
                    _hover={{
                      bg: 'gray.500',
                    }}
                  >
                    <BiSolidPencil size={14} />
                  </IconButton>
                </Box>
              ) : (
                <Stack alignItems={'center'}>
                  <FaUpload size={60} />
                  <Text color={'gray.700'} fontSize={'sm'}>
                    <FormattedMessage id="clickHereToDropAFileOrUpload" />
                  </Text>
                </Stack>
              )}
            </Box>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

const TypographySelectorSection = ({ loading, theme }) => {
  return (
    <Stack
      boxShadow={'xl'}
      p={6}
      rounded={'20px'}
      bgColor={'#F2F2F2'}
      h={'100%'}
      w={'full'}
      minH={'100%'}
    >
      <Text borderBottom={'2px solid black'} fontSize="xl" fontWeight={600}>
        Typography:
      </Text>
      <Stack flex={1} justifyContent={'start'} spacing={8}>
        <Grid gap={'20px'} templateColumns={'1fr'}>
          {Object.keys(theme.typography).map(key => (
            <GridItem key={key}>
              <TypographySelector loading={loading} theme={theme} label={key} />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

const TypographySelector = ({ label, loading, theme }) => {
  const [font, setFont] = useState('Raleway');

  const options = [
    {
      value: 'Raleway',
      label: 'Raleway',
    },
    {
      value: 'Roboto',
      label: 'Roboto',
    },
    {
      value: 'Montserrat',
      label: 'Montserrat',
    },
    {
      value: 'Oswald',
      label: 'Oswald',
    },
  ];

  return (
    <Stack maxW={'440.52px'}>
      <Text fontSize={'xl'}>
        <FormattedMessage id={label} />:
      </Text>
      {loading ? (
        <Skeleton h={40.2} w={'full'} />
      ) : (
        <ReactSelect
          defaultValue={options.find(
            option => option.value === theme.typography[label]
          )}
          options={options}
          formatOptionLabel={lang => (
            <Text fontFamily={lang.value}>{lang.label}</Text>
          )}
        />
      )}
    </Stack>
  );
};

const ColorsSelectorSection = ({ loading, theme }) => {
  return (
    <Stack boxShadow={'xl'} p={6} rounded={'20px'} backgroundColor={'#F2F2F2'}>
      <Text
        fontSize="xl"
        borderBottom={'2px solid black'}
        mb={4}
        fontWeight={600}
      >
        <FormattedMessage id="colors" />:
      </Text>
      <Grid
        templateColumns={'1fr'}
        rowGap={6}
        columnGap={8}
        templateRows={'auto auto auto'}
        w={'100%'}
      >
        {Object.keys(theme.colors).map(key => (
          <GridItem key={key}>
            <ColorSelector loading={loading} label={key} theme={theme} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};

const ColorSelector = ({ label, loading, theme }) => {
  const [darkMode, setDarkMode] = useState(theme.colors[label].dark);
  const [lightMode, setLightMode] = useState(theme.colors[label].light);

  useEffect(() => {
    setDarkMode(theme.colors[label].dark);
    setLightMode(theme.colors[label].light);
  }, [theme]);

  return (
    <Flex justifyContent={'space-between'} gap={'25px'} alignItems={'center'}>
      <Stack spacing={2}>
        <Text>
          <FormattedMessage id={label} />:
        </Text>
        <Text fontSize={'xs'} maxW={'50%'} color={'gray.600'}>
          <FormattedMessage id="ctxt" />
        </Text>
      </Stack>
      <Flex gap={0} spacing={0}>
        {loading ? (
          <Box>
            <Skeleton height={33} w={100} rounded={'10px'} />
          </Box>
        ) : (
          <>
            <Popover>
              <PopoverTrigger>
                <Box
                  h={'33px'}
                  // cursor={"url('color-picker.png'), auto"}
                  cursor={'pointer'}
                  as="button"
                  w={'50px'}
                  roundedLeft={'10px'}
                  bg={darkMode}
                ></Box>
              </PopoverTrigger>
              <PopoverContent w={'fit-content'}>
                <SketchPicker
                  color={darkMode}
                  onChangeComplete={color => setDarkMode(color.hex)}
                  width="200px"
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  h={'33px'}
                  cursor={'pointer'}
                  as="button"
                  w={'50px'}
                  roundedRight={'10px'}
                  bg={lightMode}
                ></Box>
              </PopoverTrigger>
              <PopoverContent w={'fit-content'}>
                <SketchPicker
                  color={lightMode}
                  onChangeComplete={color => setLightMode(color.hex)}
                  width="200px"
                />
              </PopoverContent>
            </Popover>
          </>
        )}
      </Flex>
    </Flex>
  );
};

const BackgroundSelector = () => {
  const [type, setType] = useState('color');
  const [selected, setSelected] = useState(null);

  return (
    <Stack>
      <Select
        value={type}
        onChange={e => {
          setType(e.target.value);
        }}
        w={'200px'}
      >
        <option value="color">Color</option>
        <option value="pattern">Pattern</option>
      </Select>
      <Flex
        gap={4}
        border={'2px solid'}
        borderColor={'gray.200'}
        rounded={'33px'}
        p={8}
        key={selected}
        backgroundImage={type === 'pattern' ? `url(${selected})` : ''}
        backgroundColor={type === 'color' ? selected : ''}
        minH={'80vh'}
      >
        {type === 'color'
          ? ['blue', 'yellow', 'red'].map(color => (
              <Box
                width={'400px'}
                height={'400px'}
                key={color}
                bg={color}
                cursor={'pointer'}
                onClick={() => {
                  setSelected(color);
                }}
                border={'2px solid'}
                rounded="33px"
                borderColor={'gray.100'}
              ></Box>
            ))
          : ['blue.png', 'yellow.png', 'zig-zag.png'].map(img => (
              <Image
                onClick={() => {
                  setSelected(img);
                }}
                cursor={'pointer'}
                key={img}
                src={img}
                width={'400px'}
                height={'400px'}
                border={'2px solid'}
                rounded="33px"
                borderColor={'gray.100'}
              />
            ))}
      </Flex>
    </Stack>
  );
};

const LogoSelector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState([]);
  const imageRef = useRef(null);

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    // Check if the file size is less than 1MB
    if (file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = e => {
        imageRef.current.src = e.target.result;
        setImageDimensions(imageRef.current.width, imageRef.current.height);
        setSelectedImage(e.target.result);
        console.log(e.target.result);
        // const img = new Image();
        // img.src = e.target.result;
        // img.onload = () => {
        //   setImageDimensions({ width: img.width, height: img.height });
        // };
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size should be less than 1MB.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Allow only image files
    multiple: false, // Allow only single file upload
  });

  return (
    <Box>
      <img hidden ref={imageRef} alt="" />
      <Box
        {...getRootProps()}
        p={4}
        border="2px dashed"
        borderColor="gray.200"
        textAlign="center"
        w={'200px'}
        cursor={'pointer'}
      >
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select one.</p>
      </Box>
      {selectedImage && (
        <Box mt={4}>
          {/* <Text mb={2}>
            Dimensions: {imageDimensions[0]}px x {imageDimensions[1]}px
          </Text> */}
          <Image
            src={selectedImage}
            alt="Thumbnail"
            maxW="400px"
            maxH="400px"
          />
        </Box>
      )}
    </Box>
  );
};

const FontSelector = () => {
  const [font, setFont] = useState('Raleway');

  return (
    <Stack maxW={'50vw'}>
      <Text fontFamily={font}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet iure vero
        reprehenderit hic corporis nobis provident sint magni atque iste quo
        necessitatibus quam facere aspernatur nostrum sed, perferendis beatae
        libero.
      </Text>
      <Select
        onChange={e => {
          setFont(e.target.value);
        }}
        defaultValue={font}
        value={font}
        w={'200px'}
      >
        <option value="Raleway">Raleway</option>
        <option value="Roboto">Roboto</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Oswald">Oswald</option>
      </Select>
    </Stack>
  );
};

const Primary = () => {
  const [color, setColor] = useState('#000');

  return (
    <Stack>
      <Text>Primary - {color}</Text>
      <Popover>
        <PopoverTrigger>
          <Stack w="130px" cursor={'pointer'}>
            <Box bg={color} w={'130px'} h={'70px'}></Box>
          </Stack>
        </PopoverTrigger>
        <PopoverContent>
          <SketchPicker
            color={color}
            onChangeComplete={color => setColor(color.hex)}
          />
        </PopoverContent>
      </Popover>
    </Stack>
  );
};
const Secondary = () => {
  const [color, setColor] = useState('#000');

  return (
    <Stack>
      <Text>Secondary - {color}</Text>
      <Popover>
        <PopoverTrigger>
          <Stack w="130px" cursor={'pointer'}>
            <Box bg={color} w={'130px'} h={'70px'}></Box>
          </Stack>
        </PopoverTrigger>
        <PopoverContent>
          <SketchPicker
            color={color}
            onChangeComplete={color => setColor(color.hex)}
          />
        </PopoverContent>
      </Popover>
    </Stack>
  );
};
const Tertiary = () => {
  const [color, setColor] = useState('#000');

  return (
    <Stack>
      <Text>Tertiary - {color}</Text>
      <Popover>
        <PopoverTrigger>
          <Stack w="130px" cursor={'pointer'}>
            <Box bg={color} w={'130px'} h={'70px'}></Box>
          </Stack>
        </PopoverTrigger>
        <PopoverContent>
          <SketchPicker
            color={color}
            onChangeComplete={color => setColor(color.hex)}
          />
        </PopoverContent>
      </Popover>
    </Stack>
  );
};
