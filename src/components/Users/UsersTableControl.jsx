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
import { usersTableColumns } from './contants';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const allColumns = {
  username: 'Username',
  fullname: 'Full Name',
  organization: 'Organization',
  usedUtilization: 'Used Utilization',
  allocatedUtilization: 'Allocated Utilization',
  allocatedNextCycle: 'Allocated Next Cycle',
  billingReviewsOn: 'Billing Reviews on',
};

export function UsersTableControl({
  setVisibleColumns,
  visibleColumns,
  searchTerm,
  setSearchTerm,
}) {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: visibleColumns,
  });
  useEffect(() => {
    const columns = Object.keys(usersTableColumns).filter(col =>
      value.includes(col)
    );
    setVisibleColumns(columns);
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
                      {Object.keys(allColumns).map(col => (
                        <Flex
                          // py={2}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          key={col}
                        >
                          <Text>{allColumns[col]}</Text>
                          <CustomCheckbox
                            {...getCheckboxProps({
                              value: col,
                              text: allColumns[col],
                            })}
                          />
                        </Flex>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
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
      maxW="40"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="green.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg="green.500" />}
      </Flex>
    </chakra.label>
  );
}
