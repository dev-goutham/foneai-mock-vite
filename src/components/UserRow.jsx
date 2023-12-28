import React from 'react';
import { GrMoney } from 'react-icons/gr';
import { FaUserEdit } from 'react-icons/fa';
import {
  Button,
  Flex,
  IconButton,
  Progress,
  Spacer,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { UsersModal } from './Users/UserModal2';

export default function UserRow({ visibleColumns, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hovered, setHovered] = React.useState(false);

  // let renewDate = billingReviewsOn;

  let usedRatio = (props.usedUtilization / props.allocatedUtilization) * 100;
  // if (renewDate === 1) {
  //   renewDate = renewDate + 'st';
  // } else if (renewDate === 2) {
  //   renewDate = renewDate + 'nd';
  // } else if (renewDate === 3) {
  //   renewDate = renewDate + 'rd';
  // } else {
  //   renewDate = renewDate + 'th';
  // }

  return (
    <>
      <Tr
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        bg={hovered ? 'primary.100' : 'gray.50'}
      >
        {visibleColumns.map((col, i) => {
          if (col === 'usage') {
            return (
              <Td key={col}>
                <Progress
                  transform={'rotate(-90deg)'}
                  width="30px"
                  height="20px"
                  colorScheme={usedRatio > 70 ? 'red' : 'green'}
                  value={100 - usedRatio}
                />
              </Td>
            );
          } else if (col === 'actions') {
            return (
              <Td
                pos={'sticky'}
                zIndex={500}
                bg={hovered ? 'primary.200' : 'gray.100'}
                right={0}
                key={col}
              >
                <Flex justifyContent={'center'}>
                  <IconButton
                    onClick={() => {
                      onOpen();
                    }}
                    colorScheme="primary"
                    variant="outline"
                    size="md"
                  >
                    <FaUserEdit />
                  </IconButton>
                </Flex>
              </Td>
            );
          } else {
            return (
              <Td
                position={i === 0 ? 'sticky' : 'relative'}
                left={0}
                align="left"
                key={col}
                bgColor={
                  i === 0 && hovered
                    ? 'primary.200'
                    : i === 0 && !hovered
                    ? 'gray.100'
                    : ''
                }
                zIndex={i === 0 ? 500 : 0}
              >
                {props[col]}
              </Td>
            );
          }
        })}
      </Tr>
      <UsersModal
        mode="update"
        isOpen={isOpen}
        onClose={onClose}
        firstName={props.fullname.split(' ')[0]}
        lastName={props.fullname.split(' ')[1]}
        organization={props.organization}
        billingReviewsOn={props.billingReviewsOn}
        username={props.username}
        organizationRole={props.organizationRole}
        minutesAllocated={props.allocatedNextCycle}
        email={props.email}
      />
    </>
  );
}
