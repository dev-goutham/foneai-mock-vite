import {
  Card,
  Stack,
  Icon,
  Text,
  Check,
  Box,
  chakra,
  useRadio,
} from '@chakra-ui/react';
import {
  MdAddCircleOutline,
  MdAudiotrack,
  MdCircle,
  MdOutlineAudiotrack,
  MdOutlineCircle,
} from 'react-icons/md';
import { useCheckGroup, useCheckbox } from '@chakra-ui/react';
import { FaRecycle } from 'react-icons/fa';
import { TiFlowChildren } from 'react-icons/ti';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

export function IntentCheckboxCard(props) {
  const { intentName, intentType, ...checkboxProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useCheckbox(checkboxProps);
  return (
    <chakra.label {...htmlProps}>
      <input {...getInputProps({})} hidden />
      <Card
        key={props.id}
        width={'160px'}
        borderRadius="20px"
        borderWidth={state.isChecked ? '5px' : '2px'}
        borderColor={state.isChecked ? 'blue' : 'gray.300'}
        height="160px"
        padding={'8px'}
        color={state.isChecked ? 'blue.600' : 'gray.500'}
        {...getCheckboxProps()}
      >
        <Stack
          direction="column"
          justify="flex-start"
          align="flex-start"
          spacing="20%"
        >
          <Stack
            direction="row"
            justify="flex-start"
            align="center"
            spacing="80px"
          >
            <Stack
              direction="row"
              justify="flex-start"
              align="center"
              padding={1}
              spacing="2px"
            >
              {/* <Tag
                size={'md'}
                variant="subtle"
                colorScheme={
                  state.isChecked
                    ? intentType === 'flowing'
                      ? 'green'
                      : 'red'
                    : 'gray.100'
                }
              >
                <TagLeftIcon
                  boxSize="12px"
                  as={intentType === 'flowing' ? TiFlowChildren : FaRecycle}
                />
                <TagLabel>
                  <FormattedMessage
                    id={intentType === 'flowing' ? 'flowing' : 'ebbing'}
                  />
                </TagLabel>
              </Tag> */}
            </Stack>
          </Stack>

          <Text
            fontFamily="Inter"
            noOfLines={3}
            lineHeight="1.3"
            fontWeight="semibold"
            fontSize="20px"
            width="268px"
            height="84px"
            px={'6px'}
            maxWidth="100%"
            verticalAlign="center"
          >
            {intentName}
          </Text>
        </Stack>
      </Card>
    </chakra.label>
  );
}

export function WebhookCheckboxCard(props) {
  const { webhookName, ...radioProps } = props;
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  console.log(webhookName);
  return (
    <chakra.label {...htmlProps}>
      <input {...getInputProps({})} hidden />
      <Card
        key={props.id}
        width={'160px'}
        borderRadius="20px"
        borderWidth={state.isChecked ? '5px' : '2px'}
        borderColor={state.isChecked ? 'blue' : 'gray.300'}
        height="160px"
        padding={'8px'}
        color={state.isChecked ? 'blue.600' : 'gray.500'}
        {...getRadioProps()}
      >
        <Stack
          direction="column"
          justify="flex-start"
          align="flex-start"
          spacing="20%"
        >
          <Stack
            direction="row"
            justify="flex-start"
            align="center"
            spacing="80px"
          >
            <Stack
              direction="row"
              justify="flex-start"
              align="center"
              padding={1}
              spacing="2px"
            ></Stack>
          </Stack>

          <Text
            fontFamily="Inter"
            noOfLines={3}
            lineHeight="1.3"
            fontWeight="semibold"
            fontSize="20px"
            width="268px"
            height="84px"
            px={'6px'}
            maxWidth="100%"
            verticalAlign="center"
          >
            {webhookName}
          </Text>
        </Stack>
      </Card>
    </chakra.label>
  );
}

export function PlayCheckboxCard(props) {
  const { audioFileName, ...checkboxProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useCheckbox(checkboxProps);
  const fileNameWithoutExtension = audioFileName
      .split('.')
      .slice(0, -1)
      .join('.'),
    extension = audioFileName.split('.').pop().toUpperCase();

  return (
    <chakra.label {...htmlProps}>
      <input disabled={props.disabled} {...getInputProps({})} hidden />
      <Card
        key={props.id}
        width={'150px'}
        borderRadius="20px"
        borderWidth={state.isChecked ? '5px' : '2px'}
        borderColor={state.isChecked ? 'blue' : 'gray.300'}
        height="150px"
        padding={'8px'}
        color={state.isChecked ? 'blue.600' : 'gray.500'}
        {...getCheckboxProps()}
      >
        <Stack
          direction="column"
          justify="flex-start"
          align="flex-start"
          spacing="20%"
        >
          <Stack
            direction="row"
            justify="flex-start"
            align="center"
            spacing="80px"
          >
            <Stack
              direction="row"
              justify="flex-start"
              align="center"
              padding={1}
              spacing="2px"
            >
              <Tag
                size={'md'}
                variant="subtle"
                colorScheme={state.isChecked ? 'blue.200' : 'gray.100'}
              >
                <TagLeftIcon boxSize="12px" as={MdAudiotrack} />
                <TagLabel>{extension?.toUpperCase()}</TagLabel>
              </Tag>
            </Stack>
          </Stack>

          <Text
            fontFamily="Inter"
            noOfLines={3}
            lineHeight="1.3"
            fontWeight="semibold"
            fontSize="20px"
            width="268px"
            height="84px"
            px={'6px'}
            maxWidth="100%"
            verticalAlign="center"
          >
            {fileNameWithoutExtension}
          </Text>
        </Stack>
      </Card>
    </chakra.label>
  );
}
