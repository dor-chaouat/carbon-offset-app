export type Survey = {
  questions: Question[];
  coupon: SubmissionCoupon;
};

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
};

export enum QuestionType {
  SHORT_ANSWER = 'Short Answer',
}

export interface SubmissionCoupon {
  type: CouponType;
  // To be used for percent off and money off
  amount: number;
  coupon: SubmissionCoupon;
}

export interface SubmissionCoupon {
  type: CouponType;
  // To be used for percent off and money off
  amount: number;
}

export enum tabs {
  questions = 'Questions',
  responses = 'Responses',
  analytics = 'Analytics',
}

export enum CouponType {
  FREE_SHIPPING,
  MONEY_OFF_AMOUNT,
  PERCENT_OFF_AMOUNT,
}

export type Submissions = {
  purchaseFlowId: string;
  answer1: string | undefined;
  answer2: string | undefined;
  answer3: string | undefined;
};
