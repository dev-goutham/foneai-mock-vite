import { Box, IconButton, Input } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { useTable } from './TableContext';

export default function TableSearch() {
  const [showSearch, setShowSearch] = useState(false);
  const { searchTerm, setSearchTerm } = useTable();

  return (
    <Box>
      <IconButton
        onClick={() => {
          setShowSearch(pre => !pre);
        }}
      >
        <LiaSearchSolid />
      </IconButton>
      <AnimatePresence>
        {showSearch && (
          <Input
            placeContent={'search'}
            width={'200px'}
            as={motion.input}
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            exit={{ display: 'none' }}
            variant={'filled'}
            background={'white'}
            autoFocus
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}
