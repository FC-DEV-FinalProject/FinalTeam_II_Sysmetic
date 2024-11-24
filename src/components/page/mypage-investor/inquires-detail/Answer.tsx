import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { AnswerProps } from '@/types/myinquiresDetail';

const Answer = ({ traderName, traderProfileUrl, traderAnswer, answerDate }: AnswerProps) => (
  <div css={answerWrapper}>
    <header css={headerWrapper}>
      <h1>트레이더 답변</h1>
      <div css={infoWrapper}>
        <img src={traderProfileUrl} alt={`${traderName}'s profile`} />
        <h2>{traderName}</h2>
      </div>
    </header>

    <section css={traderAnswerWrapper}>
      <div css={answerStyle}>{traderAnswer}</div>
      <span>{answerDate.slice(0, 10).replace(/-/g, '.')}</span>
    </section>
  </div>
);

const answerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 40px 56px 40px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const headerWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.main.black};

  h1 {
    width: 724px;
    font-size: 24px;
    font-weight: 700;
    line-height: 140%;
  }
`;

const infoWrapper = css`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const traderAnswerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  span {
    color: ${theme.colors.gray[400]};
    font-size: 14px;
    font-weight: 400;
  }
`;

const answerStyle = css`
  color: ${theme.colors.main.black};
  font-weight: 400;
`;

export default Answer;