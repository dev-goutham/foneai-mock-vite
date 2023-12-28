import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/auth';
import LangProvider from './contexts/lang';
import theme from './theme';
import { Helmet } from 'react-helmet';
import { TrainingStatusProvider } from './contexts/trainginStatus';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <Helmet>
      <link rel="icon" type="image/png" href={theme.favicon} />
      <title>{theme.title}</title>
    </Helmet>
    <ColorModeScript />
    <LangProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <TrainingStatusProvider>
            <App />
          </TrainingStatusProvider>
        </AuthProvider>
      </ChakraProvider>
    </LangProvider>
  </StrictMode>
);
