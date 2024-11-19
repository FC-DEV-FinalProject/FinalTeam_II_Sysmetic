import { css } from '@emotion/react';
import { GiCircle } from 'react-icons/gi';
import { MdOutlineShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

interface TitleProps {
  id: number;
  title?: string;
  traderId?: string;
  traderName?: string;
  imgUrl?: string;
  date?: string;
  followers?: number;
  minimumInvestment?: string;
  lastUpdatedDate?: string;
}

const StrategyTitleSection = ({
  id,
  title,
  traderId,
  traderName,
  imgUrl,
  date,
  followers,
  minimumInvestment,
  lastUpdatedDate,
}: TitleProps) => {
  const navigate = useNavigate();

  const handleMoveProfile = (traderId: string) => {
    navigate(`${ROUTES.TRADER.PROFILE(traderId)}`);
  };

  const handleMoveEditPage = (id: string) => {
    navigate(`${ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(id)}`);
  };

  const InfoSection = ({ title, data }: { title: string; data?: number | string }) => (
    <div css={authorInfoStyle}>
      <div css={followerAreaStyle}>
        <div>{title}</div>
        <div css={followerTextStyle}>{data}</div>
      </div>
    </div>
  );

  return (
    <div css={containerStyle}>
      <div css={actionAreaStyle}>
        <button css={shareButtonStyle}>
          <GiCircle size={40} css={circleStyle} />
          <MdOutlineShare size={16} css={shareStyle} />
        </button>
        <div css={buttonAreaStyle}>
          <Button size='xs' variant='secondaryGray' width={90}>
            삭제
          </Button>
          <Button
            size='xs'
            variant='neutral'
            width={90}
            onClick={() => {
              handleMoveEditPage(String(id));
            }}
          >
            수정
          </Button>
          <Button size='xs' width={120}>
            승인요청
          </Button>
        </div>
      </div>
      <div css={tagAreaStyle}>
        <div css={tagStyle}>태그</div>
        <div css={tagStyle}>태그2</div>
      </div>
      <div css={titleAreaStyle}>
        <div css={infoAreaStyle}>
          <div css={titleStyle}>{title}</div>
          <span css={postDateStyle}>작성일자 {date}</span>
          <div css={infoSectionStyle}>
            <div css={authorInfoStyle}>
              <button onClick={() => handleMoveProfile(traderId || '')} css={authorDetailsStyle}>
                <img src={imgUrl} alt={traderName} css={authorImageStyle} />
                <div css={followerAreaStyle}>
                  <div css={traderTextStyle}>트레이더</div>
                  <div css={followerTextStyle}>{traderName}</div>
                </div>
              </button>
            </div>
            <InfoSection title={'팔로워'} data={followers} />
            <InfoSection title={'최소운용가능금액'} data={minimumInvestment} />
            <InfoSection title={'최종손익입력날짜'} data={lastUpdatedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
`;

const actionAreaStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const shareButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  margin-left: 8px;
`;

const circleStyle = css`
  color: ${theme.colors.gray[400]};
  position: absolute;
`;

const shareStyle = css`
  position: relative;
  z-index: 1;
`;

const buttonAreaStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const tagAreaStyle = css`
  display: flex;
  gap: 8px;
`;

const tagStyle = css`
  display: flex;
  padding: 0px 10px;
  height: 21px;
  align-items: center;
  justify-content: center;
  ${theme.textStyle.captions.caption2};
  background-color: ${theme.colors.teal[100]};
`;

const titleAreaStyle = css`
  align-items: flex-start;
  gap: 16px;
`;

const infoAreaStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const infoSectionStyle = css`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const titleStyle = css`
  ${theme.textStyle.headings.h3};
`;

const traderTextStyle = css`
  text-align: left;
`;

const authorInfoStyle = css`
  display: flex;
  border: 1px solid ${theme.colors.gray[200]};
  padding: 24px;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
  height: 104px;
`;

const authorDetailsStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  background: none;
  border: 0;
  cursor: pointer;
  outline: none;
`;

const authorImageStyle = css`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  object-fit: cover;
`;

const postDateStyle = css`
  display: flex;
  flex-direction: column;
  margin: 16px 0 24px 0;
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.captions.caption2};
`;

const followerAreaStyle = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  ${theme.textStyle.captions.caption2};
`;

const followerTextStyle = css`
  ${theme.textStyle.subtitles.subtitle3};
  text-align: left;
`;

export default StrategyTitleSection;
