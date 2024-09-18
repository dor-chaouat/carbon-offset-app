import React, { type FC } from 'react';
import {
  Box,
  ColorInput,
  FormField,
  Input,
  NumberInput,
  Text,
} from '@wix/design-system';
import { CouponType, Survey } from '../types';
import '@wix/design-system/styles.global.css';

type Props = {
  survey: Survey;
  setSurvey: (survey: Survey) => void;
};

export const SettingsForm: FC<Props> = ({ survey, setSurvey }) => {
  return (
    <Box gap={3} direction='vertical'>
      <Box gap={3} direction='vertical' width={'100%'}>
        <FormField required label='Question1'>
          <Input
            value={survey.question1}
            onChange={(val) =>
              setSurvey({
                ...survey,
                question1: val.target.value,
              })
            }
          />
        </FormField>
        <FormField required label='Question2'>
          <Input
            value={survey.question2}
            onChange={(val) =>
              setSurvey({
                ...survey,
                question2: val.target.value,
              })
            }
          />
        </FormField>
        <FormField required label='Question3'>
          <Input
            value={survey.question3}
            onChange={(val) =>
              setSurvey({
                ...survey,
                question3: val.target.value,
              })
            }
          />
        </FormField>
      </Box>
    </Box>
  );
};
