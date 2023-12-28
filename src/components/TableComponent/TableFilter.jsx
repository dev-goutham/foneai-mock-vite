import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  Stack,
  Divider,
  useCheckbox,
  Flex,
  chakra,
  useCheckboxGroup,
  Text,
} from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useTable } from './TableContext';
import { AiOutlineCheck } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';

export default function TableFilter() {
  const { columns, unfilterableColumns, visibleColumns, setVisibleColumns } =
    useTable();

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: visibleColumns,
  });
  useEffect(() => {
    const cols = Object.keys(columns).filter(col => value.includes(col));
    setVisibleColumns(cols);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
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
                    .filter(col => !(unfilterableColumns || []).includes(col))
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
                        >
                          <FormattedMessage id={col} />
                        </CustomCheckbox>
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
          borderColor="primary.500"
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
              fill: 'primary.500',
            },
          }}
        >
          {state.isChecked && <AiOutlineCheck />}
        </Flex>
        <Text>{props.children}</Text>
      </Flex>
    </chakra.label>
  );
}
