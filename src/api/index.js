import API, { MOCK_API } from './API';
import { v4 as uuid } from 'uuid';
import { data as dbData } from '../data/db';
import { serializeAxiosError } from '../utils/serializeAxiosError';

export async function testApi(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, Math.min(seconds, 1) * 1000);
  });
}

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export async function login(username, password) {
  // try {
  //   let response = await API.post('/login', { username, password });
  //   return { data: response.data, errors: null };
  // } catch (error) {
  //   console.error('Error:', error);
  //   return { data: null, errors: serializeAxiosError(error) };
  // }
  await delay(1500);
  return {
    data: {
      _id: '647f1cf006ba486826ac4cd5',
      username: 'demouser',
      email: 'john@example.com',
      role: 'admin',
      firstName: 'John',
      lastName: 'Smith',
      channels: 1,
      createdAt: '2023-06-06T11:48:00.559Z',
      updatedAt: '2023-09-08T08:42:08.743Z',
      __v: 0,
      consoleLanguage: 'en',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2YxY2YwMDZiYTQ4NjgyNmFjNGNkNSIsInVzZXJuYW1lIjoiZGVtb3VzZXIiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJTbWl0aCIsImNvbnNvbGVMYW5ndWFnZSI6ImVuIiwicm9sZSI6IjEwMCIsImlhdCI6MTY5NzQ0NDc3OCwiZXhwIjoxNjk4MDQ5NTc4fQ.RUoxyB1fxEOza5xxyoOLewjHhykZMOg13-gHTdeUWxE',
    },
  };
}

export async function getUserInfo() {
  try {
    // let response = await API.get('/user');
    return {
      _id: '647f1cf006ba486826ac4cd5',
      username: 'demouser',
      email: 'john@example.com',
      role: 'admin',
      firstName: 'John',
      lastName: 'Smith',
      // channels: 1,
      createdAt: '2023-06-06T11:48:00.559Z',
      updatedAt: '2023-09-08T08:42:08.743Z',
      __v: 0,
      consoleLanguage: 'en',
    };
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function setConsoleLanguage(newLocale) {
  try {
    let response = await API.post('/user/setConsoleLanguage', {
      consoleLanguage: newLocale,
    });
    if (response.status === 200) {
      return response.data;
    } else alert('Error setting language');
  } catch (error) {
    console.error('Error:', error);
    alert('Error setting language');
  }
}
export async function getBots() {
  try {
    const data = dbData.bots;
    await delay(1000);
    return data;
  } catch (err) {
    console.log('error');
    return err;
  }
}

export async function getBot(botId) {
  try {
    const bot = dbData.bots.find(b => b._id === botId);
    if (bot) {
      return bot;
    } else return {};
  } catch (err) {
    return err;
  }
}

export async function createBot(bot) {
  try {
    const id = uuid();
    await delay(1000);
    const botObj = {
      username: 'demouser',
      name: bot.name,
      description: bot.description,
      gender: bot.gender,
      language: bot.language,
      accent: bot.accent,
      deployed: false,
      trained: false,
      _id: id,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };
    dbData.bots.push(botObj);
    let response = dbData.bots;
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
}

export async function getIntents(botId) {
  try {
    await delay(1000);
    return dbData.intents.filter(i => {
      return i.botId === botId;
    });
  } catch (err) {
    return err;
  }
}

export async function createIntent(botId, intent) {
  try {
    await delay(1000);
    const id = uuid();
    const intentObj = {
      _id: id,
      id,
      botId,
      intentName: intent.intentName,
      intentDescription: intent.intentDescription,
      intentType: intent.intentType,
      ebbShift: intent.ebbShift,
      ebbAction: intent.ebbAction,
      payload: intent.payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    const phrasesPromises = intent.phrases.map(p => {
      const pId = uuid();
      return {
        ...p,
        _id: pId,
        id: pId,
        intentId: id,
        __v: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
    // console.clear();
    dbData.intents.push(intentObj);
    dbData.phrases.push(...phrasesPromises);
    const response = dbData.intents.find(i => i._id === id);
    // const response =
    // let response = await API.post(`/bots/${botId}/intents/create`, intent);
    // console.log(response);
    // return response;
    return {
      status: 201,
      data: response,
    };
  } catch (err) {
    return err;
  }
}

export async function updateIntent(botId, intent) {
  try {
    await delay(1000);

    const { phrases } = intent;
    // const data = await MOCK_API.get(`/phrases?intentId=${intent._id}`);
    const data = dbData.phrases.filter(p => p.intentId === intent._id);
    const promises = [];
    phrases.forEach(p => {
      const phrase = data.find(ph => ph.phraseId === p.phraseId);
      if (!phrase) {
        const id = uuid();
        promises.push(
          dbData.phrases.push({
            ...p,
            id,
            _id: id,
            intentId: intent._id,
          })
        );
      }
    });
    data.forEach(d => {
      const p = phrases.find(ph => ph.phraseId === d.phraseId);
      if (!p) {
        const phraseIdx = dbData.phrases.findIndex(
          ph => ph.phraseId === d.phraseId
        );
        dbData.phrases.splice(phraseIdx, 1);
      }
    });
    const idx = dbData.intents.findIndex(i => i._id === intent._id);
    dbData.intents[idx] = { ...dbData.intents[idx], ...intent };
    return {
      status: 200,
      data: dbData.intents.find(i => i._id === intent._id),
    };
  } catch (err) {
    return err;
  }
}

export async function getBotName(botId) {
  try {
    const bot = dbData.bots.find(b => b._id === botId);
    if (bot) {
      return bot.name;
    } else return 'Untitled';
  } catch (err) {
    return err;
  }
}

//TODO: update bot
export async function updateBot(botId, bot) {
  const idx = dbData.bots.findIndex(b => b._id === botId);
  dbData.bots[idx] = { ...dbData.bots[idx], ...bot };
  return bot;

  // let response = await MOCK_API.put(`/bots/${botId}`, {
  //   ...data,
  //   ...bot,
  // });
  // return response.data;
}

export async function setFallback(botId, fallback) {
  const botIdx = dbData.bots.findIndex(b => b._id === botId);
  dbData.bots[botIdx].fallback = fallback;
  return {};
  // const bot = await getBot(botId);
  // const response = await MOCK_API.put(`/bots/${bot._id}`, { ...bot, fallback });
  // // let response = await API.post(`/bots/${botId}/setFallback`, { fallback });
  // return response;
}

export async function getFallback(botId) {
  let response = await API.get(`/bots/${botId}/getFallback`);
  return response.data;
}

export async function trainBot(botId) {
  // let response = await API.post(`/bots/${botId}/train`);
  // if (response.status === 200) return response.data;
  await delay(1000);
  const botIdx = dbData.bots.findIndex(b => b._id === botId);
  dbData.bots[botIdx].trained = true;
  return null;
}

export async function saveOverview({ params, request }) {
  await fakeNetwork();
  console.log(params, request);

  // let bots = await localforage.getItem("bots");
  // let botExists = bots.some((bot) => bot.id === bot.id);
  // if(botExists) {
  //   // update bot
  //   console.log('bot updated')
  // } else {
  //   // create bot
  //   console.log('bot created')
  // }
}

export async function getPhrases(intentId, botId, batch) {
  try {
    // const { data } = await MOCK_API.get(
    //   `/phrases?botId=${botId}&intentId=${intentId}`
    // );
    const data = dbData.phrases.filter(p => p.intentId === intentId);
    // let phrases = await API.get(`/bots/${botId}/intents/${intentId}/phrases`);
    // console.log({ mock: data, real: phrases.data });
    return data || [];
  } catch (err) {
    return err;
  }
}

export async function getFlowElements(botId) {
  // const { data } = await MOCK_API.get(`/flow?botId=${botId}`);
  const data = dbData.flow.filter(f => f.botId === botId);
  console.log(data);
  if (!data || data.length === 0) return null;
  return data[0];
}

export async function setFlowElements(botId, flowElements) {
  const id = uuid();
  const username = 'demouser';
  const flow = await getFlowElements(botId);
  if (!flow) {
    dbData.flow.push({
      ...flowElements,
      _id: id,
      id,
      username,
      botId,
    });
  } else {
    const idx = dbData.flow.findIndex(f => f.botId === botId);
    // console.clear();
    // console.log(dbData.flow.filter(f => f.botId === botId));
    console.log(flow);
    console.log({ ...flow, ...flowElements });
    dbData.flow[idx] = { ...flow, ...flowElements };
    console.log(dbData.flow);
  }
  // let response = await API.post(`/bots/${botId}/flow`, flowElements);
  // if (response) return null;
  return null;
  // return response.data;
}

export async function getAudioFiles() {
  // let audioFiles = await API.get(`/audioFiles`);
  // console.log(audioFiles);
  // if (!audioFiles) return null;
  // if (audioFiles.data.length === 0) return [];
  // return audioFiles.data;
  return [
    {
      Key: 'greeting.wav',
      LastModified: '2023-07-03T15:54:23.000Z',
      ETag: '"dbc3e06588090d4919d22802aa040824"',
      Size: 24596,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'goodbye.wav',
      LastModified: '2023-07-03T23:51:41.000Z',
      ETag: '"d7a0f5eb5e783495b32c084e0eda89b5"',
      Size: 24562,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'hola.wav',
      LastModified: '2023-07-03T15:54:23.000Z',
      ETag: '"dbc3e06588090d4919d22802aa040824"',
      Size: 24596,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'adiós.wav',
      LastModified: '2023-07-03T23:51:41.000Z',
      ETag: '"d7a0f5eb5e783495b32c084e0eda89b5"',
      Size: 24562,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'ambient_music.wav',
      LastModified: '2023-07-03T15:54:23.000Z',
      ETag: '"dbc3e06588090d4919d22802aa040824"',
      Size: 24596,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'transfer_music.wav',
      LastModified: '2023-07-03T23:51:41.000Z',
      ETag: '"d7a0f5eb5e783495b32c084e0eda89b5"',
      Size: 24562,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'hold_music.wav',
      LastModified: '2023-07-03T15:54:23.000Z',
      ETag: '"dbc3e06588090d4919d22802aa040824"',
      Size: 24596,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'upsell.wav',
      LastModified: '2023-07-03T23:51:41.000Z',
      ETag: '"d7a0f5eb5e783495b32c084e0eda89b5"',
      Size: 24562,
      StorageClass: 'STANDARD',
    },
  ];
}

export async function audiofFileExists(fileName) {
  try {
    let response = await API.post(`/audioFiles/checkFileExists`, { fileName });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Error checking file');
    }
  } catch (err) {
    return err;
  }
}

export async function uploadAudioFile(file) {
  console.log(file);
  try {
    let response = await API.post(`/audioFiles/upload`, {
      fileName: file.name,
    });
    console.log(response);
    if (response && response.status === 200) {
      console.log(response.data.url);
      let formData = new FormData();
      formData.append('File', file);
      console.log(formData);
      let res = await fetch(response.data.url, {
        method: 'PUT',
        body: formData,
      });
      console.log(res);
      if (res.status === 200) {
        return true;
      }
    } else {
      throw new Error('Error uploading file');
    }
  } catch (err) {
    return false;
  }
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}

export const deleteIntent = async (botId, intentId) => {
  dbData.intents = dbData.intents.filter(i => i._id !== intentId);
};

export const deletePhrase = async phraseId => {
  dbData.phrases = dbData.phrases.filter(p => p._id !== phraseId);
};

export const getEntities = async () => {
  await delay(1500);

  return [
    'food',
    'clothing',
    'something',
    'else',
    'nothing',
    'food',
    'clothing',
    'something',
    'else',
    'nothing',
    'food',
  ];
};

export const getRoles = async () => {
  await delay(1500);

  return [
    'test',
    'test 2',
    'test 3',
    'test 4',
    'nothing',
    'test',
    'test 2',
    'test 3',
    'test 4',
    'nothing',
    'test',
    'test 2',
    'test 3',
    'test 4',
    'nothing',
    'test',
    'test 2',
    'test 3',
    'test 4',
    'nothing',
  ];
};

export const getGroups = async () => {
  await delay(1500);

  return [
    'group1',
    'group2',
    'group3',
    'group1',
    'group2',
    'group3',
    'group1',
    'group2',
    'group3',
    'group1',
    'group2',
    'group3',
    'group1',
    'group2',
    'group3',
  ];
};

export const getWebhooks = async () => {
  await delay(1000);

  return dbData.webhooks;
};

export const getTheme = async () => {
  await delay(1000);
  return {
    colors: {
      primary: {
        light: '#e0e0e0',
        dark: '#000000',
      },
      secondary: {
        light: '#ff4081',
        dark: '#c51162',
      },
      success: {
        light: '#4caf50',
        dark: '#1b5e20',
      },
      warning: {
        light: '#ff9800',
        dark: '#e65100',
      },
      error: {
        light: '#f44336',
        dark: '#b71c1c',
      },
      info: {
        light: '#2196f3',
        dark: '#0d47a1',
      },
    },
    typography: {
      heading: 'Raleway',
      normal: 'Roboto',
      subtext: 'Montserrat',
      buttons: 'Oswald',
    },
    logo: `https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg`,
    favicon: `https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg`,
    title: 'Test Title',
  };
};

export const getBuiltIn = async () => {
  await delay(1000);

  return ['Date', 'Number', 'Time'];
};

export const getProfile = async () => {
  await delay(1000);
  return {
    username: 'John',
    email: 'john@email.com',
    role: 'admin',
    firstName: 'John',
    lastName: 'Smith',
    channels: 1,
    organization: 'John Smith',
    organizationRole: 'CEO',
  };
};

export const changePasswordFunction = async password => {
  await delay(1000);

  return null;
};

export const updateProfileFunction = async user => {
  await delay(1000);
  return null;
};

export const updateEmailFunction = async () => {
  await delay(1000);
  return null;
};

export const getCampaigns = async () => {
  await delay(1000);
  return [
    {
      campaignName: 'Sales Blitz',
      campaignId: 'R3tG7h9P',
      bots: '64c7b921a422a99ae3a1353d',
    },
    {
      campaignName: 'Customer Outreach',
      campaignId: 'qA2fE5zC',
      bots: '64b61202296ce1877b3827d5',
    },
    {
      campaignName: 'Product Promotion',
      campaignId: 'uV6nM1xB',
      bots: '64c7b921a422a99ae3a1353d',
    },
    {
      campaignName: 'Support Drive',
      campaignId: 'sD8pK4lO',
      bots: '64b61202296ce1877b3827d5',
    },
    {
      campaignName: 'Nuevo avance del lanzador',
      campaignId: 'jF9tY2wE',
      bots: '64c7b923a422a99ae3a13533',
    },
    {
      campaignName: 'Satisfacción del servicio',
      campaignId: 'gH7kR3mS',
      bots: '64b61202256ce1877b3827d4',
    },
    {
      campaignName: 'Iniciar llamada en frío',
      campaignId: 'cX5zN6iQ',
      bots: '64c7b923a422a99ae3a13533',
    },
    {
      campaignName: 'Investigación de mercado',
      campaignId: 'lB4vT8oA',
      bots: '64b61202256ce1877b3827d4',
    },
    {
      campaignName: 'Lead Generation',
      campaignId: 'eJ1uI5yF',
      bots: '64c7b923a422a99ae3a13533',
    },
    {
      campaignName: 'Feedback Collection',
      campaignId: 'mP3wH8rD',
      bots: '64b61202296ce1877b3827d5',
    },
  ];
};

export const passwordReset = async () => {
  await delay(1000);
  return null;
};

export async function createUser({
  firstName,
  lastName,
  role,
  organization,
  organizationRole,
  username,
  email,
  password,
  profileLanguage,
  confirmPassword,
}) {
  await delay(1000);
  return { data: null, errors: null };
  // try {
  //   let response = await API.post('/users/create', {
  //     firstName,
  //     lastName,
  //     role,
  //     organization,
  //     username,
  //     email,
  //     password,
  //     profileLanguage,
  //     organizationRole,
  //     confirmPassword,
  //   });
  //   return { data: response.data, errors: {} };
  // } catch (error) {
  //   return { data: null, errors: serializeAxiosError(error) };
  // }
}
