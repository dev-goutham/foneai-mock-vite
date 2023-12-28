import { createContext, useContext, useEffect, useState } from 'react';
import { trainBot } from '../api';
import { useToast } from '@chakra-ui/react';

const TrainingStatusContext = createContext();

export const TrainingStatusProvider = ({ children }) => {
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let to;
    if (status === 'in-progress') {
      to = setTimeout(() => {
        toast({
          title: 'Training Successful',
          description: 'The bot has been successfully trained',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setStatus('idle');
      }, 5000);
    }

    return () => {
      if (to) {
        clearTimeout(to);
      }
    };
  }, [status, toast]);

  const startTraining = async botId => {
    setLoading(true);
    await trainBot(botId);
    toast({
      title: 'Training Started',
      description:
        'Training has started, and will be notified once it is complete',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    setStatus('in-progress');
    setLoading(false);
  };

  return (
    <TrainingStatusContext.Provider value={{ status, loading, startTraining }}>
      {children}
    </TrainingStatusContext.Provider>
  );
};

export const useTrainingStatus = () => useContext(TrainingStatusContext);
