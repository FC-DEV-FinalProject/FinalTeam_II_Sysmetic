import { useMemo, useState } from 'react';

import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import { AnalysisDataProps } from '../tabmenu/DailyAnalysis';
import { MonthlyDataProps } from '../tabmenu/MonthlyAnalysis';

import InputTable, { InputTableProps } from './InputTable';
import TableModal from './TableModal';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import useTableModalStore from '@/stores/tableModalStore';
import theme from '@/styles/theme';

export interface AnalysisAttribuesProps {
  title: string;
}

const getAnalysisValue = (row: AnalysisDataProps | MonthlyDataProps, mode: 'write' | 'read') => {
  if (mode === 'write') {
    const data = row as AnalysisDataProps;
    return {
      dataId: data.daily_strategic_statistics_id,
      date: data.input_date,
      principal: data.principal,
      dep_wd_price: data.dep_wd_price,
      profit_loss: data.daily_profit_loss,
      pl_rate: data.daily_pl_rate,
      cumulative_profit_loss: data.cumulative_profit_loss,
      cumulative_profit_loss_rate: data.cumulative_profit_loss_rate,
    };
  } else {
    const data = row as MonthlyDataProps;
    return {
      dataId: data.strategyMonthlyDataId,
      date: data.analysisMonth,
      principal: data.monthlyAveragePrinciple,
      dep_wd_price: data.monthlyDepWdAmount,
      profit_loss: data.monthlyPl,
      pl_rate: data.monthlyReturn,
      cumulative_profit_loss: data.monthlyCumulativePl,
      cumulative_profit_loss_rate: data.monthlyCumulativeReturn,
    };
  }
};

export interface AnalysisProps {
  attributes: AnalysisAttribuesProps[];
  strategyId?: number;
  analysis?: AnalysisDataProps[] | MonthlyDataProps[];
  mode: 'write' | 'read';
  onUpload?: () => void;
}

const AnalysisTable = ({ attributes, analysis, mode, onUpload }: AnalysisProps) => {
  const [selected, setSelected] = useState<boolean[]>(new Array(analysis?.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);
  const [tableData, setTableData] = useState<InputTableProps[]>([]);
  const { openTableModal } = useTableModalStore();

  const calculatedAnalysis = useMemo(
    () => analysis?.map((row) => getAnalysisValue(row, mode)),
    [analysis, mode]
  );

  const handleAllChecked = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelected(new Array(analysis?.length).fill(newSelectAll));
  };

  const handleSelected = (idx: number) => {
    const updatedSelected = [...selected];
    updatedSelected[idx] = !updatedSelected[idx];
    setSelected(updatedSelected);
    setSelectAll(updatedSelected.every(Boolean));
  };

  const handleInputChange = (updatedData: InputTableProps[]) => {
    setTableData(updatedData);
  };

  const handleUpdateData = (data: InputTableProps, idx: number) => {
    const updatedTableData = [...tableData];
    updatedTableData[idx] = { ...updatedTableData[idx], ...data };
    setTableData(updatedTableData);
  };

  const handleUpdateModal = (data: InputTableProps, idx: number) => {
    openTableModal({
      type: 'update',
      title: '일간분석 데이터 수정',
      data: <InputTable data={[data]} onChange={handleInputChange} />,
      onAction: () => {
        handleUpdateData(data, idx);
      },
    });
  };

  const getColorValue = (item: number) => {
    const strItem = String(item);
    if (strItem.startsWith('-')) return false;
    if (strItem.startsWith('+')) return true;
    return null;
  };

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            {mode === 'write' && (
              <th css={tableHeadStyle}>
                <Checkbox checked={selectAll} onChange={handleAllChecked} />
              </th>
            )}
            {attributes.map((item, idx) => (
              <th key={idx} css={tableHeadStyle}>
                {mode === 'write' || item.title !== '수정' ? item.title : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calculatedAnalysis?.length || 0 ? (
            calculatedAnalysis?.map((values) => (
              <tr key={values.dataId} css={tableRowStyle}>
                {mode === 'write' && (
                  <td css={tableCellStyle}>
                    <Checkbox
                      checked={selected[values.dataId]}
                      onChange={() => handleSelected(values.dataId)}
                    />
                  </td>
                )}
                <td css={tableCellStyle}>{values.date}</td>
                <td css={tableCellStyle}>{values.principal}</td>
                <td css={tableCellStyle}>{values.dep_wd_price}</td>
                <td
                  css={[
                    tableCellStyle,
                    getColorValue(values.profit_loss) === true
                      ? redTextStyle
                      : getColorValue(values.profit_loss) === false
                        ? blueTextStyle
                        : defaultTextStyle,
                  ]}
                >
                  {values.profit_loss}
                </td>
                <td css={tableCellStyle}>{values.pl_rate}</td>
                <td css={tableCellStyle}>{values.cumulative_profit_loss}</td>
                <td css={tableCellStyle}>{values.cumulative_profit_loss_rate}</td>
                {mode === 'write' && (
                  <td css={tableCellStyle}>
                    <Button
                      variant='secondaryGray'
                      size='xs'
                      width={65}
                      onClick={() =>
                        handleUpdateModal(
                          {
                            input_date: values.date,
                            dep_wd_price: values.dep_wd_price,
                            daily_profit_loss: values.profit_loss,
                          },
                          values.dataId
                        )
                      }
                    >
                      수정
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={attributes.length + 1} css={noDataStyle}>
                내용을 추가해주세요.
                <div css={addArea}>
                  <Button
                    variant='secondary'
                    size='xs'
                    width={116}
                    css={buttonStyle}
                    onClick={onUpload}
                  >
                    <BiPlus size={16} />
                    직접입력
                  </Button>
                  <Button variant='accent' size='xs' width={116} css={buttonStyle}>
                    <BiPlus size={16} />
                    엑셀추가
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TableModal />
    </div>
  );
};

const tableStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
  width: 100%;
  color: ${theme.colors.gray[700]};
  .checkbox {
    cursor: pointer;
  }
  min-height: 430px;
`;

const tableVars = css`
  border-collapse: collapse;
  table-layout: fixed;
`;

const tableRowStyle = css`
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const tableHeadStyle = css`
  align-items: center;
  ${theme.textStyle.body.body1};
  height: 56px;
  text-align: center;
  background-color: ${theme.colors.gray[100]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  text-align: center;
  vertical-align: middle;
`;

const tableCellStyle = css`
  text-align: center;
  vertical-align: middle;
  padding: 16px;
  ${theme.textStyle.body.body2};

  button {
    margin: 0 auto;
  }
`;

const noDataStyle = css`
  height: 200px;
  vertical-align: middle;
  text-align: center;
  padding: 16px;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.textStyle.body.body2};
`;

const addArea = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const defaultTextStyle = css`
  color: ${theme.colors.gray[700]};
`;
const redTextStyle = css`
  color: ${theme.colors.main.red};
`;

const blueTextStyle = css`
  color: ${theme.colors.main.blue};
`;
export default AnalysisTable;
