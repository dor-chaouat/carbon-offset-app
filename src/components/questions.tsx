import React, { type FC } from 'react';
import { Question } from '../types';
import '@wix/design-system/styles.global.css';
import { SurveyQuestion } from './question';

export interface QuestionsProps {
  questions: Question[];
}

export const Questions: FC<QuestionsProps> = ({
  questions,
}: QuestionsProps) => {
  return (
    <>
      {questions.length > 0
        ? questions.map((question) => (
            <SurveyQuestion key={question.id} question={question} />
          ))
        : null}
    </>
  );
};
