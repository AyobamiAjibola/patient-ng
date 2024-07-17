import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, useTheme, Typography } from '@mui/material';
import capitalize from 'capitalize';
import { Cancel } from '@mui/icons-material';

interface IProps {
  label?: string;
  labelStyle?: any;
  items: string[];
  setItems: any;
  infoText?: string;
}

const MultipleTextField = ({ 
  label, 
  labelStyle, 
  items, 
  setItems, 
  infoText = 'Please type in the nominees and then press enter.' 
}: IProps) => {
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setItems((prevItems: any) => [...prevItems, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (event: any, newInputValue: string) => {
    setInputValue(capitalize.words(newInputValue));
  };

  const handleDelete = (itemToDelete: any) => {
    setItems((prevItems: any) => prevItems.filter((item: string) => item !== itemToDelete));
  };

  return (
    <label>
      {label && (
        <Typography
          variant="labelsm"
          color={theme.palette.primary.base}
          sx={labelStyle}
        >
          {label}
        </Typography>
      )}
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={items}
      onChange={(event, newValue) => setItems(newValue)}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            onDelete={() => handleDelete(option)}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          onKeyPress={handleKeyPress}
          InputProps={{
            ...params.InputProps,
            style: {
              borderRadius: theme.borderRadius.sm,
              backgroundColor: 'white'
            }
          }}
        />
      )}
    />
    <Typography variant='paragraphxxs' color={theme.palette.state.error}>
      {infoText}
    </Typography>
    </label>
  );
};

export default MultipleTextField;
