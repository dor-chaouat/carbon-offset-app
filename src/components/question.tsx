import React, { useState, type FC } from 'react';
import { Question } from '../types';
import '@wix/design-system/styles.global.css';
import {
  Card,
  Cell,
  Dropdown,
  FormField,
  InputArea,
  Layout,
} from '@wix/design-system';

export interface SurveyQuestionProps {
  question?: Question;
}

export const SurveyQuestion: FC<SurveyQuestionProps> = ({
  question,
}: SurveyQuestionProps) => {
  const [questionValue, setQuestionValue] = useState(question?.text ?? '');

  return (
    <>
      <Card.Content>
        <Layout gap='24px'>
          <Cell span={12}>
            <FormField label='Description'>
              <InputArea
                placeholder='Type your question'
                rows={4}
                maxLength={100}
                resizable
                value={questionValue}
                onChange={(e) => setQuestionValue(e.target.value)}
              />
            </FormField>
          </Cell>
          <Cell span={12}>
            <FormField label='Type' stretchContent={false}>
              <Dropdown
                options={[{ id: 0, value: 'Short Answer' }]}
                selectedId={0}
              />
            </FormField>
          </Cell>
        </Layout>
      </Card.Content>
      <Card.Divider />
    </>
  );
};
