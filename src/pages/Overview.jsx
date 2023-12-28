import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Image,
  Spinner,
  Text,
  Box,
  Skeleton,
} from '@chakra-ui/react';
import ReactSelect from 'react-select';
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { MdArrowForward, MdUpdate } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { getBot, updateBot } from '../api';
import { FormattedMessage } from 'react-intl';

export default function Overview() {
  const { botId } = useParams();
  console.log(botId);
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState(null);
  const [language, setLanguage] = useState(bot?.language || 'es');
  const [langChanged, setLangChanged] = useState(false);
  const [accent, setAccent] = useState(bot?.accent);
  const [gender, setGender] = useState(bot?.gender);
  const [accentList, setAccentList] = useState(['MX', 'ES', 'US']);
  const toast = useToast();
  const accents = {
    en: [
      {
        value: 'US',
        label: 'american',
        image: `${process.env.PUBLIC_URL}/us.svg`,
      },
      {
        value: 'GB',
        label: 'british',
        image: `${process.env.PUBLIC_URL}/gb.svg`,
      },
      {
        value: 'AU',
        label: 'australian',
        image: `${process.env.PUBLIC_URL}/au.svg`,
      },
    ],
    es: [
      {
        value: 'MX',
        label: 'latam',
        image: `${process.env.PUBLIC_URL}/mx.svg`,
      },
      {
        value: 'ES',
        label: 'castilian',
        image: `${process.env.PUBLIC_URL}/es.svg`,
      },
      {
        value: 'US',
        label: 'american',
        image: `${process.env.PUBLIC_URL}/us.svg`,
      },
    ],
  };

  const genders = [
    { value: 'm', label: 'male', image: `${process.env.PUBLIC_URL}/male.png` },
    {
      value: 'f',
      label: 'female',
      image: `${process.env.PUBLIC_URL}/female.png`,
    },
  ];

  useEffect(() => {
    getBot(botId).then(res => {
      setBot(res);
      setAccent(res.accent);
      setLanguage(res.language);
      setGender(res.gender);
      setIsLoading(false);
    });
  }, [botId]);

  const languages = [
    { value: 'en', label: 'english' },
    { value: 'es', label: 'spanish' },
  ];
  const navigate = useNavigate();
  const [formDirty, setFormDirty] = useState(false);
  useEffect(() => {
    console.log('language changed', language);
    setLangChanged(true);
    if (language === 'en') {
      setAccentList(['US', 'GB', 'AU']);
    } else {
      setAccentList(['MX', 'ES', 'US']);
    }
    setLangChanged(false);
  }, [language]);

  function submitFn(e) {
    e.preventDefault();
    console.log('submitting');
    let newBot = {
      name: bot.name,
      description: bot.description,
      language: bot.language,
      accent: bot.accent,
      gender: bot.gender,
    };
    console.log('newBot', newBot);

    updateBot(botId, newBot).then(res => {
      console.log(res);
      setBot(res);
      setLanguage(res.language);
      setAccent(res.accent);
      setFormDirty(false);
      setIsLoading(false);
      toast({
        position: 'bottom-right',
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={6}
            fontSize={'3xl'}
            mb={'7'}
            bg="green.500"
            borderRadius={'10px'}
          >
            <FormattedMessage id="botUpdateSuccess" />
          </Box>
        ),
      });
    });
  }
  return (
    <div>
      <form
        method="post"
        id="overview-form"
        onChange={() => setFormDirty(true)}
        onSubmit={submitFn}
      >
        <Stack
          w={'50%'}
          minWidth={'600px'}
          h={'65vh'}
          minH={'600px'}
          bg={'white'}
          borderRadius={'30px'}
          borderColor="gray.300"
          boxShadow={'lg'}
          p={'5rem'}
          m={'auto'}
          mt={'12vh'}
          mb={'10vh'}
          direction={'column'}
        >
          <Stack
            direction={'column'}
            spacing={'2rem'}
            height={'50vh'}
            minH={'450px'}
          >
            <FormControl isRequired>
              <FormLabel>
                <FormattedMessage id="botName" />
              </FormLabel>
              {isLoading ? (
                <Skeleton mb="2rem" height={'38px'} />
              ) : (
                <Input
                  name="botName"
                  type="text"
                  size="md"
                  mb={'2rem'}
                  defaultValue={bot.name}
                  onChange={e => setBot({ ...bot, name: e.target.value })}
                />
              )}
              <Text color={'red.500'} fontSize={'sm'} mb={'2rem'}>
                {/* {errors.botName && 'Bot name is required'} */}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>
                <FormattedMessage id="botDescription" />
              </FormLabel>
              {isLoading ? (
                <Skeleton height={'7rem'} mb={'2rem'} />
              ) : (
                <Textarea
                  name="botDescription"
                  size="md"
                  height={'7rem'}
                  resize={'none'}
                  mb={'2rem'}
                  defaultValue={bot.description}
                  onChange={e =>
                    setBot({ ...bot, description: e.target.value })
                  }
                />
              )}
            </FormControl>

            <Stack direction={'row'} spacing={'2rem'}>
              <FormControl isRequired id="language">
                <FormLabel>
                  <FormattedMessage id="botLanguage" />
                </FormLabel>
                {isLoading ? (
                  <Skeleton h={'38px'} />
                ) : (
                  <ReactSelect
                    isDisabled={true}
                    options={languages}
                    defaultValue={languages.filter(
                      option => option.value === language
                    )}
                    formatOptionLabel={lang => (
                      <Text>
                        <FormattedMessage id={lang.label} />
                      </Text>
                    )}
                  />
                )}
              </FormControl>

              <FormControl isRequired id="accent">
                <FormLabel>
                  <FormattedMessage id="botAccent" />
                </FormLabel>
                {isLoading ? (
                  <Skeleton h={'38px'} />
                ) : (
                  <ReactSelect
                    options={accents[bot.language]}
                    defaultValue={accents[bot.language].filter(
                      option => option.value === accent
                    )}
                    onChange={e => {
                      setAccent(e.value);
                      setBot({ ...bot, accent: e.value });
                      setFormDirty(true);
                    }}
                    formatOptionLabel={accent => (
                      <Flex alignItems={'center'}>
                        <Image
                          src={accent.image}
                          width={'30px'}
                          height={'30px'}
                          mr={'1rem'}
                        />
                        <Text>
                          <FormattedMessage id={accent.label} />
                        </Text>
                      </Flex>
                    )}
                  />
                )}
              </FormControl>

              <FormControl isRequired id="gender">
                <FormLabel>
                  <FormattedMessage id="botVoice" />
                </FormLabel>
                {isLoading ? (
                  <Skeleton h={'38px'} />
                ) : (
                  <ReactSelect
                    options={genders}
                    defaultValue={genders.filter(
                      option => option.value === bot.gender
                    )}
                    onChange={e => {
                      setGender(e.value);
                      setBot({ ...bot, gender: e.value });
                      setFormDirty(true);
                    }}
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
                )}
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
        {formDirty ? (
          <Flex position={'fixed'} bottom={'5%'} right={'5%'}>
            <Button
              leftIcon={
                isLoading ? <Spinner size={'sm'} /> : <MdUpdate size={'30px'} />
              }
              colorScheme="primary"
              variant="solid"
              borderRadius={'full'}
              size="lg"
              boxShadow={'dark-lg'}
              height={'80px'}
              verticalAlign={'middle'}
              type="submit"
            >
              <FormattedMessage id="update" />
            </Button>
          </Flex>
        ) : (
          <Flex position={'fixed'} bottom={'5%'} right={'5%'}>
            <Button
              rightIcon={<MdArrowForward size={'30px'} />}
              colorScheme="primary"
              variant="solid"
              borderRadius={'full'}
              size="lg"
              boxShadow={'dark-lg'}
              height={'80px'}
              verticalAlign={'middle'}
              onClick={() => navigate(`/bots/${bot?._id}/train`)}
              // onClick={handleSubmit}
            >
              <FormattedMessage id="next" />
            </Button>
          </Flex>
        )}
      </form>
    </div>
  );
}
