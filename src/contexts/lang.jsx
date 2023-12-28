import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import es from '../utils/lang/es.js';
import en from '../utils/lang/en.js';

export const LangContext = React.createContext();

const LangProvider = props => {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState('en');

  // useEffect(() => {
  //   const langQuery = new window.URLSearchParams(window.location.search).get(
  //     'lang'
  //   );

  //   if (langQuery && (langQuery === 'en' || langQuery === 'es')) {
  //     setLocale(langQuery);
  //     setMessages(langQuery === 'en' ? en : es);
  //   }

  //   console.log(langQuery);
  // }, []);

  const setLanguage = newLocale => {
    // newLocale = 'es';
    console.log(newLocale, 'setting new locale');
    return new Promise((resolve, reject) => {
      if (newLocale) {
        switch (newLocale) {
          case 'es':
            setLocale('es');
            setMessages(es);
            break;

          default:
            setLocale('en');
            setMessages(en);
            break;
        }
      } else {
        setLocale(navigator.language);
        if (navigator.language === 'es') {
          setMessages(es);
        } else setMessages(en);
      }
      resolve();
    });
  };

  return (
    <LangContext.Provider value={{ locale, setLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </LangContext.Provider>
  );
};

export default LangProvider;
