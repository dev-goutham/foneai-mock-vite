import React, { useContext, useEffect } from 'react';
import { Tabs, TabList, Tab, Spinner } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LangContext } from '../contexts/lang';
import { BOT_HEADER } from '../data/constants';

export default function BotTabs({ botId }) {
  const location = useLocation();
  const { locale } = useContext(LangContext);
  const [botTabsLoading, setBotTabsLoading] = React.useState(false);

  useEffect(() => {
    // setBotTabsLoading(true);
    console.log('locale', locale);
    if (['en', 'es', 'fr', 'pt'].includes(locale)) {
      console.log('locale', locale);
      setTimeout(() => {
        setBotTabsLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    console.log('location', location.pathname.includes('train'));
  }, [location]);

  return botTabsLoading ? (
    <Spinner
      thickness="2px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="lg"
    />
  ) : (
    <Tabs isFitted variant="unstyled">
      <TabList>
        {BOT_HEADER.map((option, index) => (
          <NavLink
            className={
              location.pathname.includes(option.value) ? 'navLinkActive' : ''
            }
            to={`/bots/${botId}/${option.slug}`}
          >
            <Tab
              // override the defaul selection of the first tab
              isSelected={location.pathname.includes(option.value)}
              // _selected={{ color: 'white', bg: 'blue.500' }}
              width={'135px'}
              px={'50px'}
              backgroundColor={'blue.100'}
              clipPath={
                // if the index is neither first nor last, then the clipPath is a trapezoid
                index !== 0 && index !== BOT_HEADER.length - 1
                  ? 'polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%)'
                  : // if the index is first, then the clipPath is a trapezoid with a right angle
                  index === 0
                  ? 'polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 0% 0%)'
                  : 'polygon(100% 0%, 100% 100%, 0% 100%, 15% 50%, 0% 0%)'
              }
              borderRadius={
                // if the index is neither first nor last, then the borderRadius is 0
                index !== 0 && index !== BOT_HEADER.length - 1
                  ? '0px'
                  : // if the index is first, then the borderRadius is 10px 0px 0px 10px
                  index === 0
                  ? '10px 0px 0px 10px'
                  : '0px 10px 10px 0px'
              }
              marginLeft={
                // if the index is neither first nor last, then the marginLeft is -13px
                index !== 0 ? '-12px' : '0px'
              }
            >
              <FormattedMessage id={option.value} />
            </Tab>
          </NavLink>
        ))}
      </TabList>
    </Tabs>
  );
}
