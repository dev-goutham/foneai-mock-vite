import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  Text,
  Stack,
  Divider,
  useCheckbox,
  chakra,
  useCheckboxGroup,
} from '@chakra-ui/react';
import { LiaSearchSolid } from 'react-icons/lia';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineCheck } from 'react-icons/ai';

export function TableControl({
  setVisibleColumns,
  visibleColumns,
  searchTerm,
  setSearchTerm,
  columns,
  unfilterableColumns,
  disableSearch,
  disableFilter,
}) {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: visibleColumns,
  });
  useEffect(() => {
    const cols = Object.keys(columns).filter(col => value.includes(col));
    setVisibleColumns(cols);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <Box my={11} px={'11vw'}>
      <Flex gap={11} justifyContent={'space-between'}>
        <InputGroup maxW={400}>
          <InputLeftElement pointerEvents="none">
            <LiaSearchSolid />
          </InputLeftElement>
          <Input
            variant={'flushed'}
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            placeholder="Search"
          />
        </InputGroup>
        {!disableFilter && (
          <Popover placement="bottom-end">
            {() => (
              <>
                <PopoverTrigger>
                  <IconButton>
                    <RxHamburgerMenu />
                  </IconButton>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverBody>
                      <Stack divider={<Divider />} px={4}>
                        {Object.keys(columns)
                          .filter(
                            col => !(unfilterableColumns || []).includes(col)
                          )
                          .map(col => (
                            <Box
                              w="full"
                              // py={2}

                              key={col}
                            >
                              <CustomCheckbox
                                {...getCheckboxProps({
                                  value: col,
                                  text: columns[col],
                                })}
                                // disabled={(unfilterableColumns || []).includes(col)}
                              />
                              {/* <Text>{columns[col]}</Text> */}
                            </Box>
                          ))}
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        )}
      </Flex>
    </Box>
  );
}

function CustomCheckbox(props) {
  const { state, getCheckboxProps, getInputProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      // maxW="40"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input disabled={props.disabled} {...getInputProps()} hidden />
      <Flex alignItems={'center'} gap={4} w={'full'}>
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="green.500"
          w={6}
          h={6}
          _disabled={{
            opacity: 0.5,
          }}
          {...getCheckboxProps()}
          sx={{
            svg: {
              h: 4,
              w: 4,
              fill: 'green.500',
            },
          }}
        >
          {state.isChecked && <AiOutlineCheck />}
        </Flex>
        <Text>{props.text}</Text>
      </Flex>
    </chakra.label>
  );
}
