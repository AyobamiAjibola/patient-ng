import { 
    Background, 
    BorderProps, 
    BorderRadius, Danger, 
    IPatientTypes, IconSize, 
    State, Typography 
} from '@/themes/CustomThemes';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: Danger;
      background: Background;
      secondary: Danger;
      state: State;
      border: BorderProps;
    },
    borderRadius: BorderRadius;
    iconSize: IconSize;
    spacing: any;
    fonts: string;
    typography: { [key: string]: Typography };
  }
// allow configuration using `createTheme`
  interface ThemeOptions {
    palette: {
        primary: Danger;
        background: Background;
        secondary: Danger;
        state: State;
        border: BorderProps;
    },
    borderRadius: BorderRadius;
    iconSize: IconSize;
    spacing: number[];
    fonts: string;
    typography: { [key: string]: Typography };
  }
}
