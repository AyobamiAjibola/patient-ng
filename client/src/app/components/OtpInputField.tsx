import { useTheme } from '@mui/material';
import OtpInput from 'react-otp-input';

const OtpInputField = ({ value, onChange, width = '40px', inputNumber = 4 }: any) => {
  const theme = useTheme();
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={inputNumber}
      inputStyle={{
        border: `2px solid ${theme.palette.border.main}`, //${theme.buttonBorder.lightgrey}
        width: width,
        marginInline: 4,
        height: 40,
        borderRadius: theme.borderRadius.sm,
      }}
      renderInput={(props) => <input {...props} />}
    />
  );
};
export default OtpInputField;