import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

export interface InputTableProps {
  date: string;
  trade: string;
  day: string;
}

export interface InputAnalysisProps {
  data: InputTableProps[];
  onSave: (data: InputTableProps[]) => void;
}

const attributes = ['일자', '입출금', '일손익'];

const InputTable = ({ data, onSave }: InputAnalysisProps) => {
  const [inputData, setInputData] = useState<InputTableProps[]>(data);

  const handleInputChange = (idx: number, field: keyof InputTableProps, value: string) => {
    const updatedData = [...inputData];
    updatedData[idx] = { ...updatedData[idx], [field]: value };
    setInputData(updatedData);
  };

  useEffect(() => {
    onSave(inputData);
  }, [inputData, onSave]);

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            {attributes.map((row, idx) => (
              <th key={idx} css={tableHeadStyle}>
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputData.map((row, idx) => (
            <tr key={idx} css={tableRowStyle}>
              <td css={tableCellStyle}>
                <input
                  type='text'
                  value={row.date}
                  placeholder='예)YYYY.MM.DD'
                  onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                  css={inputStyle}
                />
              </td>
              <td css={tableCellStyle}>
                <input
                  type='text'
                  value={row.trade}
                  placeholder='예)123,456,789'
                  onChange={(e) => handleInputChange(idx, 'trade', e.target.value)}
                  css={inputStyle}
                />
              </td>
              <td css={tableCellStyle}>
                <input
                  type='text'
                  value={row.day}
                  placeholder='예)+123,456'
                  onChange={(e) => handleInputChange(idx, 'day', e.target.value)}
                  css={inputStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  ${theme.textStyle.body.body1};

  button {
    margin: 0 auto;
  }
  input::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const inputStyle = css`
  width: 100%;
  padding: 8px;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 4px;
`;
export default InputTable;
