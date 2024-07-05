import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ListItemText, Typography, useTheme } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface OptionType {
  label: string;
  value: string;
}

const options: OptionType[] = [
    { label: 'Webinar', value: 'webinar' },
    { label: 'Blog', value: 'blogger' },
    { label: 'Podcast', value: 'podcast' },
    // { label: 'Advocate', value: 'advocacy' },
];

interface IProps {
  setSelectedOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
  label: string;
  labelStyle: React.CSSProperties;
  selectedOptions?: OptionType[]
}

const MultiSelectComponent: React.FC<IProps> = ({
  setSelectedOptions,
  label,
  labelStyle,
  selectedOptions = []
}) => {
  const theme = useTheme();
   const [selectedOptionsState, setSelectedOptionsState] = React.useState<OptionType[]>(selectedOptions);

   React.useEffect(() => {
      if(selectedOptions.length > 0) {
        setSelectedOptionsState(selectedOptions);
      }
   }, [selectedOptions]);
 
   React.useEffect(() => {
     setSelectedOptions(selectedOptionsState);
   }, [selectedOptionsState, setSelectedOptions]);

  return (
    <label>
      {label && (
        <Typography sx={labelStyle}>
          {label}
        </Typography>
      )}
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={options}
            value={selectedOptionsState}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            fullWidth
            onChange={(event, newValue) => {
              setSelectedOptionsState(newValue);
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...otherProps } = props as any;
              return (
                <li {...otherProps} key={option.value}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <ListItemText primary={option.label} />
                </li>
            )}}
            renderInput={(params) => (
                <TextField 
                    {...params} label="" 
                    placeholder="" 
                    variant='standard'
                    InputProps={{
                        ...params.InputProps,
                        style: {
                        fontSize: '14px',
                        fontWeight: 400,
                        borderRadius: theme.borderRadius.sm,
                        minHeight: '60px',
                        paddingLeft: theme.spacing(2),
                        paddingRight: theme.spacing(2),
                        border: `1px solid ${theme.palette.border.main}`,
                        backgroundColor: 'white',
                        },
                        disableUnderline: true,
                    }}
                />
            )}
        />
    </label>
  );
}

export default MultiSelectComponent;
