import { useState, useEffect, useContext } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Spinner,
  Flex,
  Stack,
  Text,
  Divider,
  useToast,
  Image,
  Center,
} from '@chakra-ui/react';
import { createBot } from '../api';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LangContext } from '../contexts/lang';
import ReactSelect from 'react-select';
import * as yup from 'yup';

const createBotSchema = yup.object().shape({
  botName: yup.string().required('BOTNAME_EMPTY'),
  botDescription: yup.string(),
});

export const useCreateBotModalHook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale } = useContext(LangContext);

  const CreateBotModalComponent = () => {
    const navigate = useNavigate();
    const onSubmit = async e => {
      // setIsCreateBotLoading(true)
      const formData = new FormData(e.target);
      let bot = {
        name: formData.get('name'),
        language: formData.get('language'),
        accent: formData.get('accent'),
        description: formData.get('description'),
        gender: formData.get('gender'),
      };
      createBot(bot).then(response => {
        if (response.status === 201) {
          setIsCreateBotLoading(false);
          onClose();
          navigate(`/bots/${response.data._id}/intents`);
        } else {
          alert('error creating bot');
        }
      });
    };
    const [isCreateBotLoading, setIsCreateBotLoading] = useState(false);

    const langdata = [
      {
        name: 'english',
        value: 'en',
        accents: [
          {
            name: 'american',
            value: 'US',
            image: `${process.env.PUBLIC_URL}/us.svg`,
          },
          {
            name: 'british',
            value: 'GB',
            image: `${process.env.PUBLIC_URL}/gb.svg`,
          },
          {
            name: 'australian',
            value: 'AU',
            image: `${process.env.PUBLIC_URL}/au.svg`,
          },
        ],
      },
      {
        name: 'spanish',
        value: 'es',
        accents: [
          {
            name: 'latam',
            value: 'MX',
            image: `${process.env.PUBLIC_URL}/mx.svg`,
          },
          {
            name: 'castilian',
            value: 'ES',
            image: `${process.env.PUBLIC_URL}/es.svg`,
          },
          {
            name: 'american',
            value: 'US',
            image: `${process.env.PUBLIC_URL}/us.svg`,
          },
        ],
      },
    ];
    const genders = [
      {
        value: 'm',
        label: 'male',
        image: `${process.env.PUBLIC_URL}/male.png`,
      },
      {
        value: 'f',
        label: 'female',
        image: `${process.env.PUBLIC_URL}/female.png`,
      },
    ];

    const [lang, setLang] = useState(
      langdata.filter(option => option.value === locale) || null
    );
    const [accent, setAccent] = useState(
      (langdata.filter(lang => lang.value === locale) || [])[0].accents[0]
    );
    const [accentList, setAccentList] = useState(
      langdata.filter(lang => lang.value === locale)[0]?.accents
    );

    const toast = useToast();

    const handleLanguageChange = obj => {
      setLang(obj);
      setAccentList(obj.accents);
      setAccent(obj.accents[0]);
    };

    const handleAccentChange = obj => {
      setAccent(obj);
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={'4xl'}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="30px"
          minW={'750px'}
          height={'735px'}
          width={'80vw'}
        >
          <ModalHeader>
            <FormattedMessage id="createBot" />
          </ModalHeader>
          <ModalCloseButton
            backgroundColor={'red.400'}
            _hover={{ backgroundColor: 'red.600' }}
            borderRadius={'full'}
            mr={-4}
            mt={-4}
          />
          <Divider color={'gray.300'} />
          {isCreateBotLoading ? (
            <ModalBody backgroundColor={'gray.100'}>
              <Flex
                direction={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                height={'50vh'}
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="primary.500"
                  size="xl"
                />
                <Text
                  fontFamily="Inter"
                  lineHeight="1"
                  fontWeight="bold"
                  fontSize="2xl"
                  color="gray.700"
                  maxWidth="60%"
                  textAlign="center"
                  mt={4}
                >
                  <FormattedMessage id="creatingBot" />
                </Text>
              </Flex>
            </ModalBody>
          ) : (
            <form
              method="post"
              id="create-bot-form"
              onSubmit={e => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <ModalBody
                backgroundColor={'gray.50'}
                // backgroundImage={`url(${process.env.PUBLIC_URL}/bg.png)`}
                h={'600px'}
              >
                <Center verticalAlign={'middle'} mt={'2rem'}>
                  <Stack
                    w={'50%'}
                    minWidth={'700px'}
                    h={'500px'}
                    boxShadow={'lg'}
                    verticalAlign={'middle'}
                    p={'3rem'}
                    mt={'2rem'}
                    m={'auto'}
                    backgroundColor={'white'}
                    borderRadius={'10px'}
                    direction={'column'}
                  >
                    <Stack
                      direction={'column'}
                      spacing={'2rem'}
                      height={'500px'}
                      minH={'450px'}
                    >
                      <FormControl isRequired>
                        <FormLabel>
                          <FormattedMessage id="botName" />
                        </FormLabel>
                        <Input name="name" type="text" size="md" mb={'2rem'} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          <FormattedMessage id="botDescription" />
                        </FormLabel>
                        <Textarea
                          name="description"
                          size="md"
                          height={'7rem'}
                          resize={'none'}
                          mb={'2rem'}
                        />
                      </FormControl>

                      <Stack direction={'row'} spacing={'2rem'}>
                        <FormControl isRequired id="language">
                          <FormLabel>
                            <FormattedMessage id="botLanguage" />
                          </FormLabel>

                          <ReactSelect
                            name="language"
                            options={langdata}
                            value={lang}
                            onChange={handleLanguageChange}
                            formatOptionLabel={lang => (
                              <Text>
                                <FormattedMessage id={lang.name} />
                              </Text>
                            )}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>
                            <FormattedMessage id="botAccent" />
                          </FormLabel>
                          <ReactSelect
                            name="accent"
                            options={accentList}
                            value={accent}
                            onChange={handleAccentChange}
                            formatOptionLabel={option => (
                              <Flex alignItems={'center'}>
                                <Image
                                  src={option.image}
                                  width={'30px'}
                                  height={'30px'}
                                  mr={'1rem'}
                                />
                                <Text>
                                  <FormattedMessage id={option.name} />
                                </Text>
                              </Flex>
                            )}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>
                            <FormattedMessage id="botVoice" />
                          </FormLabel>
                          <ReactSelect
                            name="gender"
                            options={genders}
                            defaultValue={genders.filter(
                              option => option.value === 'f'
                            )}
                            formatOptionLabel={gender => (
                              <Flex alignItems={'center'}>
                                <Image
                                  src={gender.image}
                                  width={'30px'}
                                  height={'30px'}
                                  mr={'1rem'}
                                />
                                <Text>
                                  <FormattedMessage id={gender.label} />
                                </Text>
                              </Flex>
                            )}
                          />
                        </FormControl>
                      </Stack>
                    </Stack>
                  </Stack>
                </Center>
              </ModalBody>
              <Divider color={'gray.300'} />

              <ModalFooter>
                <Button colorScheme="primary" mr={3} type="submit">
                  <FormattedMessage id="createBot" />
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return {
    CreateBotModalComponent,
    onOpen,
  };
};
