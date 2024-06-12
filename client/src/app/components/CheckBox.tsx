'use client'
import { Checkbox } from 'antd';
import styled from '@emotion/styled';
import { useState } from 'react';

const StyledCheckbox = styled(Checkbox)`
  // Styles for the default (unchecked) state
  &.ant-checkbox-wrapper {
    .ant-checkbox-inner {
      border-color: #D9DBDD; // Change border color ff0000
    }
    &:hover .ant-checkbox-inner {
      border-color: #05CC7E; // Change border color on hover
    }
  }

  // Styles for the checked state
  &.ant-checkbox-wrapper-checked {
    .ant-checkbox-inner {
      background-color: #05CC7E; // Change background color when checked
      border-color: #05CC7E; // Change border color when checked
    }
    &:hover .ant-checkbox-inner {
      border-color: #05CC7E; // Change border color on hover when checked
    }
  }

  // Styles for the default active color
  &.ant-checkbox-wrapper:focus-within .ant-checkbox-inner::after {
    border-color: #D9DBDD; // Change default active color
  }

  // Remove default focus style
  .ant-checkbox-input:focus + .ant-checkbox-inner::after {
    border-color: #ffffff; // Remove the border color
    background-color: transparent;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #05CC7E; /* Change background color when checked */
    border-color: #05CC7E; /* Change border color when checked */
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #ffffff; /* Change color of the arrow */
  }
`;

interface IProps {
    onChange: (checked: boolean) => void;
    children: any;
    checked: boolean;
}

const MyCheckbox = ({ children, onChange, checked }: IProps) => {
    const [check, setChecked] = useState(false);

    const handleChange = (e: any) => {
      setChecked(e.target.checked);
      onChange(e.target.checked);
    };
    return (
        <StyledCheckbox checked={check} onChange={handleChange}>
          {children}
        </StyledCheckbox>
    );
};

export const MyCheckbox2 = ({checked, setChecked}: any) => {
  return (
    <StyledCheckbox checked={checked} onChange={(e) => setChecked(e.target.checked) }/>
  )
}

export default MyCheckbox;
